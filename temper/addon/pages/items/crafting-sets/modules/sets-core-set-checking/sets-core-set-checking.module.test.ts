import { beforeAll, describe, expect, test } from "bun:test"

beforeAll(() => {
  Object.assign(globalThis, {
    error: (message: unknown): never => {
      throw new Error(String(message))
    },
    type: (value: unknown): string => (typeof value === "object" ? "table" : typeof value),
    $multi: (...values: unknown[]): unknown[] => values,
    GetAPIVersion: (): number => 101049,
    GetCVar: (): string => "en",
    GetItemLinkSetInfo: (): unknown[] => [true, "Vestments of the Warlock", 5, 2, 5, 19],
    LuaMap: Map,
    ZO_IsConsoleOrGameCoreUI: (): boolean => false,
    pairs: (held: object): [string, unknown][] => Object.entries(held),
    string: { lower: (text: string): string => text.toLowerCase() },
    table: { sort: (list: string[]): string[] => list.sort() },
    tonumber: Number,
    tostring: String,
  })
})

describe("sets-core-set-checking", () => {
  test("publishes the check naming the set an item link is of", async () => {
    const { lib } = await import(
      "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"
    )
    const casts = await import(
      "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts/sets-core-casts.module.code.ts"
    )
    await import(
      "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-set-checking/sets-core-set-checking.module.code.ts"
    )
    const checkSet = casts.asCheckSetFn(casts.asLibSlots(lib)["_checkSet"])
    const answered: unknown = checkSet("|H1:item:43803|h|h")
    expect(answered).toEqual([true, "Vestments of the Warlock", 19, 5, 2, 5])
  })
})
