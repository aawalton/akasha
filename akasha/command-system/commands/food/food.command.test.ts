import { expect, test } from "bun:test"
import type { Given } from "../../calling/calling.module.code.ts"
import {
  food,
  freeStemIn,
  happenedAtFrom,
  readIn,
  stemFor,
  wallClockIn,
} from "./food.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha food", from: root, writer: null, agentId: null }
}

test("nothing said is refused, naming what it takes", async () => {
  const said = await food([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("log")
})

test("an act it does not carry is refused", async () => {
  expect((await food(["eat", "Broccoli"], given("/nowhere"))).code).toBe(1)
})

test("an act naming no food is refused", async () => {
  const said = await food(["log"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--title")
})

test("the food's name is read off the word after the act", () => {
  const said = readIn(["log", "Broccoli"])
  expect("refused" in said).toBe(false)
  expect(!("refused" in said) && said.title).toBe("Broccoli")
})

test("the food's name is read off the flag as well", () => {
  const said = readIn(["log", "--title", "Shrimp & grits"])
  expect(!("refused" in said) && said.title).toBe("Shrimp & grits")
})

test("a food named twice is refused rather than one name being dropped", () => {
  const said = readIn(["log", "Broccoli", "--title", "Kale"])
  expect("refused" in said && said.refused[0]).toContain("said once")
})

test("a second food after the first is refused", () => {
  const said = readIn(["log", "Broccoli", "Kale", "Chard"])
  expect("refused" in said && said.refused[0]).toContain("one call names one food")
})

test("a flag it does not take is refused", () => {
  expect("refused" in readIn(["log", "Broccoli", "--calories", "90"])).toBe(true)
})

test("a flag naming a value with nothing after it is refused", () => {
  const said = readIn(["log", "Broccoli", "--plant-grams"])
  expect("refused" in said && said.refused[0]).toContain("names a value")
})

test("grams and calories must be non-negative numbers", () => {
  expect("refused" in readIn(["log", "Broccoli", "--plant-grams", "-1"])).toBe(true)
  expect("refused" in readIn(["log", "Broccoli", "--plant-grams", "lots"])).toBe(true)
  expect("refused" in readIn(["log", "Broccoli", "--estimated-calories", "-5"])).toBe(true)
  const said = readIn(["log", "Broccoli", "--plant-grams", "90", "--estimated-calories", "650"])
  expect(!("refused" in said) && said.plantGrams).toBe(90)
  expect(!("refused" in said) && said.estimatedCalories).toBe(650)
})

test("a date that is not YYYY-MM-DD is refused", () => {
  expect("refused" in readIn(["log", "Broccoli", "--date", "26-06-26"])).toBe(true)
  expect("refused" in readIn(["log", "Broccoli", "--date", "2026-06-26"])).toBe(false)
})

test("a wall clock is read on a 24-hour clock or refused", () => {
  expect(wallClockIn("14:30")).toEqual({ hh: 14, mm: 30 })
  expect(wallClockIn("9:05")).toEqual({ hh: 9, mm: 5 })
  expect(wallClockIn("24:00")).toBeNull()
  expect(wallClockIn("12:60")).toBeNull()
  expect(wallClockIn("half two")).toBeNull()
  expect("refused" in readIn(["log", "Broccoli", "--time", "25:00"])).toBe(true)
})

test("neither a date nor a time said leaves the instant as now", () => {
  const now = new Date("2026-06-26T18:00:00.000Z")
  expect(happenedAtFrom(undefined, undefined, now)).toBe(now)
})

test("a stem is the day and the food's name, and is bounded", () => {
  expect(stemFor("2026-06-26", "Shrimp & grits")).toBe("2026-06-26-shrimp-grits")
  expect(stemFor("2026-06-26", "!!!")).toBe("2026-06-26")
  expect(stemFor("2026-06-26", "x".repeat(200)).length).toBeLessThanOrEqual(100)
})

test("a stem already taken on the day is numbered past what is there", () => {
  expect(freeStemIn("2026-06-26-kale", [])).toBe("2026-06-26-kale")
  expect(freeStemIn("2026-06-26-kale", ["2026-06-26-kale"])).toBe("2026-06-26-kale-2")
  expect(freeStemIn("2026-06-26-kale", ["2026-06-26-kale", "2026-06-26-kale-2"])).toBe(
    "2026-06-26-kale-3"
  )
  expect(freeStemIn("2026-06-26-kale", ["2026-06-26-chard"])).toBe("2026-06-26-kale")
})
