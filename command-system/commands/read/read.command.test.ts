import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, partly, readingIn, sameBody } from "../../reading/reading.module.code.ts"
import { ANSWER_CEILING, costOf, NO_AGENT, readWith } from "./read.command.code.ts"
import {
  AGENT,
  begunAgain,
  bodyOf,
  CALLED_AS,
  ceilinged,
  committed,
  everyPaged,
  givenAt,
  givenFor,
  HELD,
  headedIn,
  heldRoot,
  LONG,
  leftIn,
  lettered,
  linesGiven,
  longBeside,
  longBody,
  longFirst,
  longWhole,
  MANY,
  manyFiles,
  namingAll,
  namingEach,
  priced,
  read,
  rootWith,
  STRAY,
  scratch,
  strayRoot,
  TAKING,
  THING,
  THING_TYPE,
  telling,
  thingRoot,
  WARRANTED,
  wholeIn,
  wholeNumbered,
} from "./read.command.test-fixtures.ts"

afterAll(scratch.sweep)

test("a file inside akasha comes back whole and line-numbered", () => {
  const root = heldRoot("one\ntwo\nthree\n")
  const said = read(["--file-path", HELD], givenFor(root))
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report[0]).toBe("akasha/one/held.ts — the whole file follows, 3 lines")
  expect(said.report[1]).toBe("     1\tone\n     2\ttwo\n     3\tthree")
})

test("naming no file is a caller mistake and nothing is read", () => {
  const root = rootWith([])
  const said = read([], givenFor(root))
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--file-path names a file to read")
})

test("a path outside the repository is refused rather than read", () => {
  const root = rootWith([{ at: HELD, body: "one\n" }])
  const said = read(["--file-path", "../elsewhere.ts"], givenFor(root))
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("outside the repository")
})

test("an absolute path inside the repository is read, and one outside it is not", () => {
  const root = rootWith([{ at: HELD, body: "one\n" }])
  const inside = read(["--file-path", join(root, HELD)], givenFor(root))
  expect(inside.code).toBe(0)
  const outside = read(["--file-path", join(root, "../elsewhere.ts")], givenFor(root))
  expect(outside.code).toBe(1)
})

test("a path is read against the repository root, wherever the call was made", () => {
  const root = heldRoot()
  const away = { ...givenFor(root), from: join(root, "akasha/one") }
  expect(read(["--file-path", HELD], away).code).toBe(0)
  expect(read(["--file-path", "held.ts"], away).refusals[0]).toContain("names no file")
})

test("a file that is not there is a caller mistake, and the rest are still read", () => {
  const root = heldRoot()
  const said = read(["--file-path", "akasha/one/gone.ts", "--file-path", HELD], givenFor(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names no file")
  expect(said.report[0]).toContain(HELD)
})

test("naming one file twice is refused before anything is read", () => {
  const root = heldRoot()
  const said = read(["--file-path", HELD, "--file-path", HELD], givenFor(root))
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("named more than once")
})

test("a body that is not UTF-8 text says what it is instead of the body", () => {
  const root = rootWith([
    { at: "akasha/one/held.bin", body: new Uint8Array([0xff, 0xfe, 0x00, 0x41]) },
  ])
  const said = read(["--file-path", "akasha/one/held.bin"], givenFor(root))
  expect(said.code).toBe(0)
  expect(said.report.length).toBe(1)
  expect(said.report[0]).toContain("4 bytes that are not UTF-8 text, beginning `fffe0041`")
})

test("a line no answer has room for is refused rather than divided", () => {
  const root = rootWith([{ at: LONG, body: `${"x".repeat(ANSWER_CEILING + 1)}\n` }])
  const said = read(["--file-path", LONG], givenFor(root))
  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain(`line 1 is ${ANSWER_CEILING + 8} bytes on its own`)
  expect(said.refusals[0]).toContain("a read returns whole lines")
})

test("--seat is refused with what it would have meant", () => {
  const root = heldRoot()
  const seat = read(["--seat"], givenFor(root))
  expect(seat.code).toBe(1)
  expect(seat.refusals[0]).toContain("what a seat is bound to")
})

test("an argument this does not take is a caller mistake", () => {
  const root = rootWith([])
  const said = read(["--offset", "20"], givenFor(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is not an argument this takes")
})

test("more than one answer holds comes back as fewer files and a call for the rest", () => {
  const root = rootWith(manyFiles())
  const said = read(namingAll(), givenFor(root))
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  const left = leftIn(said.report)
  expect(left.length).toBeGreaterThan(0)
  const returned = said.report.filter((one) => one.includes("the whole file follows"))
  expect(returned.length).toBeGreaterThan(0)
  expect(returned.length + left.length).toBe(MANY)
  for (const one of left) {
    expect(returned.some((two) => two.startsWith(`${one} —`))).toBe(false)
  }
})

test("the answer holding a call for the rest is itself under the ceiling", () => {
  const root = rootWith(manyFiles())
  const said = read(namingAll(), givenFor(root))
  expect(costOf(said.report)).toBeLessThanOrEqual(ANSWER_CEILING)
})

test("the call for the rest reads exactly what was left, and then the set is done", () => {
  const root = rootWith(manyFiles())
  const first = read(namingAll(), givenFor(root))
  const left = leftIn(first.report)
  const second = read(namingEach(left), givenFor(root))
  expect(second.code).toBe(0)
  const returned = second.report.filter((one) => one.includes("the whole file follows"))
  expect(returned.length).toBe(left.length)
  expect(costOf(second.report)).toBeLessThanOrEqual(ANSWER_CEILING)
})

test("every argument the page shows is an argument this takes", () => {
  const root = heldRoot()
  for (const one of TAKING) {
    const said = read([one.said.split(" ")[0] ?? ""], givenFor(root))
    expect(said.refusals.join(" ")).not.toContain("this takes")
  }
})

test("a read records the body that reached the agent", () => {
  const root = heldRoot("one\ntwo\n")
  const said = read(["--file-path", HELD], givenFor(root))
  expect(said.code).toBe(0)
  const held = readingIn(root, AGENT, HELD)
  expect(held?.oid).toBe(blobIdOf(bodyOf("one\ntwo\n")))
  expect(held?.seenAt).toBeGreaterThan(0)
})

test("a read for an agent nothing identifies is refused, and nothing is recorded", () => {
  const root = heldRoot()
  const said = read(["--file-path", HELD], givenAt(root))
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals).toEqual([NO_AGENT])
  expect(readingIn(root, AGENT, HELD)).toBeNull()
  expect(NO_AGENT).toContain("`AGENT_ID`")
  expect(NO_AGENT).toContain("should not be possible")
})

test("a read whose output is thrown away returns nothing and records nothing", () => {
  const root = heldRoot()
  const said = readWith(["--file-path", HELD], givenFor(root), "a pipe")
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("a pipe")
  expect(readingIn(root, AGENT, HELD)).toBeNull()
})

test("a body that is not text reaches nobody, so nothing is recorded", () => {
  const root = rootWith([{ at: "akasha/one/held.bin", body: new Uint8Array([0xff, 0xfe, 0x00]) }])
  const said = read(["--file-path", "akasha/one/held.bin"], givenFor(root))
  expect(said.code).toBe(0)
  expect(readingIn(root, AGENT, "akasha/one/held.bin")).toBeNull()
})

test("an empty body reached the agent whole, so it is recorded", () => {
  const root = rootWith([{ at: "akasha/one/bare.ts", body: "" }])
  read(["--file-path", "akasha/one/bare.ts"], givenFor(root))
  expect(readingIn(root, AGENT, "akasha/one/bare.ts")?.oid).toBe(blobIdOf(bodyOf("")))
})

test("a second read records the body the file holds now", () => {
  const root = heldRoot("before\n")
  read(["--file-path", HELD], givenFor(root))
  writeFileSync(join(root, HELD), "after\n")
  read(["--file-path", HELD], givenFor(root))
  expect(readingIn(root, AGENT, HELD)?.oid).toBe(blobIdOf(bodyOf("after\n")))
})

test("one agent's read is not another agent's", () => {
  const root = heldRoot()
  read(["--file-path", HELD], givenFor(root))
  expect(readingIn(root, "another-agent", HELD)).toBeNull()
})

test("a body the record already holds comes back as one line", () => {
  const root = heldRoot("one\ntwo\n")
  read(["--file-path", HELD], givenFor(root))
  const said = read(["--file-path", HELD], givenFor(root))
  expect(said.code).toBe(0)
  expect(said.report.length).toBe(1)
  expect(said.report[0]).toContain("you read this body already")
  expect(said.report[0]).toContain("2 lines")
})

test("--full returns the body whatever the record holds", () => {
  const root = heldRoot("one\ntwo\n")
  read(["--file-path", HELD], givenFor(root))
  const said = read(["--full", "--file-path", HELD], givenFor(root))
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("the whole file follows")
})

test("a body that moved where git holds nothing comes back whole and says why", () => {
  const root = heldRoot("before\n")
  read(["--file-path", HELD], givenFor(root))
  writeFileSync(join(root, HELD), "after\n")
  const said = read(["--file-path", HELD], givenFor(root))
  expect(said.report[0]).toContain("it changed since you read it")
  expect(said.report[0]).toContain("the body you read is not in git")
  expect(said.report[0]).toContain("the whole file follows, 1 lines")
})

test("a body that moved since it was read comes back as what changed", () => {
  const now = lettered(80).replace("line 40 ", "line forty ")
  const said = telling(bodyOf(lettered(80)), now)
  expect(said[0]).toContain("it changed since you read it, 80 lines now, and what changed follows")
  expect(said[1]).toContain("-line 40 ")
  expect(said[1]).toContain("+line forty ")
  expect(costOf([...said])).toBeLessThan(costOf([...telling(null, now)]))
})

test("a rewrite whose difference is no shorter than the file comes back whole", () => {
  const said = telling(bodyOf("one\ntwo\nthree\n"), "four\nfive\nsix\n")
  expect(said[0]).toContain("what changed is no shorter than the file")
  expect(said[1]).toContain("     1\tfour")
})

test("a base that is not text comes back whole and says so", () => {
  const said = telling(new Uint8Array([0xff, 0xfe, 0x00, 0x41]), lettered(40))
  expect(said[0]).toContain("the body you read is not text")
  expect(said[0]).toContain("the whole file follows, 40 lines")
})

test("a file past what one answer holds comes back as its difference", () => {
  const body = lettered(600)
  expect(costOf([body])).toBeGreaterThan(ANSWER_CEILING)
  const said = telling(bodyOf(body), body.replace("line 300 ", "line three hundred "))
  expect(said[0]).toContain("what changed follows")
  expect(costOf([...said])).toBeLessThanOrEqual(ANSWER_CEILING)
})

test("a committed body is found again, so a moved body is what changed", () => {
  const root = heldRoot(lettered(80))
  committed(root, HELD)
  read(["--file-path", HELD], givenFor(root))
  const now = lettered(80).replace("line 40 ", "line forty ")
  writeFileSync(join(root, HELD), now)
  const said = read(["--file-path", HELD], givenFor(root))
  expect(said.report[0]).toContain("80 lines now, and what changed follows")
  expect(readingIn(root, AGENT, HELD)?.oid).toBe(blobIdOf(bodyOf(now)))
})

test("an agent whose record holds nothing gets the body whole", () => {
  const root = heldRoot()
  const said = read(["--file-path", HELD], givenFor(root))
  expect(said.report.join("\n")).toContain("the whole file follows")
})

test("a read of a page hands back the types it stands under, and records them", () => {
  const root = thingRoot()
  const said = read(["--file-path", THING], givenFor(root))
  expect(said.code).toBe(0)
  expect(wholeIn(said.report).map((one) => one.split(" \u2014")[0])).toEqual([...WARRANTED])
  for (const one of WARRANTED) expect(readingIn(root, AGENT, one)).not.toBeNull()
})

test("a file warranted and named both comes back once, and --full expands the same way", () => {
  const root = thingRoot()
  const said = read(["--file-path", THING, "--file-path", THING_TYPE], givenFor(root))
  expect(headedIn(said.report, THING_TYPE)).toBe(1)
  expect(wholeIn(read(["--full", "--file-path", THING], givenFor(root)).report).length).toBe(3)
})

test("a warrant naming a file outside the repository reaches no read", () => {
  const said = read(["--file-path", THING], givenFor(strayRoot())).report.join("\n")
  expect(said).not.toContain(STRAY)
})

test("a warranted set past what one answer holds leaves a call that reads the rest", () => {
  const held = ceilinged()
  expect(costOf(held.first.report)).toBeLessThanOrEqual(ANSWER_CEILING)
  expect(held.left.length).toBeGreaterThan(0)
  expect(held.second.refusals).toEqual([])
  for (const one of held.left) expect(headedIn(held.second.report, one)).toBe(1)
  for (const one of everyPaged()) expect(headedIn(held.both, one)).toBeGreaterThan(0)
})

test("the call for what is left over is priced as it is printed, warrants and all", () => {
  const { said, call } = priced()
  expect(costOf(said.report)).toBeLessThanOrEqual(ANSWER_CEILING)
  expect(said.report[said.report.length - 1]).toBe(call)
  expect(headedIn(said.report, THING_TYPE)).toBe(1)
})

test("a long body's first run comes back with a call for the next, and is no read yet", () => {
  const { root, said } = longFirst()
  expect(said.code).toBe(0)
  expect(said.report[0]).toContain(`${LONG} — lines 1 through `)
  expect(said.report[3]).toBe(`${CALLED_AS} --file-path ${LONG}`)
  expect(costOf(said.report)).toBeLessThanOrEqual(ANSWER_CEILING)
  expect(partly(readingIn(root, AGENT, LONG))).toBe(true)
})

test("the runs together are the whole numbered body, and the last one records it read", () => {
  const { said, held } = longWhole()
  expect(said.length).toBeGreaterThan(1)
  expect(linesGiven(said)).toEqual(wholeNumbered())
  expect(sameBody(held, blobIdOf(bodyOf(longBody())))).toBe(true)
})

test("a long body comes back alone, whether it is named first or after another file", () => {
  const { first, next } = longBeside()
  expect(headedIn(first.report, HELD)).toBe(0)
  expect(leftIn(first.report)).toEqual([HELD])
  expect(costOf(first.report)).toBeLessThanOrEqual(ANSWER_CEILING)
  expect(headedIn(next.report, HELD)).toBe(1)
  expect(leftIn(next.report)).toEqual([LONG])
})

test("--full and a body that moved both begin a long body again at its first line", () => {
  for (const one of begunAgain()) expect(one).toContain("lines 1 ")
})
