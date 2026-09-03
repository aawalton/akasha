import { expect, test } from "bun:test"
import {
  DIFFICULTY_HIGH,
  DIFFICULTY_LOW,
  difficultyForTitle,
  levelSaid,
  readDifficulty,
  readLevel,
  readSafety,
  SAFETY_HIGH,
  SAFETY_LOW,
} from "./session-leveling.module.code.ts"

function levelIn(said: string): string | null {
  const read = readSafety(said)
  return read.read === "level" ? read.level : null
}

test("a whole level is written without a fraction", () => {
  expect(levelSaid(2)).toBe("2")
  expect(levelSaid(-2)).toBe("-2")
  expect(levelSaid(0)).toBe("0")
})

test("a negative half step is written away from zero", () => {
  expect(levelSaid(-1.5)).toBe("-1.5")
  expect(levelSaid(2.5)).toBe("2.5")
})

test("a safety at either end of its range is read", () => {
  expect(levelIn(String(SAFETY_LOW))).toBe("-2")
  expect(levelIn(String(SAFETY_HIGH))).toBe("5")
})

test("a level written with a trailing zero loses the fraction", () => {
  expect(levelIn("2.0")).toBe("2")
})

test("a level padded with spaces is read", () => {
  expect(levelIn(" 3 ")).toBe("3")
})

test("a safety outside its range is refused", () => {
  expect(readSafety("-2.5").read).toBe("refused")
  expect(readSafety("5.5").read).toBe("refused")
})

test("a difficulty below zero is refused where the same level passes as a safety", () => {
  expect(readDifficulty("-1").read).toBe("refused")
  expect(readSafety("-1").read).toBe("level")
})

test("a level falling between half steps is refused", () => {
  expect(readSafety("2.3").read).toBe("refused")
  expect(readSafety("0.25").read).toBe("refused")
})

test("a level that reads as no number is refused", () => {
  expect(readSafety("").read).toBe("refused")
  expect(readSafety("high").read).toBe("refused")
})

test("a refusal names the flag and the range", () => {
  const read = readDifficulty("9")
  expect(read.read).toBe("refused")
  if (read.read !== "refused") throw new Error("a refusal was expected")
  expect(read.saying).toContain("--difficulty")
  expect(read.saying).toContain(String(DIFFICULTY_LOW))
  expect(read.saying).toContain(String(DIFFICULTY_HIGH))
})

test("a range handed in is the range enforced", () => {
  expect(readLevel("4", 0, 3, "--held").read).toBe("refused")
  expect(readLevel("4", 0, 9, "--held").read).toBe("level")
})

test("the highest difficulty among the matching activities wins", () => {
  expect(
    difficultyForTitle("Piano and Read", [
      { title: "Piano", defaultDifficulty: 1 },
      { title: "Read", defaultDifficulty: 3 },
    ])
  ).toBe("3")
})

test("a difficulty of zero is a rating rather than an absence", () => {
  expect(difficultyForTitle("Sleep", [{ title: "Sleep", defaultDifficulty: 0 }])).toBe("0")
})

test("a title matching no activity is answered with nothing", () => {
  expect(difficultyForTitle("Threading", [{ title: "Piano", defaultDifficulty: 1 }])).toBe(null)
})

test("an activity carrying a blank title matches nothing", () => {
  expect(difficultyForTitle("Anything", [{ title: "   ", defaultDifficulty: 4 }])).toBe(null)
})

test("an activity carrying no finite difficulty matches nothing", () => {
  expect(difficultyForTitle("Read", [{ title: "Read", defaultDifficulty: Number.NaN }])).toBe(null)
})

test("a matched difficulty of a half step keeps the half", () => {
  expect(difficultyForTitle("Piano", [{ title: "Piano", defaultDifficulty: 2.5 }])).toBe("2.5")
})

const ACTIVITIES = [
  { title: "Read", defaultDifficulty: 1 },
  { title: "Rest", defaultDifficulty: 0 },
  { title: "Music", defaultDifficulty: 0 },
  { title: "Hygiene", defaultDifficulty: 1 },
  { title: "Walk", defaultDifficulty: 1 },
  { title: "Projects", defaultDifficulty: 2 },
]

test("an activity matched inside a longer word matches nothing", () => {
  expect(difficultyForTitle("Threading cable", ACTIVITIES)).toBe(null)
  expect(difficultyForTitle("Cartography", [{ title: "art", defaultDifficulty: 2 }])).toBe(null)
})

test("a title holding an activity's title only inside a longer word matches nothing", () => {
  expect(difficultyForTitle("Reading", ACTIVITIES)).toBe(null)
})

test("an activity that is a whole word of a title matches", () => {
  expect(difficultyForTitle("Read + Rest", ACTIVITIES)).toBe("1")
})

test("the highest difficulty among the activities of one title wins", () => {
  expect(difficultyForTitle("Music + Hygiene", ACTIVITIES)).toBe("1")
})

test("a match is read with the case folded away", () => {
  expect(difficultyForTitle("READ + rest", ACTIVITIES)).toBe("1")
})

test("a title parting its words by a slash or a dash or a space is matched whole", () => {
  expect(difficultyForTitle("Walk / Pray", ACTIVITIES)).toBe("1")
  expect(difficultyForTitle("Walk and Pray", ACTIVITIES)).toBe("1")
  expect(difficultyForTitle("Projects — Friday pull", ACTIVITIES)).toBe("2")
})
