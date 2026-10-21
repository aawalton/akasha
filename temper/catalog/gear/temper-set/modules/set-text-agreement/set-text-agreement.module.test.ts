import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  type CatalogSet,
  disagreeingLines,
  type SetLine,
  setLineOf,
  setLinesIn,
  textShapeOf,
} from "akasha/temper/catalog/gear/temper-set/modules/set-text-agreement/set-text-agreement.module.code.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"
import { readings } from "akasha/temper/player/character/temper-account-character/properties/readings.file-property.ts"
import { temperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.ts"

test("a set line is read without its colours, and a perfected line by its count", () => {
  expect(setLineOf(1, "(5 items) Increase damage by |cffffff15|r%.")).toEqual({
    esoSetId: 1,
    count: 5,
    text: "Increase damage by 15%.",
  })
  expect(setLineOf(2, "(2 perfected items) Adds 1190 Offensive Penetration")?.count).toBe(2)
  expect(setLineOf(3, "no count")).toBeNull()
})

test("a plain number is set aside, and a percent kept unless the line scales off a stat", () => {
  expect(textShapeOf("Adds 1206 Maximum Health")).toBe(textShapeOf("Adds 350 Maximum Health"))
  expect(textShapeOf("by 12%.")).not.toBe(textShapeOf("by 15%."))
  expect(textShapeOf("by 1%, scales off power")).toBe(textShapeOf("by 9%, scales off power"))
})

test("a line no catalog line of its set and count agrees with is named", () => {
  const catalog: CatalogSet[] = [{ esoSetId: 9, lines: [{ count: 5, description: "By 12%." }] }]
  const changed: SetLine = { esoSetId: 9, count: 5, text: "By 15%." }
  const kept: SetLine = { esoSetId: 9, count: 5, text: "By 12%." }
  const unknown: SetLine = { esoSetId: 8, count: 1, text: "Adds 1 Armor" }

  expect(disagreeingLines([changed, kept, unknown], catalog)).toEqual([changed, unknown])
})

type Row = Readonly<Record<string, unknown>>

function rowsOf(root: string, pageTypeSlug: string, keys: readonly string[]): readonly Row[] {
  const asked = asking(root, { pageTypeSlug, keys } as never)
  if ("refused" in asked) throw new Error(asked.refused)
  return asked.rows as readonly Row[]
}

function catalogSets(root: string): readonly CatalogSet[] {
  return rowsOf(root, temperSet.slug, ["esoSetId", "bonuses"]).map((row) => {
    const bonuses: readonly Row[] = Array.isArray(row.bonuses) ? row.bonuses : []
    return {
      esoSetId: Number(row.esoSetId),
      lines: bonuses.map((bonus) => ({
        count: Number(bonus.count),
        description: String(bonus.description),
      })),
    }
  })
}

function linesOnReadings(root: string): readonly SetLine[] {
  return valuesOfType(root, temperAccountCharacter.slug).flatMap((one) => {
    const at = besideAt(one.path, readings.propertySlug, "jsonl")
    if (at === null || !existsSync(join(root, at))) return []
    return setLinesIn(readFileSync(join(root, at), "utf8"))
  })
}

test("every set line the game showed on a reading is the catalog's line for that piece count", () => {
  const root = akashaRoot()
  const seen = linesOnReadings(root)

  expect(seen.length).toBeGreaterThan(0)
  expect(disagreeingLines(seen, catalogSets(root))).toEqual([])
})
