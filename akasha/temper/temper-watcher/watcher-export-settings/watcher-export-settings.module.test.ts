import { expect, test } from "bun:test"
import {
  type ExportSettingsSeams,
  runExportSettings,
} from "./watcher-export-settings.module.code.ts"

type Client = Parameters<typeof runExportSettings>[1]

const NO_CLIENT: Client = {
  auth: {
    getUser: async () => {
      throw new Error("the session was asked although the caller named a user")
    },
  },
}

const BEFORE = [
  "TemperInventory =",
  "{",
  '    ["Default"] =',
  "    {",
  '        ["@alan"] =',
  "        {",
  '            ["$AccountWide"] =',
  "            {",
  '                ["db"] =',
  "                {",
  "                },",
  "            },",
  "        },",
  "    },",
  "}",
  "",
].join("\n")

const AFTER = [
  "TemperInventory =",
  "{",
  '    ["Default"] =',
  "    {",
  '        ["@alan"] =',
  "        {",
  '            ["$AccountWide"] =',
  "            {",
  '                ["logging"] =',
  "                {",
  '                    ["actionReports"] = "minimal",',
  '                    ["perfTracing"] = "minimal",',
  "                },",
  '                ["safety"] =',
  "                {",
  '                    ["confirmActions"] = {',
  '                        "sell",',
  "                    },",
  '                    ["openCooldownProtection"] = false,',
  "                },",
  '                ["backpack"] =',
  "                {",
  '                    ["bufferSlots"] = 5,',
  '                    ["autoStack"] = true,',
  "                },",
  '                ["currencyRates"] =',
  "                {},",
  '                ["crownReplacementCosts"] =',
  "                {},",
  '                ["db"] =',
  "                {",
  "                },",
  "            },",
  "        },",
  "    },",
  "}",
  "",
].join("\n")

const SETTINGS_WITHOUT_INVENTORY = {
  logging: { actionReports: "minimal", perfTracing: "minimal" },
  safety: { confirmActions: ["sell", "nonsense"], openCooldownProtection: false },
  backpack: { bufferSlots: 5 },
}

interface Recorded {
  readonly said: string[]
  readonly written: { path: string; content: string }[]
}

function seamsFor(
  settings: Record<string, unknown>,
  recorded: Recorded
): { seams: ExportSettingsSeams } {
  return {
    seams: {
      say: (message) => {
        recorded.said.push(message)
        return undefined
      },
      readPlayerSettings: async () => settings,
      pricingTables: async () => ({ currencyRates: {}, crownReplacementCosts: {} }),
      writeSideFile: (path, content) => {
        recorded.written.push({ path, content })
        return "hash-of-the-side-file"
      },
    },
  }
}

function recorder(): Recorded {
  return { said: [], written: [] }
}

test("the blocks a settings export writes come out byte for byte as the legacy exporter wrote them", async () => {
  const recorded = recorder()
  const { seams } = seamsFor(SETTINGS_WITHOUT_INVENTORY, recorded)
  const result = await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan" }, seams)
  expect(result.content).toBe(AFTER)
  expect(result.modified).toBe(true)
})

test("an action nobody may agree to is left out of the safety block", async () => {
  const recorded = recorder()
  const { seams } = seamsFor(SETTINGS_WITHOUT_INVENTORY, recorded)
  const result = await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan" }, seams)
  expect(result.content).not.toContain("nonsense")
})

test("an account holding no settings gets its content back unchanged and no side file", async () => {
  const recorded = recorder()
  const { seams } = seamsFor({}, recorded)
  const result = await runExportSettings(
    BEFORE,
    NO_CLIENT,
    { userId: "alan", inventoryConfigPath: "/var/tmp/inventory.lua" },
    seams
  )
  expect(result).toEqual({ content: BEFORE, modified: false, inventoryConfigSideFileHash: null })
  expect(recorded.said).toEqual(["No settings to export."])
  expect(recorded.written).toEqual([])
})

test("the hash answered is the one from whatever wrote the side file", async () => {
  const recorded = recorder()
  const { seams } = seamsFor(SETTINGS_WITHOUT_INVENTORY, recorded)
  const result = await runExportSettings(
    BEFORE,
    NO_CLIENT,
    { userId: "alan", inventoryConfigPath: "/var/tmp/inventory.lua" },
    seams
  )
  expect(result.inventoryConfigSideFileHash).toBe("hash-of-the-side-file")
  expect(recorded.written.length).toBe(1)
  expect(recorded.written[0]?.path).toBe("/var/tmp/inventory.lua")
  expect(recorded.written[0]?.content).toContain('["backpack"]')
})

test("a dry run writes no side file even where a path is given", async () => {
  const recorded = recorder()
  const { seams } = seamsFor(SETTINGS_WITHOUT_INVENTORY, recorded)
  const result = await runExportSettings(
    BEFORE,
    NO_CLIENT,
    { userId: "alan", inventoryConfigPath: "/var/tmp/inventory.lua", dryRun: true },
    seams
  )
  expect(recorded.written).toEqual([])
  expect(result.inventoryConfigSideFileHash).toBe(null)
  expect(result.content).toBe(AFTER)
})

test("a dry run says every block it generated", async () => {
  const recorded = recorder()
  const { seams } = seamsFor(SETTINGS_WITHOUT_INVENTORY, recorded)
  await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan", dryRun: true }, seams)
  expect(recorded.said).toContain("generated lua block logging:")
  expect(recorded.said).toContain("generated lua block crownReplacementCosts:")
})

test("automation reaches the file only where it holds a characters and a companions record", async () => {
  const recorded = recorder()
  const withAutomation = {
    ...SETTINGS_WITHOUT_INVENTORY,
    automation: { characters: {}, companions: {} },
  }
  const { seams } = seamsFor(withAutomation, recorded)
  const result = await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan" }, seams)
  expect(result.content).toContain('["automation"]')

  const shaped = recorder()
  const { seams: other } = seamsFor(
    { ...SETTINGS_WITHOUT_INVENTORY, automation: { characters: {} } },
    shaped
  )
  const second = await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan" }, other)
  expect(second.content).not.toContain('["automation"]')
})

test("a settings type the player never set still reaches the file at its default", async () => {
  const recorded = recorder()
  const { seams } = seamsFor({ logging: { actionReports: "none" } }, recorded)
  const result = await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan" }, seams)
  expect(result.content).toContain('["safety"]')
  expect(result.content).toContain('["backpack"]')
})

async function backpackBlockFor(backpack: unknown): Promise<string> {
  const recorded = recorder()
  const { seams } = seamsFor({ backpack }, recorded)
  const result = await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan" }, seams)
  return result.content
}

test("a buffer slot count outside the hundred allowed falls back to the default", async () => {
  expect(await backpackBlockFor({ bufferSlots: 101 })).toContain('["bufferSlots"] = 15')
  expect(await backpackBlockFor({ bufferSlots: 2.5 })).toContain('["bufferSlots"] = 15')
  expect(await backpackBlockFor({ bufferSlots: -1 })).toContain('["bufferSlots"] = 15')
  expect(await backpackBlockFor({ bufferSlots: 0 })).toContain('["bufferSlots"] = 0')
  expect(await backpackBlockFor(null)).toContain('["bufferSlots"] = 15')
})

test("auto stack is on unless it was set to false outright", async () => {
  expect(await backpackBlockFor({})).toContain('["autoStack"] = true')
  expect(await backpackBlockFor({ autoStack: "no" })).toContain('["autoStack"] = true')
  expect(await backpackBlockFor({ autoStack: false })).toContain('["autoStack"] = false')
})

test("an automation value shaped as an array of characters reaches no block", async () => {
  const recorded = recorder()
  const { seams } = seamsFor({ automation: { characters: [], companions: {} } }, recorded)
  const result = await runExportSettings(BEFORE, NO_CLIENT, { userId: "alan" }, seams)
  expect(result.content).not.toContain('["automation"]')
})

test("an export with neither a named user nor a signed-in account is refused by what is wrong", async () => {
  const refusing: Client = {
    auth: {
      getUser: async () => ({ error: { message: "token expired" }, data: { user: null } }),
    },
  }
  const recorded = recorder()
  const { seams } = seamsFor(SETTINGS_WITHOUT_INVENTORY, recorded)
  await expect(runExportSettings(BEFORE, refusing, {}, seams)).rejects.toThrow(
    "no signed-in user to export these settings (token expired)"
  )
})
