import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { BOOK_ID } from "@akasha/temper-lib-treasure/treasure-book-ids"
import { ICONS } from "@akasha/temper-lib-treasure/treasure-icons"
import { ALL_DATA } from "@akasha/temper-lib-treasure/treasure-pins-data"
import type { AllData } from "@akasha/temper-lib-treasure/treasure-types"
import { makeLuaVm } from "@akasha/temper-lua-runner/lua-vm"
import { isRecord } from "../leaf-dump/leaf-dump.module.code.ts"
import {
  gathered,
  ruledOverValues,
} from "../upstream-leaf-reading/upstream-leaf-reading.module.code.ts"
import type { Ruling } from "../upstream-libraries/upstream-libraries.module.code.ts"

const DATA_FILE = "LibTreasure/data.lua"

const ICONS_FILE = "LibTreasure/icons.lua"

type Derived = {
  readonly itemIds: number
  readonly textures: number
  readonly pins: number
}

function derivedFrom(allData: AllData): Derived {
  const itemIds = new Set<number>()
  const textures = new Set<string>()
  let pins = 0
  for (const pinTypeData of Object.values(allData)) {
    for (const rows of Object.values(pinTypeData)) {
      if (rows === undefined) continue
      for (const [, , texture, itemId] of rows) {
        itemIds.add(itemId)
        textures.add(texture)
        pins += 1
      }
    }
  }
  return { itemIds: itemIds.size, textures: textures.size, pins }
}

function countedAgainst(label: string, here: number, there: number): Ruling {
  if (here !== there) {
    return {
      report: [],
      parted: [
        `${label} counts part from upstream: the port derives ${String(here)} against upstream's ${String(there)}`,
      ],
    }
  }
  return { report: [`${label} counts agree at ${String(here)}`], parted: [] }
}

export async function verifyTreasure(addons: string): Promise<Ruling> {
  const dataSource = await readFile(join(addons, DATA_FILE), "utf-8")
  const iconsSource = await readFile(join(addons, ICONS_FILE), "utf-8")
  const vm = await makeLuaVm()
  try {
    const loaded = await vm.run(`
      LibTreasure = { data = {} }
      local dataChunk = assert(loadstring(${JSON.stringify(`${dataSource}\nLibTreasure.__ALL_DATA = ALL_DATA\n`)}))
      assert(pcall(dataChunk))
      local iconsChunk = assert(loadstring(${JSON.stringify(iconsSource)}))
      assert(pcall(iconsChunk))
      return "ok"
    `)
    if (loaded !== "ok") throw new Error(`loading LibTreasure answered ${String(loaded)}`)

    const counts = await vm.run(`
      local function tally(t)
        local n = 0
        for _ in pairs(t) do n = n + 1 end
        return n
      end
      return { itemIds = tally(LibTreasure.data.ITEMS_DATA), textures = tally(LibTreasure.data.TEXTURE_NAME_DATA) }
    `)
    if (!isRecord(counts)) throw new Error(`tallying LibTreasure answered ${typeof counts}`)
    const upstreamItemIds = counts.itemIds
    const upstreamTextures = counts.textures
    if (typeof upstreamItemIds !== "number" || typeof upstreamTextures !== "number") {
      throw new Error("LibTreasure carries no ITEMS_DATA or no TEXTURE_NAME_DATA to tally")
    }

    const derived = derivedFrom(ALL_DATA)
    return gathered([
      ruledOverValues("ALL_DATA", await vm.run("return LibTreasure.__ALL_DATA"), ALL_DATA),
      ruledOverValues("BOOK_ID", await vm.run("return LibTreasure.data.BOOK_ID"), BOOK_ID),
      ruledOverValues("ICONS", await vm.run("return LibTreasure.icons"), ICONS),
      countedAgainst("distinct itemIds", derived.itemIds, upstreamItemIds),
      countedAgainst("distinct textures", derived.textures, upstreamTextures),
      { report: [`the port's pins number ${String(derived.pins)}`], parted: [] },
    ])
  } finally {
    await vm.close()
  }
}
