import { landingAsked, wroteAndTook } from "@akasha/command-system/asking"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import { chosenIn, countIn } from "@akasha/exercise-access/exercise-choosing"
import {
  EQUIPMENT_CATEGORY_OPTIONS,
  EQUIPMENT_CONFIG_OPTIONS,
} from "@akasha/exercise-access/exercise-vocabulary"
import { listedAt } from "@akasha/indexes"
import { pageStem } from "@akasha/named-for/page-stem"
import { type Value, valueAt } from "@akasha/pages-system/page-value"
import { composedFor } from "@akasha/pages-system-service/composing"
import { firstOf, JSON_SAID, proseIn, saidIn } from "../exercise-said/exercise-said.module.code.ts"

const INPUT = 1

const DATA = 2

const EQUIPMENT_ITEM = "equipment-item"

const TITLE = "--title"

const CATEGORY = "--category"

const CONFIGURATION = "--configuration"

const LOADS = "--loads"

const UNAVAILABLE = "--unavailable"

const NOTES = "--notes"

const SORT_ORDER = "--sort-order"

const NOTHING = "-"

export async function exerciseEquipmentSet(argv: readonly string[], given: Given): Promise<Answer> {
  const reading = saidIn(
    argv,
    [TITLE, CATEGORY, CONFIGURATION, LOADS, NOTES, `${NOTES}-file`, SORT_ORDER],
    [UNAVAILABLE, JSON_SAID],
    1
  )
  if ("refused" in reading) return refused(reading.refused, INPUT)
  const said = reading.said

  const title = firstOf(said, TITLE)
  if (title === undefined) {
    return refused(`\`${TITLE}\` names the piece of kit, and this call names none`, INPUT)
  }

  const values: Value = { title }

  const categorySaid = said.held.get(CATEGORY)
  if (categorySaid !== undefined) {
    const chosen = chosenIn(CATEGORY, categorySaid, EQUIPMENT_CATEGORY_OPTIONS)
    if ("refused" in chosen) return refused(chosen.refused, INPUT)
    values.equipmentItemCategory = chosen.chosen
  }
  const configSaid = said.held.get(CONFIGURATION)
  if (configSaid !== undefined) {
    const chosen = chosenIn(CONFIGURATION, configSaid, EQUIPMENT_CONFIG_OPTIONS)
    if ("refused" in chosen) return refused(chosen.refused, INPUT)
    values.equipmentItemConfiguration = chosen.chosen
  }
  const loads = said.held.get(LOADS)
  if (loads !== undefined) values.equipmentItemLoads = loads
  const notes = proseIn(said, NOTES)
  if ("refused" in notes) return refused(notes.refused, INPUT)
  if (notes.text !== undefined) values.equipmentItemNotes = notes.text
  const order = countIn(SORT_ORDER, said.held.get(SORT_ORDER))
  if ("refused" in order) return refused(order.refused, INPUT)
  if (order.number !== undefined) values.equipmentItemSortOrder = order.number

  const slug = pageStem(title)
  const listed = listedAt(given.root, EQUIPMENT_ITEM, slug)
  const at = listed.length === 1 ? listed[0]?.path : undefined
  const was = at === undefined ? null : valueAt(at, given.root)
  if (at !== undefined && was === null) {
    return refused(`${at} would not load, so what it holds is unknown`, DATA)
  }
  const unavailable = said.bare.has(UNAVAILABLE)
  const available = unavailable
    ? false
    : ((was?.equipmentItemAvailable as boolean | undefined) ?? true)

  const composed = composedFor(given.root, {
    pageTypeSlug: EQUIPMENT_ITEM,
    slug,
    values: { ...(was ?? {}), ...values, equipmentItemAvailable: available },
  })
  if ("refused" in composed) return refused(composed.refused, DATA)

  const changes: FileEdit[] = [
    { path: composed.put.path, body: new TextEncoder().encode(composed.put.content) },
  ]
  const answer = await landingAsked(given, {
    changes,
    message: `record the equipment item ${slug}`,
    dryRun: false,
    glass: null,
    unmoved: [],
    saying: wroteAndTook,
  })
  if (answer.code !== 0) return answer

  const saidJson = said.bare.has(JSON_SAID)
    ? JSON.stringify({
        path: composed.put.path,
        title,
        category: values.equipmentItemCategory ?? null,
        available,
      })
    : `path\t${composed.put.path}\ntitle\t${title}\ncategory\t${values.equipmentItemCategory ?? NOTHING}`
  return {
    report: said.bare.has(JSON_SAID) ? [saidJson] : [saidJson, ...answer.report],
    refusals: [],
    code: 0,
  }
}
