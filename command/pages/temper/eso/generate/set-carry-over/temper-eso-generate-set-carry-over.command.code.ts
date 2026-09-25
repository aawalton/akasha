import { realpathSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { runMechanicalChange } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { codeRoot as codeRootArgument } from "akasha/command/argument/pages/code-root.argument.ts"
import { savedVariablesFile as savedVariablesFileArgument } from "akasha/command/argument/pages/saved-variables-file.argument.ts"
import {
  DATA,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  answeredByPage,
  type Taking,
} from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperEsoGenerateSetCarryOver as page } from "akasha/command/pages/temper/eso/generate/set-carry-over/temper-eso-generate-set-carry-over.command.ts"
import { valuesByPath } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { namesByNumber } from "akasha/temper/catalog/gear/temper-set/modules/set-capture-reading/set-capture-reading.module.code.ts"
import {
  carriedOver,
  type Names,
  type Upstream,
} from "akasha/temper/catalog/gear/temper-set/modules/set-carry-over/set-carry-over.module.code.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"
import { resolveSavedVariablesPath } from "akasha/temper/catalog/side-file/modules/catalog-file-paths/catalog-file-paths.module.code.ts"
import { accountWideHolding } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"

const NAMED = [codeRootArgument, savedVariablesFileArgument] as const

const MESSAGE =
  "Carry each set's facts off the sets addon's ported tables and the item browser's rows onto its page"

const GAME_GLOBALS: Readonly<Record<string, unknown>> = {
  EQUIP_TYPE_HEAD: 1,
  EQUIP_TYPE_SHOULDERS: 4,
  LuaMap: Map,
}

type Taken = Taking<typeof page, typeof NAMED>

function namesIn(capture: string): Names | undefined {
  let root: Record<string, unknown>
  try {
    root = parseLuaSavedVariablesFile(capture, "TemperCatalog_SavedVariables")
  } catch {
    return undefined
  }
  const constants = accountWideHolding(root, "inventoryConstantsCatalog")
  if (constants === undefined) return undefined
  return {
    armor: namesByNumber(constants.armorTypes),
    equip: namesByNumber(constants.equipTypes),
    weapon: namesByNumber(constants.weaponTypes),
  }
}

async function upstreamWith(names: Names): Promise<Upstream> {
  Object.assign(globalThis, GAME_GLOBALS)
  const setInfo = await import(
    "akasha/temper/addon/pages/items/crafting-sets/modules/sets-gen-set-info/sets-gen-set-info.module.code.ts"
  )
  const setData = await import(
    "akasha/temper/addon/pages/items/crafting-sets/modules/sets-gen-set-data-preloaded/sets-gen-set-data-preloaded.module.code.ts"
  )
  const rows = await import(
    "akasha/temper/web/item-browser/modules/item-browser-items/item-browser-items.module.code.ts"
  )
  const placeKinds = await import(
    "akasha/temper/web/item-browser/modules/item-browser-zone-classification/item-browser-zone-classification.module.code.ts"
  )
  return {
    setInfo: setInfo.SET_INFO,
    setData: setData.SET_DATA_PRELOADED,
    rows: rows.ITEMS,
    placeKinds: placeKinds.ZONE_CLASSIFICATION,
    names,
  }
}

async function written(taken: Taken, given: Given): Promise<Answer> {
  const named = taken.codeRoot ?? codeRoot()
  let root: string
  try {
    root = realpathSync(named)
  } catch {
    return refused(`\`${named}\` is no checkout on this disk, so nothing was read or written`, DATA)
  }
  const from = resolveSavedVariablesPath(taken.savedVariablesFile)
  let capture: string
  try {
    capture = await readFile(from, "utf8")
  } catch {
    return refused(`\`${from}\` is no file this can read, so no type is named`, DATA)
  }
  const names = namesIn(capture)
  if (names === undefined) {
    return refused(`\`${from}\` names no inventory constants, so no type is named`, DATA)
  }
  const carried = carriedOver(valuesByPath(root, temperSet.slug), await upstreamWith(names))
  if (carried.faults.length > 0) {
    return refused(`nothing was carried — ${carried.faults.join("; ")}`, DATA)
  }
  const unpaged = carried.rowsUnpaged.length === 0 ? "none" : carried.rowsUnpaged.join(", ")
  const landed = await runMechanicalChange(root, carried.askings, MESSAGE, {
    writer: given.calledAs,
  })
  if ("refusals" in landed) {
    return refused(`the set pages were not changed — ${landed.refusals.join("; ")}`, OPERATIONAL)
  }
  return told([
    `${String(landed.landed.length)} file(s) landed`,
    `sets with an item browser row and no page: ${unpaged}`,
  ])
}

export function temperEsoGenerateSetCarryOver(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return answeredByPage(argv, given.calledAs, page, NAMED, (taken) => written(taken, given))
}
