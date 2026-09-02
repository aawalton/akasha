import { expect, test } from "bun:test"
import { asPage } from "@akasha/pages-core/page-types"
import { createNewCompanion } from "@akasha/temper-companions-core/companion-factory"
import { asRecord } from "@akasha/utils-narrow/as-record"
import type { SignedInReader } from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"
import {
  COMPANION_IDS_WITH_DEF_ID,
  type CompanionImportPorts,
  companionBuildName,
  type PageUpsert,
  planCompanionImport,
  readCompanionSavedVariables,
  runImportCompanions,
} from "./watcher-import-companions.module.code.ts"

const EMBER_HASH = "AjEINDEMQxDEMQxDAwMDFDADAAAAAAa4"

function keyedEntry(defId: number, hash: string): string {
  return `                    [${defId}] =
                    {
                        ["build"] =
                        {
                            ["hash"] = "${hash}",
                        },
                    },`
}

function bareEntry(hash: string): string {
  return `                    {
                        ["build"] =
                        {
                            ["hash"] = "${hash}",
                        },
                    },`
}

function savedVariables(accountWideBody: string): string {
  return `TemperCompanions_SavedVariables =
{
    ["Default"] =
    {
        ["@alan"] =
        {
            ["$AccountWide"] =
            {
${accountWideBody}
            },
        },
    },
}
`
}

function withCompanions(entries: readonly string[]): string {
  return savedVariables(`                ["companions"] =
                {
${entries.join("\n")}
                },`)
}

const THREE_ENTRY_FILE = withCompanions([
  keyedEntry(5, EMBER_HASH),
  keyedEntry(1, "nonsense"),
  keyedEntry(77, "whatever"),
])

function collectingUpsert(calls: Record<string, unknown>[]): PageUpsert {
  const upsert: PageUpsert = async (args) => {
    calls.push(args)
    return asPage({ id: "01a06381-35cf-7e59-9fb8-159808653255" })
  }
  return upsert
}

function companionIdOf(write: Record<string, unknown>): unknown {
  return asRecord(write.set)?.companionId
}

function noSupabase(): SignedInReader {
  return {
    auth: {
      getUser: async () => {
        throw new Error("the test never reaches auth")
      },
    },
  }
}

function refusingSupabase(message: string): SignedInReader {
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: { message } }),
    },
  }
}

function recordingPorts(): {
  ports: CompanionImportPorts
  reported: string[]
  warned: string[]
  writes: Record<string, unknown>[]
} {
  const reported: string[] = []
  const warned: string[] = []
  const writes: Record<string, unknown>[] = []
  return {
    ports: {
      upsert: collectingUpsert(writes),
      report: (line) => reported.push(line),
      warn: (line) => warned.push(line),
    },
    reported,
    warned,
    writes,
  }
}

test("a keyed companions table reads back as one entry per known definition id", () => {
  const reading = readCompanionSavedVariables(THREE_ENTRY_FILE)
  expect(reading.entries).toEqual([
    { companionId: "bastian", hash: "nonsense" },
    { companionId: "ember", hash: EMBER_HASH },
  ])
  expect(reading.unknownDefIds).toEqual([77])
})

test("a companions table written as a lua array is keyed from one", () => {
  const reading = readCompanionSavedVariables(
    withCompanions([bareEntry("nonsense"), bareEntry("also-nonsense")])
  )
  expect(reading.entries).toEqual([
    { companionId: "bastian", hash: "nonsense" },
    { companionId: "mirri", hash: "also-nonsense" },
  ])
  expect(reading.unknownDefIds).toEqual([])
})

test("an account-wide table holding no companions reads back empty", () => {
  const reading = readCompanionSavedVariables(savedVariables(""))
  expect(reading.entries).toEqual([])
  expect(reading.unknownDefIds).toEqual([])
})

test("a file with no Default table is refused by name", () => {
  const content = `TemperCompanions_SavedVariables =
{
    ["Other"] =
    {
    },
}
`
  expect(() => readCompanionSavedVariables(content)).toThrow(
    "Missing Default table in saved variables"
  )
})

test("a file with no account-wide table is refused by name", () => {
  const content = `TemperCompanions_SavedVariables =
{
    ["Default"] =
    {
        ["@alan"] =
        {
            ["Somethingelse"] =
            {
            },
        },
    },
}
`
  expect(() => readCompanionSavedVariables(content)).toThrow(
    "Could not find $AccountWide in saved variables"
  )
})

test("a build name joins the companion name to the name of its sorted base roles", () => {
  const build = createNewCompanion()
  build.companion.baseRoles = ["tank", "dps"]
  expect(companionBuildName("bastian", build)).toBe("Bastian Hallix DPS + Tank")
  build.companion.baseRoles = ["tank", "healer", "support", "dps"]
  expect(companionBuildName("mirri", build)).toBe("Mirri Elendis DPS + Healer + Support + Tank")
})

test("a build carrying no base role is named for the no-role role", () => {
  const build = createNewCompanion()
  build.companion.baseRoles = []
  expect(companionBuildName("ember", build)).toBe("Ember No Role")
})

test("a hash that will not decode becomes a skip naming the hash", () => {
  const plan = planCompanionImport(readCompanionSavedVariables(THREE_ENTRY_FILE))
  expect(plan.actions[0]).toEqual({
    action: "skip",
    companionName: "Bastian Hallix",
    reason: 'failed to decode hash "nonsense"',
  })
})

test("the companions given a progress page are the ones the game names by definition id", () => {
  expect(COMPANION_IDS_WITH_DEF_ID).toEqual([
    "bastian",
    "mirri",
    "ember",
    "isobel",
    "sharp-as-night",
    "azandar",
    "tanlorin",
    "zerith-var",
  ])
})

test("one run over three entries reports the same lines the legacy script reported", async () => {
  const { ports, reported, warned } = recordingPorts()
  await runImportCompanions(THREE_ENTRY_FILE, noSupabase(), { userId: "alan" }, ports)
  expect(warned).toEqual(["  Unknown companion ID 77, skipping"])
  expect(reported).toEqual([
    "Found 2 companion(s).\n",
    "Pre-created 8 companion pages\n",
    '  Bastian Hallix: failed to decode hash "nonsense", skipping',
    `  Ember: captured hash ${EMBER_HASH}`,
    "\n=== Summary ===",
    "  Captured: 1",
    "  Skipped:  1",
  ])
})

test("one run writes the account page and then a progress page per companion", async () => {
  const { ports, writes } = recordingPorts()
  await runImportCompanions(THREE_ENTRY_FILE, noSupabase(), { userId: "alan" }, ports)
  expect(writes.length).toBe(9)
  expect(writes.map((write) => write.pageTypeSlug)).toEqual([
    "temper-account",
    ...COMPANION_IDS_WITH_DEF_ID.map(() => "temper-companion-progress"),
  ])
  expect(writes.slice(1).map(companionIdOf)).toEqual([...COMPANION_IDS_WITH_DEF_ID])
})

test("a file naming no companion the game knows writes nothing and reports nothing", async () => {
  const { ports, reported, warned, writes } = recordingPorts()
  await runImportCompanions(
    withCompanions([keyedEntry(77, "whatever")]),
    noSupabase(),
    { userId: "alan" },
    ports
  )
  expect(warned).toEqual(["  Unknown companion ID 77, skipping"])
  expect(reported).toEqual([])
  expect(writes).toEqual([])
})

test("a run with no user given and no signed-in user is refused by what is wrong", async () => {
  const { ports } = recordingPorts()
  await expect(
    runImportCompanions(THREE_ENTRY_FILE, refusingSupabase("jwt expired"), {}, ports)
  ).rejects.toThrow("no signed-in user to write these companions (jwt expired)")
})
