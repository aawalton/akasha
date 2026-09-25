import { beforeAll, describe, expect, test } from "bun:test"

const TRAVELLED: number[] = []

beforeAll(() => {
  Object.assign(globalThis, {
    error: (message: unknown): never => {
      throw new Error(String(message))
    },
    type: (value: unknown): string => (typeof value === "object" ? "table" : typeof value),
    FastTravelToNode: (nodeIndex: number): undefined => {
      TRAVELLED.push(nodeIndex)
      return undefined
    },
    GetAPIVersion: (): number => 101049,
    GetCVar: (): string => "en",
    GetMapIndexByZoneId: (): undefined => undefined,
    LuaMap: Map,
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
  lib.setInfo = { 19: { [keys.SETS_TABLEKEY_WAYSHRINES]: { 1: 185, 2: 186, 3: 187 } } }
  lib.noSetIdSets = {}
  lib.checkIfSetsAreLoadedProperly = (): boolean => true
  lib.IsNoESOSet = (): boolean => false
  await import(
    "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-api-nav/sets-core-api-nav.module.code.ts"
  )
  return lib
}

describe("sets-core-api-nav", () => {
  test("a set the game names travels to its own wayshrine for the alliance asked", async () => {
    const lib = await loaded()
    expect(lib.JumpToSetId(19, 2)).toBe(true)
    expect(TRAVELLED).toEqual([186])
  })

  test("a set with no set info travels nowhere", async () => {
    const lib = await loaded()
    expect(lib.JumpToSetId(20, 1)).toBe(false)
    expect(TRAVELLED).toEqual([186])
  })
})
