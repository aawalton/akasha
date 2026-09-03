import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { boolIn, rowsFor, textIn, titleOf } from "@akasha/exercise-access/exercise-rows"
import { JSON_SAID, saidIn } from "../exercise-said/exercise-said.module.code.ts"

const INPUT = 1

const DATA = 2

const EQUIPMENT_ITEM = "equipment-item"

const ALL = "--all"

const AT_MOST = 200

const NOTHING = "-"

const OWNED = "owned"

const WANTED = "wanted"

export async function exerciseEquipmentList(
  argv: readonly string[],
  _given: Given
): Promise<Answer> {
  const reading = saidIn(argv, [], [ALL, JSON_SAID], 0)
  if ("refused" in reading) return refused(reading.refused, INPUT)
  const said = reading.said
  const all = said.bare.has(ALL)
  const json = said.bare.has(JSON_SAID)

  const found = await rowsFor({
    pageTypeSlug: EQUIPMENT_ITEM,
    order: [{ by: "equipmentItemSortOrder", dir: "asc" }],
    limit: AT_MOST,
  })
  if ("unread" in found) return refused(found.unread, DATA)

  const items = found.rows
    .map((row) => ({
      id: row.id,
      title: titleOf(row),
      category: textIn(row, "equipmentItemCategory") ?? null,
      configuration: textIn(row, "equipmentItemConfiguration") ?? null,
      loads: textIn(row, "equipmentItemLoads") ?? null,
      available: boolIn(row, "equipmentItemAvailable") ?? true,
      notes: textIn(row, "equipmentItemNotes") ?? null,
    }))
    .filter((one) => all || one.available)

  if (json) return { report: [JSON.stringify({ items })], refusals: [], code: 0 }
  if (items.length === 0) return { report: ["no equipment item stands"], refusals: [], code: 0 }
  return {
    report: items.map(
      (one) =>
        `${one.title}\t${one.category ?? NOTHING}\t${one.configuration ?? NOTHING}\t${one.loads ?? NOTHING}\t${one.available ? OWNED : WANTED}`
    ),
    refusals: [],
    code: 0,
  }
}
