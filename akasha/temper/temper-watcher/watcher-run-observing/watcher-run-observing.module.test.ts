import { expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import { FILE_TYPES } from "../watcher-file-type/watcher-file-type.module.code.ts"
import {
  ADDON_DIRECTORY_ABSENT,
  type OperationTarget,
  observe,
  observeChain,
  observeSideFileExport,
  preDispatchOperations,
  SKIPPED_AFTER_FAILURE,
  skippedOperation,
  statMtimeMs,
  TARGET_OPERATIONS,
} from "./watcher-run-observing.module.code.ts"

const SCRATCH_AT = "/var/tmp"

const TARGET: OperationTarget = { kind: "import", name: "sales", path: "/game/Sales.lua" }

function targetNamed(name: string): OperationTarget {
  return { kind: "import", name, path: `/game/${name}.lua` }
}

test("every kind of file the watcher knows names its expected operations", () => {
  expect(Object.keys(TARGET_OPERATIONS).sort()).toEqual([...FILE_TYPES].sort())
})

test("every kind of file expects at least one import", () => {
  for (const kind of FILE_TYPES) expect(TARGET_OPERATIONS[kind].imports.length).toBeGreaterThan(0)
})

test("an operation that returns is synced and gives back its value", async () => {
  const { operation, value } = await observe(TARGET, async () => 42)
  expect(operation.state).toBe("synced")
  expect(value).toBe(42)
  expect(operation.detail).toBeUndefined()
})

test("an operation that throws is an upload failure carrying what was thrown", async () => {
  const { operation, value } = await observe(TARGET, async () => {
    throw new Error("server said no")
  })
  expect(operation.state).toBe("upload_failed")
  expect(operation.detail).toBe("server said no")
  expect(value).toBeNull()
})

test("a throw that is no error is still carried as text", async () => {
  const { operation } = await observe(TARGET, async () => {
    throw "plain"
  })
  expect(operation.detail).toBe("plain")
})

test("every operation carries the moment the operation ran", async () => {
  const { operation } = await observe(TARGET, async () => 1)
  expect(new Date(operation.ranAt).toISOString()).toBe(operation.ranAt)
})

test("a chain where all succeed records them all synced", async () => {
  const chain = await observeChain([
    { target: targetNamed("a"), run: async () => 1 },
    { target: targetNamed("b"), run: async () => 2 },
  ])
  expect(chain.map((o) => o.state)).toEqual(["synced", "synced"])
})

test("a chain halts at the first failure and skips the rest", async () => {
  let ranThird = false
  const chain = await observeChain([
    { target: targetNamed("a"), run: async () => 1 },
    {
      target: targetNamed("b"),
      run: async () => {
        throw new Error("nope")
      },
    },
    {
      target: targetNamed("c"),
      run: async () => {
        ranThird = true
        return 3
      },
    },
  ])
  expect(chain.map((o) => o.state)).toEqual(["synced", "upload_failed", "skipped"])
  expect(chain[2]?.detail).toBe(SKIPPED_AFTER_FAILURE)
  expect(ranThird).toBe(false)
})

test("a skipped operation says why the operation was skipped", () => {
  expect(skippedOperation(TARGET, "because").state).toBe("skipped")
  expect(skippedOperation(TARGET, "because").detail).toBe("because")
})

test("a side file the caller named no path for is written without being observed", async () => {
  let askedWith: string | undefined | symbol = Symbol("unset")
  const { operation, value } = await observeSideFileExport(
    "inventoryConfig",
    undefined,
    async (p) => {
      askedWith = p
      return "written"
    }
  )
  expect(operation).toBeNull()
  expect(value).toBe("written")
  expect(askedWith).toBeUndefined()
})

test("a side file export that throws with no path is answered as nothing", async () => {
  const { operation, value } = await observeSideFileExport("c", undefined, async () => {
    throw new Error("boom")
  })
  expect(operation).toBeNull()
  expect(value).toBeNull()
})

test("a side file whose addon folder is present is synced", async () => {
  const { operation } = await observeSideFileExport(
    "inventoryConfig",
    "/addons/Temper/config.lua",
    async () => "ok",
    () => true
  )
  expect(operation?.state).toBe("synced")
})

test("a side file whose addon folder is absent is recorded as skipped", async () => {
  const { operation } = await observeSideFileExport(
    "inventoryConfig",
    "/addons/Temper/config.lua",
    async () => "ok",
    () => false
  )
  expect(operation?.state).toBe("skipped")
  expect(operation?.detail).toBe(ADDON_DIRECTORY_ABSENT)
})

test("a side file export is asked for no path where the addon folder is absent", async () => {
  let askedWith: string | undefined | symbol = Symbol("unset")
  await observeSideFileExport(
    "inventoryConfig",
    "/addons/Temper/config.lua",
    async (p) => {
      askedWith = p
      return "ok"
    },
    () => false
  )
  expect(askedWith).toBeUndefined()
})

test("a side file whose addon folder is absent still gives back what the export answered", async () => {
  const { operation, value } = await observeSideFileExport(
    "inventoryConfig",
    "/addons/Temper/config.lua",
    async () => "answered",
    () => false
  )
  expect(operation?.path).toBe("/addons/Temper/config.lua")
  expect(value).toBe("answered")
})

test("a side file export is asked for its path where the addon folder is present", async () => {
  const askedWith: (string | undefined)[] = []
  await observeSideFileExport(
    "inventoryConfig",
    "/addons/Temper/config.lua",
    async (p) => {
      askedWith.push(p)
      return "ok"
    },
    () => true
  )
  expect(askedWith).toEqual(["/addons/Temper/config.lua"])
})

test("a side file export that throws is an upload failure carrying what was thrown", async () => {
  const { operation, value } = await observeSideFileExport(
    "inventoryConfig",
    "/addons/Temper/config.lua",
    async () => {
      throw new Error("EACCES: permission denied")
    },
    () => true
  )
  expect(operation?.state).toBe("upload_failed")
  expect(operation?.detail).toBe("EACCES: permission denied")
  expect(value).toBeNull()
})

test("no two operations any kind expects share a name", () => {
  const names = Object.values(TARGET_OPERATIONS).flatMap((target) => [
    ...target.imports,
    ...("sideFile" in target ? [target.sideFile] : []),
  ])
  expect(new Set(names).size).toBe(names.length)
})

test("a file that cannot be looked at has no modification time", () => {
  expect(statMtimeMs("/nowhere/at/all/TemperSales.lua")).toBeNull()
})

test("a side file is judged by whether its folder is there rather than the file", async () => {
  const dir = mkdtempSync(join(SCRATCH_AT, "akasha-watcher-run-observing-"))
  try {
    const { operation } = await observeSideFileExport(
      "inventoryConfig",
      join(dir, "TemperInventoryConfig.lua"),
      async () => "ok"
    )
    expect(operation?.state).toBe("synced")
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test("a side file under a folder that is not there is judged absent without being told", async () => {
  const { operation } = await observeSideFileExport(
    "inventoryConfig",
    "/nowhere/at/all/TemperInventory/TemperInventoryConfig.lua",
    async () => "ok"
  )
  expect(operation?.state).toBe("skipped")
  expect(operation?.detail).toBe(ADDON_DIRECTORY_ABSENT)
})

test("a pre-dispatch failure names every import the kind expects", () => {
  const reads = preDispatchOperations({
    fileType: "characters",
    sourcePath: "/game/Characters.lua",
    state: "parse_failed",
    detail: "truncated",
  })
  expect(reads.map((o) => o.name)).toEqual(["characters", "completion", "tasks"])
  for (const one of reads) {
    expect(one.state).toBe("parse_failed")
    expect(one.detail).toBe("truncated")
    expect(one.path).toBe("/game/Characters.lua")
  }
})

test("a pre-dispatch failure adds the side file only where a config path is known", () => {
  const without = preDispatchOperations({
    fileType: "characters",
    sourcePath: "/game/Characters.lua",
    state: "file_not_found",
  })
  expect(without).toHaveLength(3)
  const withPath = preDispatchOperations({
    fileType: "characters",
    sourcePath: "/game/Characters.lua",
    configPath: "/addons/Temper/chars.lua",
    state: "file_not_found",
  })
  expect(withPath).toHaveLength(4)
  expect(withPath[3]?.kind).toBe("export")
  expect(withPath[3]?.name).toBe("charactersConfig")
  expect(withPath[3]?.state).toBe("skipped")
})

test("a kind expecting no side file adds none even with a config path", () => {
  const reads = preDispatchOperations({
    fileType: "sales",
    sourcePath: "/game/Sales.lua",
    configPath: "/addons/Temper/x.lua",
    state: "file_not_found",
  })
  expect(reads).toHaveLength(1)
  expect(reads[0]?.kind).toBe("import")
})
