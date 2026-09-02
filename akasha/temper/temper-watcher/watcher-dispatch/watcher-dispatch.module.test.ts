import { expect, test } from "bun:test"
import { FILE_TYPES } from "../watcher-file-type/watcher-file-type.module.code.ts"
import { TARGET_OPERATIONS } from "../watcher-run-observing/watcher-run-observing.module.code.ts"
import type { SyncOperation } from "../watcher-run-outcome/watcher-run-outcome.module.code.ts"
import type { SignedInReader } from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"
import {
  type DispatchOptions,
  type DispatchRunners,
  dispatch,
  type RunReport,
} from "./watcher-dispatch.module.code.ts"

const SCRATCH_AT = "/var/tmp"

const SOURCE_PATH = `${SCRATCH_AT}/watcher-dispatch-source.lua`

const PRESENT_ADDON_CONFIG = `${SCRATCH_AT}/TemperCharactersConfig.lua`

const ABSENT_ADDON_CONFIG = `${SCRATCH_AT}/no-such-addons/TemperCharacters/Config.lua`

const MTIME_MS = 1_700_000_000_000

const FAKE_TOKEN = "wt_unit"

const FAKE_URL = "https://example.test"

const CONTENT = "lua-content"

const READER: SignedInReader = {
  auth: { getUser: async () => ({ data: { user: { id: "user-1" } }, error: null }) },
}

const READER_WITH_NO_USER: SignedInReader = {
  auth: { getUser: async () => ({ data: { user: null }, error: null }) },
}

interface Tweaks {
  exportTasksModified: boolean
  exportTasksHash: string | null
  exportTasksError: Error | null
  completionError: Error | null
  dataMiningModified: boolean
  reportError: Error | null
}

const CALM: Tweaks = {
  exportTasksModified: false,
  exportTasksHash: null,
  exportTasksError: null,
  completionError: null,
  dataMiningModified: false,
  reportError: null,
}

interface Harness {
  readonly calls: string[]
  readonly reported: (readonly SyncOperation[])[]
  readonly usersAsked: (string | undefined)[]
  readonly runners: DispatchRunners
  readonly report: RunReport
}

function harness(tweaks: Partial<Tweaks> = {}): Harness {
  const t: Tweaks = { ...CALM, ...tweaks }
  const calls: string[] = []
  const reported: (readonly SyncOperation[])[] = []
  const usersAsked: (string | undefined)[] = []
  const runners: DispatchRunners = {
    importCatalog: async () => {
      calls.push("importCatalog")
      return { changedSlugs: [], absentSlugs: [], skipped: undefined }
    },
    importCharacters: async () => {
      calls.push("importCharacters")
    },
    importCompanions: async () => {
      calls.push("importCompanions")
    },
    importCompletion: async (_content, deps) => {
      calls.push("importCompletion")
      if (t.completionError !== null) throw t.completionError
      const askUser = deps?.signedInUserId
      if (askUser !== undefined) usersAsked.push(await askUser())
      return {
        accountPageId: "account-1",
        accountCompletionWritten: false,
        characterCount: 0,
        companionCount: 0,
        preservedLabels: [],
      }
    },
    importDataMining: async (content) => {
      calls.push("importDataMining")
      return { content, modified: t.dataMiningModified, notes: [] }
    },
    importErrors: async () => {
      calls.push("importErrors")
    },
    importInventory: async () => {
      calls.push("importInventory")
      await Promise.resolve()
      calls.push("importInventory:settled")
    },
    importItemRuleVerdicts: async () => {
      calls.push("importItemRuleVerdicts")
    },
    importSales: async () => {
      calls.push("importSales")
    },
    importTasks: async () => {
      calls.push("importTasks")
    },
    exportCompanionBuilds: async (content) => {
      calls.push("exportCompanionBuilds")
      return { content, modified: false, companionsConfigSideFileHash: null }
    },
    exportSettings: async (content) => {
      calls.push("exportSettings")
      return { content, modified: false, inventoryConfigSideFileHash: null }
    },
    exportTasks: async (content) => {
      calls.push("exportTasks")
      if (t.exportTasksError !== null) throw t.exportTasksError
      return {
        content,
        modified: t.exportTasksModified,
        charactersConfigSideFileHash: t.exportTasksHash,
      }
    },
  }
  const report: RunReport = async (operations) => {
    if (t.reportError !== null) throw t.reportError
    reported.push([...operations])
  }
  return { calls, reported, usersAsked, runners, report }
}

function optionsFor(at: Harness, extra: Partial<DispatchOptions> = {}): DispatchOptions {
  return {
    reader: READER,
    runners: at.runners,
    report: at.report,
    sourcePath: SOURCE_PATH,
    sourceMtimeMs: MTIME_MS,
    ...extra,
  }
}

function stateOf(operations: readonly SyncOperation[], name: string): string | undefined {
  return operations.find((o) => o.name === name)?.state
}

const WROTE_NOTHING_BACK = {
  ok: true,
  writeBack: null,
  inventoryConfigSideFileHash: null,
  companionsConfigSideFileHash: null,
  charactersConfigSideFileHash: null,
}

test("catalog reaches the catalog import alone and writes nothing back", async () => {
  const at = harness()
  const { operations, ...envelope } = await dispatch(
    "catalog",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at)
  )
  expect(envelope).toEqual(WROTE_NOTHING_BACK)
  expect(operations.every((o) => o.state === "synced")).toBe(true)
  expect(at.calls).toEqual(["importCatalog"])
})

test("sales reaches the sales import alone and writes nothing back", async () => {
  const at = harness()
  const { operations, ...envelope } = await dispatch(
    "sales",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at)
  )
  expect(envelope).toEqual(WROTE_NOTHING_BACK)
  expect(operations.every((o) => o.state === "synced")).toBe(true)
  expect(at.calls).toEqual(["importSales"])
})

test("errors reaches the errors import alone and writes nothing back", async () => {
  const at = harness()
  const { operations, ...envelope } = await dispatch(
    "errors",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at)
  )
  expect(envelope).toEqual(WROTE_NOTHING_BACK)
  expect(operations.every((o) => o.state === "synced")).toBe(true)
  expect(at.calls).toEqual(["importErrors"])
})

test("characters runs the import chain and then the export", async () => {
  const at = harness()
  const result = await dispatch("characters", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(result.ok).toBe(true)
  expect(at.calls).toEqual(["importCharacters", "importCompletion", "importTasks", "exportTasks"])
  expect(at.calls).not.toContain("importCatalog")
})

test("characters holds back the saved-variables write even where the export changed the file", async () => {
  const at = harness({ exportTasksModified: true, exportTasksHash: "side-hash" })
  const result = await dispatch(
    "characters",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at, { charactersConfigPath: PRESENT_ADDON_CONFIG })
  )
  expect(result.ok).toBe(true)
  expect(result.writeBack).toBeNull()
  expect(result.charactersConfigSideFileHash).toBe("side-hash")
})

test("companions runs the companions import beside the companion-builds export", async () => {
  const at = harness()
  const result = await dispatch("companions", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(result.ok).toBe(true)
  expect(at.calls).toContain("importCompanions")
  expect(at.calls).toContain("exportCompanionBuilds")
  expect(at.calls).not.toContain("importCatalog")
})

test("inventory drains the verdicts, imports the inventory, then exports the settings", async () => {
  const at = harness()
  const result = await dispatch("inventory", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(result.ok).toBe(true)
  expect(at.calls).toContain("importItemRuleVerdicts")
  expect(at.calls).toContain("importInventory")
  expect(at.calls).toContain("exportSettings")
  expect(at.calls).not.toContain("importCatalog")
})

test("inventory finishes its import before the settings export starts", async () => {
  const at = harness()
  await dispatch("inventory", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(at.calls).toContain("importInventory:settled")
  expect(at.calls.indexOf("importInventory:settled")).toBeLessThan(
    at.calls.indexOf("exportSettings")
  )
})

test("data-mining reaches the data-mining import", async () => {
  const at = harness()
  const result = await dispatch("data-mining", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(result.ok).toBe(true)
  expect(at.calls).toEqual(["importDataMining"])
  expect(result.writeBack).toBeNull()
})

test("data-mining writes back the content the import changed", async () => {
  const at = harness({ dataMiningModified: true })
  const result = await dispatch("data-mining", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(result.writeBack).toBe(CONTENT)
})

test("an absent addon directory leaves the imports synced and the side file skipped", async () => {
  const at = harness()
  const result = await dispatch(
    "characters",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at, { charactersConfigPath: ABSENT_ADDON_CONFIG })
  )
  expect(stateOf(result.operations, "characters")).toBe("synced")
  expect(stateOf(result.operations, "completion")).toBe("synced")
  expect(stateOf(result.operations, "tasks")).toBe("synced")
  expect(stateOf(result.operations, "charactersConfig")).toBe("skipped")
  expect(at.reported).toHaveLength(1)
  expect(stateOf(at.reported[0] ?? [], "charactersConfig")).toBe("skipped")
})

test("an export that throws does not retract the imports that already landed", async () => {
  const at = harness({ exportTasksError: new Error("ENOENT: no such file or directory") })
  const result = await dispatch(
    "characters",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at, { charactersConfigPath: PRESENT_ADDON_CONFIG })
  )
  expect(stateOf(result.operations, "characters")).toBe("synced")
  expect(stateOf(result.operations, "completion")).toBe("synced")
  expect(stateOf(result.operations, "tasks")).toBe("synced")
  expect(stateOf(result.operations, "charactersConfig")).toBe("upload_failed")
  expect(result.ok).toBe(false)
})

test("an import that throws holds the export back rather than exporting stale data", async () => {
  const at = harness({ completionError: new Error("completion parse blew up") })
  const result = await dispatch(
    "characters",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at, { charactersConfigPath: PRESENT_ADDON_CONFIG })
  )
  expect(stateOf(result.operations, "characters")).toBe("synced")
  expect(stateOf(result.operations, "completion")).toBe("upload_failed")
  expect(stateOf(result.operations, "tasks")).toBe("skipped")
  expect(stateOf(result.operations, "charactersConfig")).toBe("skipped")
  expect(at.calls).not.toContain("exportTasks")
})

test("every kind of file reports the import operations its table names", async () => {
  expect(Object.keys(TARGET_OPERATIONS)).toHaveLength(FILE_TYPES.length)
  for (const fileType of FILE_TYPES) {
    const at = harness()
    const result = await dispatch(fileType, CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
    const importNames = result.operations.filter((o) => o.kind === "import").map((o) => o.name)
    expect(importNames).toEqual([...TARGET_OPERATIONS[fileType].imports])
    expect(result.operations.every((o) => o.path.length > 0)).toBe(true)
  }
})

test("every kind of file reaches a handler", async () => {
  for (const fileType of FILE_TYPES) {
    const at = harness()
    const result = await dispatch(fileType, CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
    expect(result.operations.length).toBeGreaterThan(0)
    expect(result.error).toBeUndefined()
  }
})

test("an import operation carries the modification time the caller stated", async () => {
  const at = harness()
  const result = await dispatch("catalog", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(result.operations[0]?.fileModifiedAt).toBe(new Date(MTIME_MS).toISOString())
  expect(result.operations[0]?.path).toBe(SOURCE_PATH)
})

test("a modification time of zero leaves the operation without one", async () => {
  const at = harness()
  const result = await dispatch(
    "catalog",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at, { sourceMtimeMs: 0 })
  )
  expect(result.operations[0]?.fileModifiedAt).toBeUndefined()
})

test("the completion import is handed the user the supabase reader signs in", async () => {
  const at = harness()
  await dispatch("characters", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(at.usersAsked).toEqual(["user-1"])
})

test("a reader signing in no user fails the completion import and names the work", async () => {
  const at = harness()
  const result = await dispatch(
    "characters",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at, { reader: READER_WITH_NO_USER })
  )
  const completion = result.operations.find((o) => o.name === "completion")
  expect(completion?.state).toBe("upload_failed")
  expect(completion?.detail).toBe(
    "no signed-in user to import this completion (the session carried no user)"
  )
  expect(result.ok).toBe(false)
})

test("a throw while reporting comes back as a result carrying the message", async () => {
  const at = harness({ reportError: new Error("enrolment unreachable") })
  const result = await dispatch("catalog", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(result.ok).toBe(false)
  expect(result.error).toBe("enrolment unreachable")
  expect(result.operations).toEqual([])
})
