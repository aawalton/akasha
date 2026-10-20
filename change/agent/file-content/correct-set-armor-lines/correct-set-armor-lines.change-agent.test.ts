import { expect, test } from "bun:test"
import { correctSetArmorLinesCommand } from "akasha/change/agent/file-content/correct-set-armor-lines/correct-set-armor-lines.change-agent.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { metricResistance } from "akasha/temper/player/progress/temper-metric-tree/pages/metric-resistance.temper-metric-tree.ts"

const IRONBLOOD_AT =
  "temper/catalog/gear/temper-set/pages/ironblood/ironblood.temper-set.bonuses.jsonl"

const CHUDAN_AT =
  "temper/catalog/gear/temper-set/pages/mighty-chudan/mighty-chudan.temper-set.bonuses.jsonl"

const ARMOR = `${metricResistance.type.slice("page-type/".length)}/${metricResistance.slug}`

function lineOf(count: number, description: string, effects?: readonly unknown[]): string {
  return JSON.stringify({
    id: `01a1000${String(count)}`,
    count,
    status: "supported",
    description,
    ...(effects === undefined ? {} : { effects }),
  })
}

function armorOf(value: number): readonly unknown[] {
  return [{ metricId: ARMOR, type: "integer", value }]
}

const HEALTH = lineOf(2, "Adds 1206 Maximum Health")

const HALVED = lineOf(3, "Adds 1487 Armor", armorOf(743))

const WHOLE = lineOf(1, "Adds 1487 Armor", armorOf(1487))

const ODD = lineOf(4, "Adds 1487 Armor", armorOf(1000))

const PROSE = lineOf(5, "When you take damage, you gain Major Protection.")

function worldOf(texts: Record<string, string>): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: (path) => texts[path] ?? null,
    bodyOf: () => null,
    under: (folder) => Object.keys(texts).filter((path) => path.startsWith(folder)),
    base: () => null,
    over: NOTHING_OVER,
  }
}

function writtenOf(said: ReturnType<typeof correctSetArmorLinesCommand>): readonly string[] {
  const one = said.edits[0]
  if (one?.kind !== "replace") return []
  return one.contentTo.split("\n").filter((line) => line !== "")
}

test("an Armor line holding half its description's Armor is set to the whole", () => {
  const said = correctSetArmorLinesCommand(
    worldOf({ [IRONBLOOD_AT]: `${HEALTH}\n${HALVED}\n${PROSE}\n` })
  )
  const written = writtenOf(said)

  expect(said.refused).toBeNull()
  expect(JSON.parse(written[1] ?? "{}").effects).toEqual(armorOf(1487))
  expect(written[0]).toBe(HEALTH)
  expect(written[2]).toBe(PROSE)
})

test("an Armor line already whole, or holding some other value, is left as it is", () => {
  const said = correctSetArmorLinesCommand(worldOf({ [CHUDAN_AT]: `${WHOLE}\n${ODD}\n` }))

  expect(said.edits).toEqual([])
  expect(said.told).toEqual([
    "0 Armor lines in 0 sets set from half to the Armor their description adds",
    "1 Armor lines already add the Armor their description adds",
    "1 Armor lines holding neither left as they are: mighty-chudan 4",
  ])
})

test("the change says what it did", () => {
  const said = correctSetArmorLinesCommand(
    worldOf({ [IRONBLOOD_AT]: `${HALVED}\n`, [CHUDAN_AT]: `${WHOLE}\n` })
  )

  expect(said.told?.slice(0, 2)).toEqual([
    "1 Armor lines in 1 sets set from half to the Armor their description adds",
    "1 Armor lines already add the Armor their description adds",
  ])
})

test("no set holding bonuses is refused", () => {
  expect(correctSetArmorLinesCommand(worldOf({})).refused).toMatch(/^no set under/)
})
