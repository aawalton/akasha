import { expect, test } from "bun:test"
import { planned } from "akasha/command/pages/temper/catalog/import-public-dungeons/temper-catalog-import-public-dungeons.command.code.ts"

const ZONES = { AD1: 381, VV: 849 }

const TOOTHMAUL = { key: "AD1", id: 486, zone: "AD1", achievement: 468 }

const FORGOTTEN_WASTES = { key: "VFW", id: 919, zone: "VV", achievement: 1855 }

const LABELS = [
  { key: "AD1", label: "Toothmaul Gully" },
  { key: "VFW", label: "Forgotten Wastes" },
]

test("each public dungeon is named by its key in lower case, in the order the sources give", () => {
  const plan = planned([TOOTHMAUL, FORGOTTEN_WASTES], LABELS, ZONES)
  if ("refused" in plan) throw new Error(plan.refused)
  expect(plan.namings.map((one) => [one.slug, one.values.displayOrder])).toEqual([
    ["ad1", 0],
    ["vfw", 1],
  ])
  expect(plan.namings[1]?.values).toEqual({
    title: "Forgotten Wastes",
    key: "VFW",
    esoZoneId: 919,
    zoneKey: "VV",
    esoAchievementId: 1855,
    displayOrder: 1,
  })
})

test("a label out of step with the sources is refused", () => {
  expect("refused" in planned([FORGOTTEN_WASTES, TOOTHMAUL], LABELS, ZONES)).toBe(true)
})

test("a zone the skill point finder gives no id is refused", () => {
  expect("refused" in planned([TOOTHMAUL, FORGOTTEN_WASTES], LABELS, { AD1: 381 })).toBe(true)
})

test("a key named twice is refused", () => {
  const twice = [LABELS[0], LABELS[0]].filter((one) => one !== undefined)
  expect("refused" in planned([TOOTHMAUL, TOOTHMAUL], twice, ZONES)).toBe(true)
})
