import { addPropertyToPages } from "akasha/change/mechanical/file-content/add/add-property-to-pages/add-property-to-pages.change-mechanical-file-content.ts"
import { changePagePageProperty } from "akasha/change/mechanical/file-content/change/change-page-page-property/change-page-page-property.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { removePropertyFromEveryPage } from "akasha/change/mechanical/page-type/remove/remove-property-from-every-page/remove-property-from-every-page.change-mechanical-page-type.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"
import { accountWideHolding } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"

const TOP_LEVEL = "TemperCatalog_SavedVariables"

const SETS = "itemSetCatalog"

const CONSTANTS = "inventoryConstantsCatalog"

const NO_VALUE = /_(NONE|INVALID)$/

const PLACED_AFTER = "esoSetId"

const TITLE = "title"

const RESTATE = `${changeMechanicalFileContent.slug}/${changePagePageProperty.slug}` as const

const PUT = `${changeMechanicalFileContent.slug}/${addPropertyToPages.slug}` as const

const TAKE_OFF = `${changeMechanicalPageType.slug}/${removePropertyFromEveryPage.slug}` as const

export interface SetCaptured {
  readonly esoSetId: number
  readonly name: string
  readonly itemIds: readonly number[]
  readonly armorTypes: readonly string[]
  readonly equipTypes: readonly string[]
  readonly weaponTypes: readonly string[]
}

function entriesOf(held: unknown): readonly unknown[] {
  if (Array.isArray(held)) return held
  if (!isRecord(held)) return []
  return Object.keys(held)
    .sort((one, other) => Number(one) - Number(other))
    .map((key) => held[key])
}

export function namesByNumber(held: unknown): ReadonlyMap<number, string> {
  const found = new Map<number, string>()
  if (!isRecord(held)) return found
  for (const name of Object.keys(held).sort()) {
    const value = held[name]
    if (typeof value !== "number" || NO_VALUE.test(name) || found.has(value)) continue
    found.set(value, name)
  }
  return found
}

function namedIn(
  pieces: readonly Record<string, unknown>[],
  field: string,
  names: ReadonlyMap<number, string>
): readonly string[] {
  const found = new Set<string>()
  for (const piece of pieces) {
    const value = piece[field]
    if (typeof value !== "number") continue
    const name = names.get(value)
    if (name !== undefined) found.add(name)
  }
  return [...found].sort()
}

function itemIdsIn(pieces: readonly Record<string, unknown>[]): readonly number[] {
  const found = new Set<number>()
  for (const piece of pieces) {
    const itemId = piece.itemId
    if (typeof itemId === "number" && itemId > 0) found.add(itemId)
  }
  return [...found].sort((one, other) => one - other)
}

export function setsCapturedIn(content: string): readonly SetCaptured[] | undefined {
  let root: Record<string, unknown>
  try {
    root = parseLuaSavedVariablesFile(content, TOP_LEVEL)
  } catch {
    return undefined
  }
  const sets = accountWideHolding(root, SETS)
  const constants = accountWideHolding(root, CONSTANTS)
  if (sets === undefined || constants === undefined) return undefined
  const armor = namesByNumber(constants.armorTypes)
  const equip = namesByNumber(constants.equipTypes)
  const weapon = namesByNumber(constants.weaponTypes)
  const found: SetCaptured[] = []
  for (const key of Object.keys(sets)) {
    const esoSetId = Number(key)
    const entry = sets[key]
    if (!Number.isInteger(esoSetId) || !isRecord(entry)) continue
    const pieces = entriesOf(entry.pieces).filter(isRecord)
    const itemIds = itemIdsIn(pieces)
    if (itemIds.length === 0) continue
    found.push({
      esoSetId,
      name: typeof entry.name === "string" ? entry.name : "",
      itemIds,
      armorTypes: namedIn(pieces, "armorType", armor),
      equipTypes: namedIn(pieces, "equipType", equip),
      weaponTypes: namedIn(pieces, "weaponType", weapon),
    })
  }
  if (found.length === 0) return undefined
  return found.sort((one, other) => one.esoSetId - other.esoSetId)
}

type Listed = (set: SetCaptured) => readonly (number | string)[]

const WRITTEN: readonly (readonly [string, Listed])[] = [
  ["esoWeaponTypes", (set) => set.weaponTypes],
  ["esoEquipTypes", (set) => set.equipTypes],
  ["esoArmorTypes", (set) => set.armorTypes],
  ["esoItemIds", (set) => set.itemIds],
]

export interface SetsWritten {
  readonly askings: readonly Asking[]
  readonly paged: number
  readonly unpaged: readonly number[]
  readonly uncaptured: readonly number[]
}

export function setsWrittenOver(
  captured: readonly SetCaptured[],
  pages: ReadonlyMap<string, Readonly<Record<string, unknown>>>
): SetsWritten {
  const byId = new Map(captured.map((set) => [set.esoSetId, set]))
  const matched: { readonly path: string; readonly set: SetCaptured }[] = []
  const kept: { readonly path: string; readonly value: Readonly<Record<string, unknown>> }[] = []
  const pagedIds = new Set<number>()
  const uncaptured: number[] = []
  const titles: Asking[] = []
  for (const [path, value] of [...pages].sort(([one], [other]) => one.localeCompare(other))) {
    const esoSetId = value[PLACED_AFTER]
    if (typeof esoSetId !== "number") continue
    pagedIds.add(esoSetId)
    const set = byId.get(esoSetId)
    if (set === undefined) {
      uncaptured.push(esoSetId)
      kept.push({ path, value })
      continue
    }
    matched.push({ path, set })
    if (set.name !== "" && value[TITLE] !== set.name) {
      titles.push({ at: RESTATE, given: { at: path, key: TITLE, to: set.name } })
    }
  }
  const askings: Asking[] = [...titles]
  for (const [key, listed] of WRITTEN) {
    if ([...pages.values()].some((value) => value[key] !== undefined)) {
      askings.push({ at: TAKE_OFF, given: { pageType: temperSet.slug, key } })
    }
    const valued = [
      ...matched
        .filter((one) => listed(one.set).length > 0)
        .map((one) => ({ path: one.path, value: JSON.stringify(listed(one.set)) })),
      ...kept
        .filter((one) => Array.isArray(one.value[key]))
        .map((one) => ({ path: one.path, value: JSON.stringify(one.value[key]) })),
    ].sort((one, other) => one.path.localeCompare(other.path))
    if (valued.length === 0) continue
    askings.push({ at: PUT, given: { key, valued, after: PLACED_AFTER } })
  }
  return {
    askings,
    paged: matched.length,
    unpaged: captured.map((set) => set.esoSetId).filter((id) => !pagedIds.has(id)),
    uncaptured: uncaptured.sort((one, other) => one - other),
  }
}
