import { expect, test } from "bun:test"
import {
  type Answer,
  counted,
  firstLineOf,
  type Proof,
  rowOf,
  saidOf,
  tallyOf,
  threwSaidAs,
  unreadSaidAs,
  verdictOf,
} from "./addon-data-proof.module.code.ts"

function answerOf(over: Partial<Answer> = {}): Answer {
  return { section: "sets", name: "Sets.lua", verdict: "SAME", disk: 4, made: 4, ...over }
}

function proofOf(over: Partial<Proof> = {}): Proof {
  return { answers: [], threw: [], unread: [], ...over }
}

test("a file no run has emitted yet is absent rather than different", () => {
  expect(verdictOf(null, "made")).toBe("ABSENT")
  expect(verdictOf("", "made")).toBe("DIFF")
})

test("a file coming back byte-identical is the same file", () => {
  expect(verdictOf("made", "made")).toBe("SAME")
  expect(verdictOf("made ", "made")).toBe("DIFF")
})

test("an empty file regenerating empty is the same file rather than an absent one", () => {
  expect(verdictOf("", "")).toBe("SAME")
})

test("a page type the store would not answer is named with its first line alone", () => {
  const said = unreadSaidAs("temper-set", new Error("the store said no\nand then said more"))
  expect(said).toBe("temper-set — Error: the store said no")
})

test("a first line is cut to the length asked for", () => {
  expect(firstLineOf(new Error("x".repeat(400)), 20).length).toBe(20)
  expect(firstLineOf(new Error("abcdef"), 3)).toBe("Err")
})

test("a throw is said with its section, when it threw, and its frames", () => {
  const thrown = new Error("built   nothing\n  at all")
  thrown.stack = "Error: built nothing\n    at one (a.ts:1:1)\n    at two (b.ts:2:2)"
  const said = threwSaidAs("sets", "building", thrown)
  expect(said.split("\n")[0]).toBe("sets — building Error: built nothing at all")
  expect(said.split("\n").slice(1)).toEqual(["      at one (a.ts:1:1)", "      at two (b.ts:2:2)"])
})

test("a throw carrying no stack is said without frames", () => {
  const thrown = new Error("nothing")
  thrown.stack = ""
  expect(threwSaidAs("sets", "writing", thrown)).toBe("sets — writing Error: nothing")
})

test("each verdict is counted apart from the others", () => {
  const answers = [
    answerOf({ verdict: "SAME" }),
    answerOf({ verdict: "DIFF" }),
    answerOf({ verdict: "DIFF" }),
  ]
  expect(counted(answers, "SAME")).toBe(1)
  expect(counted(answers, "DIFF")).toBe(2)
  expect(counted(answers, "ABSENT")).toBe(0)
})

test("a row carries the verdict, the name and both sizes", () => {
  const said = rowOf(answerOf({ name: "Sets.lua", verdict: "DIFF", disk: 12, made: 34 }))
  expect(said.startsWith("  DIFF  ")).toBe(true)
  expect(said).toContain("Sets.lua")
  expect(said).toContain("disk=      12")
  expect(said).toContain("made=      34")
})

test("two rows whose names are of different lengths line their sizes up", () => {
  const short = rowOf(answerOf({ name: "a", verdict: "SAME" }))
  const long = rowOf(answerOf({ name: "a-much-longer-file-name.lua", verdict: "ABSENT" }))
  expect(short.indexOf("disk=")).toBe(long.indexOf("disk="))
  expect(short.indexOf("made=")).toBe(long.indexOf("made="))
})

test("a tally counts every verdict and the sections that threw", () => {
  const proof = proofOf({
    answers: [answerOf({ verdict: "SAME" }), answerOf({ verdict: "ABSENT" })],
    threw: ["sets — building Error: no"],
  })
  expect(tallyOf(proof)).toBe("SAME 1   DIFF 0   ABSENT 1   sections that threw 1")
})

test("a section is headed once however many files it emits", () => {
  const said = saidOf(
    proofOf({
      answers: [
        answerOf({ section: "sets", name: "a" }),
        answerOf({ section: "sets", name: "b" }),
        answerOf({ section: "skills", name: "c" }),
      ],
    })
  )
  expect(said.filter((one) => one.startsWith("### "))).toEqual(["### sets", "### skills"])
})

test("a run that judged nothing still says its tally", () => {
  expect(saidOf(proofOf())).toEqual(["SAME 0   DIFF 0   ABSENT 0   sections that threw 0"])
})

test("page types the store would not answer are named after the tally", () => {
  const said = saidOf(proofOf({ unread: ["temper-set — Error: no", "temper-zone — Error: no"] }))
  expect(said).toEqual([
    "SAME 0   DIFF 0   ABSENT 0   sections that threw 0",
    "page types the store would not answer (2):",
    "  temper-set — Error: no",
    "  temper-zone — Error: no",
  ])
})

test("nothing is said about unread page types where every page type answered", () => {
  expect(saidOf(proofOf()).some((one) => one.includes("would not answer"))).toBe(false)
})
