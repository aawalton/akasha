import { beforeAll, describe, expect, mock, test } from "bun:test"

const OTHER_LANGUAGE_NAMES: Record<string, string> = { "1011:de": "Sommersend" }

mock.module(
  "akasha/temper/addon/pages/items/crafting-station/modules/zone-lib-state/zone-lib-state.module.code.ts",
  () => ({
    lib: {
      GetZoneName: (zoneId: number, lang: string): string =>
        OTHER_LANGUAGE_NAMES[`${String(zoneId)}:${lang}`] ?? "",
    },
  })
)

beforeAll(() => {
  Object.assign(globalThis, {
    error: (message: unknown): never => {
      throw new Error(String(message))
    },
    type: (value: unknown): string => (typeof value === "object" ? "table" : typeof value),
    GetAPIVersion: (): number => 101049,
    GetCVar: (): string => "en",
    GetZoneNameById: (zoneId: number): string => `zone ${String(zoneId)}^n`,
    LuaMap: Map,
    ZO_CachedStrFormat: (_format: string, name: string): string => name.replace("^n", ""),
    ZO_IsConsoleOrGameCoreUI: (): boolean => false,
    pairs: (held: object): [string, unknown][] => Object.entries(held),
    string: { lower: (text: string): string => text.toLowerCase() },
    table: { sort: (list: string[]): string[] => list.sort() },
    tonumber: Number,
    tostring: String,
  })
})

async function loaded() {
  const { lib } = await import(
    "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"
  )
  const keys = await import(
    "akasha/temper/addon/pages/items/crafting-sets/modules/sets-const-base/sets-const-base.module.code.ts"
  )
  lib.clientLang = "en"
  lib.setDataPreloaded = {
    [keys.SETS_TABLEKEY_DUNGEON_ZONE_IDS]: { 11: true },
    [keys.SETS_TABLEKEY_PUBLIC_DUNGEON_ZONE_IDS]: { 124: true },
  }
  await import(
    "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-api-zones/sets-core-api-zones.module.code.ts"
  )
  return lib
}

describe("sets-core-api-zones", () => {
  test("a zone is a dungeon or a public dungeon where the set data table names it so", async () => {
    const lib = await loaded()
    expect(lib.IsDungeonZoneId(11)).toBe(true)
    expect(lib.IsDungeonZoneId(124)).toBe(false)
    expect(lib.IsPublicDungeonZoneId(124)).toBe(true)
    expect(lib.IsPublicDungeonZoneId(undefined)).toBe(false)
  })

  test("a zone is named by the client in its own language and by the zone library otherwise", async () => {
    const lib = await loaded()
    expect(lib.GetZoneName(1011)).toBe("zone 1011")
    expect(lib.GetZoneName(1011, "en")).toBe("zone 1011")
    expect(lib.GetZoneName(1011, "de")).toBe("Sommersend")
    expect(lib.GetZoneName(undefined)).toBeUndefined()
  })
})
