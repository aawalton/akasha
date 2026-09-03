import { expect, test } from "bun:test"
import {
  aloneIn,
  answering,
  codeOf,
  countOf,
  DATA,
  figure,
  INPUT,
  keyedLines,
  OK,
  OPERATIONAL,
  seqOf,
  told,
  wordsIn,
} from "./pipeline-answering.module.code.ts"

const VALUED = ["--branch", "--limit"]

const SWITCHES = ["--json"]

function refusalOf(held: unknown): string {
  return typeof held === "object" && held !== null && "refused" in held
    ? (held as { readonly refused: readonly string[] }).refused.join(" ")
    : ""
}

test("a flag naming a value takes the word after it", () => {
  const held = wordsIn(["--branch", "main"], VALUED, SWITCHES)
  expect("refused" in held ? null : held.named["--branch"]).toBe("main")
})

test("a word opening with a dash is never read as a value", () => {
  expect(refusalOf(wordsIn(["--branch", "--json"], VALUED, SWITCHES))).toContain(
    "nothing that could be one followed it"
  )
})

test("a flag no command names is refused rather than passed over", () => {
  expect(refusalOf(wordsIn(["--force"], VALUED, SWITCHES))).toContain("is no flag this takes")
})

test("every word a caller got wrong is named rather than the first alone", () => {
  const held = wordsIn(["--force", "--wedge"], VALUED, SWITCHES)
  expect("refused" in held ? held.refused.length : 0).toBe(2)
})

test("a switch is held apart from a flag naming a value", () => {
  const held = wordsIn(["8200", "--json"], VALUED, SWITCHES)
  expect("refused" in held ? [] : [...held.flags]).toEqual(["--json"])
  expect("refused" in held ? [] : held.loose).toEqual(["8200"])
})

test("a second word where one is named is refused", () => {
  const held = wordsIn(["8200", "8201"], VALUED, SWITCHES)
  expect(refusalOf("refused" in held ? held : aloneIn(held, "a seq"))).toContain("`8201`")
})

test("a seq is a whole number at or above zero", () => {
  expect(seqOf("8200")).toBe(8200)
  expect(seqOf("0")).toBe(0)
})

test("a word that is no seq is refused rather than read as one", () => {
  expect(refusalOf(seqOf("-1"))).toContain("is no seq")
  expect(refusalOf(seqOf("8200.5"))).toContain("is no seq")
  expect(refusalOf(seqOf(null))).toContain("names the pipeline's seq")
})

test("a count of zero or past the ceiling is refused", () => {
  expect(countOf("0", "--limit", null)).toHaveProperty("refused")
  expect(refusalOf(countOf("201", "--limit", 200))).toContain("reaches 200 at most")
  expect(countOf(undefined, "--limit", null)).toBeNull()
  expect(countOf("20", "--limit", 200)).toBe(20)
})

test("a fault carrying a code of its own is answered with that code", () => {
  const thrown = Object.assign(new Error("the pipeline is not there"), {
    name: "ExitError",
    code: DATA,
  })
  expect(codeOf(thrown)).toBe(DATA)
})

test("a fault carrying no code of its own is answered as operational", () => {
  expect(codeOf(new Error("nothing said"))).toBe(OPERATIONAL)
  expect(codeOf("a string")).toBe(OPERATIONAL)
})

test("a fault out of the work is answered rather than thrown on", async () => {
  const answer = await answering(() => {
    throw Object.assign(new Error("no pipeline page stands at seq 1"), {
      name: "ExitError",
      code: DATA,
    })
  })
  expect(answer.code).toBe(DATA)
  expect(answer.refusals[0]).toContain("no pipeline page stands")
})

test("work that answers is answered unchanged", async () => {
  expect(await answering(() => told(["one"]))).toEqual({ report: ["one"], refusals: [], code: OK })
})

test("a key holding nothing is left out of the lines", () => {
  expect(
    keyedLines([
      ["seq", 8200],
      ["status", undefined],
    ])
  ).toEqual(["seq\t8200"])
})

test("a figure holding nothing is an empty cell", () => {
  expect(figure(undefined)).toBe("")
  expect(figure(0)).toBe("0")
})

test("the caller's mistake is answered as the caller's", () => {
  expect(INPUT).toBe(1)
})
