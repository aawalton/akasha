import { expect, test } from "bun:test"
import {
  beganAt,
  countLines,
  linesOf,
  moreCall,
  numbered,
  overCost,
  runFrom,
  runLines,
  tooWide,
  widthOf,
} from "./long-body.module.code.ts"

const CALLED_AS = "akasha read"

const HELD = "akasha/one/held.ts"

function lettered(many: number): string {
  const said: string[] = []
  for (let one = 1; one <= many; one += 1) {
    said.push(`line ${String(one).padStart(4, "0")} ${"x".repeat(60)}`)
  }
  return `${said.join("\n")}\n`
}

test("a body with a closing newline holds no line after it", () => {
  expect(linesOf("one\ntwo\n")).toEqual(["one", "two"])
  expect(countLines("one\ntwo\n")).toBe(2)
  expect(countLines("")).toBe(0)
  expect(countLines("one")).toBe(1)
})

test("a line number is no part of the body", () => {
  expect(numbered("one\ntwo\n")).toBe("     1\tone\n     2\ttwo")
})

test("a run of the whole body begins at the first line and ends at the last", () => {
  const run = runFrom(linesOf(lettered(4)), 0, 1000)
  expect(run?.from).toBe(1)
  expect(run?.through).toBe(4)
  expect(run?.of).toBe(4)
  expect(run?.numbered.split("\n").length).toBe(4)
})

test("a run holds every further line the answer has room left for", () => {
  const lines = linesOf(lettered(40))
  const one = widthOf(`     1\t${lines[0] ?? ""}`)
  const run = runFrom(lines, 0, one * 10)
  expect(run?.through).toBe(10)
  expect(widthOf(run?.numbered ?? "")).toBeLessThanOrEqual(one * 10)
})

test("a run takes no line it has no room for", () => {
  const lines = linesOf(lettered(40))
  const one = widthOf(`     1\t${lines[0] ?? ""}`)
  const run = runFrom(lines, 0, one * 10 - 1)
  expect(run?.through).toBe(9)
})

test("a run begins after the line it is given as the line already reached", () => {
  const run = runFrom(linesOf(lettered(40)), 12, 1000)
  expect(run?.from).toBe(13)
  expect(run?.numbered.startsWith("    13\tline 0013 ")).toBe(true)
})

test("a line already reached at or past the last line begins the run at the first line", () => {
  const lines = linesOf(lettered(6))
  expect(beganAt(lines, 6)).toBe(0)
  expect(beganAt(lines, 9)).toBe(0)
  expect(runFrom(lines, 6, 1000)?.from).toBe(1)
})

test("a body no line of which fits the room left over yields no run", () => {
  expect(runFrom(linesOf(lettered(4)), 0, 10)).toBeNull()
})

test("a run ending short of the last line says what is after it reached nobody", () => {
  const run = runFrom(linesOf(lettered(40)), 0, 400)
  const said = runLines(HELD, run ?? { from: 1, through: 1, of: 1, numbered: "" })
  expect(said[0]).toContain(`lines 1 through ${run?.through} of 40 follow`)
  expect(said[0]).toContain(`nothing after line ${run?.through} has reached you`)
  expect(said[1]).toBe(run?.numbered)
})

test("a run ending at the last line says the whole body reached the reader", () => {
  const run = runFrom(linesOf(lettered(6)), 2, 1000)
  const said = runLines(HELD, run ?? { from: 1, through: 1, of: 1, numbered: "" })
  expect(said[0]).toContain("lines 3 through 6 of 6 follow")
  expect(said[0]).toContain("the whole body has reached you now")
})

test("a call for the next run is handed back only where a line is left over", () => {
  const short = runFrom(linesOf(lettered(40)), 0, 400)
  const call = moreCall(CALLED_AS, HELD, short ?? { from: 1, through: 1, of: 1, numbered: "" })
  expect(call[1]).toBe(`${CALLED_AS} --file-path ${HELD}`)
  expect(call[0]).toContain(`line ${short?.through}`)
  const whole = runFrom(linesOf(lettered(6)), 0, 100000)
  expect(moreCall(CALLED_AS, HELD, whole ?? { from: 1, through: 1, of: 1, numbered: "" })).toEqual(
    []
  )
})

test("the call for the next run says the record answers no write until the body is whole", () => {
  const run = runFrom(linesOf(lettered(40)), 0, 400)
  const call = moreCall(CALLED_AS, HELD, run ?? { from: 1, through: 1, of: 1, numbered: "" })
  expect(call[0]).toContain("answers a write only once the whole body has")
})

test("what an answer spends beside a run is priced for the widest run the body can hold", () => {
  const of = 1200
  const priced = overCost(CALLED_AS, HELD, of)
  for (const [from, through] of [
    [1, 1],
    [1, 9],
    [500, 999],
    [1, of],
    [of, of],
  ]) {
    const run = { from: from ?? 1, through: through ?? 1, of, numbered: "" }
    const said = [...runLines(HELD, run), ...moreCall(CALLED_AS, HELD, run)]
    expect(widthOf(said.join("\n")) - 1).toBeLessThanOrEqual(priced)
  }
})

test("a refusal for a line too wide names that line and its bytes", () => {
  const lines = ["short", "x".repeat(500)]
  const said = tooWide(HELD, lines, 1, 40)
  expect(said).toContain("line 2 is 507 bytes on its own")
  expect(said).toContain("past the 40 this answer has left for it")
  expect(said).toContain("a read returns whole lines")
})

test("a refusal names the first line where a line already reached is past the body", () => {
  expect(tooWide(HELD, ["one", "two"], 9, 1)).toContain("line 1 is")
})

test("a run of a body holding one long line and one short one takes the short one next", () => {
  const lines = ["x".repeat(200), "short"]
  expect(runFrom(lines, 0, 100)).toBeNull()
  const run = runFrom(lines, 1, 100)
  expect(run?.from).toBe(2)
  expect(run?.through).toBe(2)
  expect(run?.of).toBe(2)
})
