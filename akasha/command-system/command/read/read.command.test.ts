import { afterAll, expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, readingIn } from "../../reading/reading.module.code.ts"
import { ANSWER_CEILING, costOf, NO_AGENT, readWith } from "./read.command.code.ts"
import {
  AGENT,
  bodyOf,
  CALLED_AS,
  ceilinged,
  everyPaged,
  givenAt,
  givenFor,
  HELD,
  headedIn,
  lettered,
  MANY,
  manyFiles,
  namingAll,
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
} from "./read.command.test-fixtures.ts"

afterAll(scratch.sweep)

test("a file inside akasha comes back whole and line-numbered", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\ntwo\nthree\n" }])
  const said = read(["--file-path", "akasha/one/held.ts"], givenFor(root))
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

test("a path outside akasha is refused rather than read", () => {
  const root = rootWith([
    { at: "akasha/one/held.ts", body: "one\n" },
    { at: "agent/elsewhere.ts", body: "two\n" },
  ])
  const said = read(["--file-path", "agent/elsewhere.ts"], givenFor(root))
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("stands outside `akasha/`")
})

test("an absolute path inside akasha is read, and one outside it is not", () => {
  const root = rootWith([
    { at: "akasha/one/held.ts", body: "one\n" },
    { at: "agent/elsewhere.ts", body: "two\n" },
  ])
  const inside = read(["--file-path", join(root, "akasha/one/held.ts")], givenFor(root))
  expect(inside.code).toBe(0)
  const outside = read(["--file-path", join(root, "agent/elsewhere.ts")], givenFor(root))
  expect(outside.code).toBe(1)
})

test("a relative path is taken against the directory the call was made in", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\n" }])
  const said = read(["--file-path", "held.ts"], {
    ...givenFor(root),
    from: join(root, "akasha/one"),
  })
  expect(said.code).toBe(0)
  expect(said.report[0]).toContain("held.ts — the whole file follows, 1 lines")
})

test("a file that is not there is a caller mistake, and the rest are still read", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\n" }])
  const said = read(
    ["--file-path", "akasha/one/gone.ts", "--file-path", "akasha/one/held.ts"],
    givenFor(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names no file")
  expect(said.report[0]).toContain("akasha/one/held.ts")
})

test("naming one file twice is refused before anything is read", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\n" }])
  const said = read(
    ["--file-path", "akasha/one/held.ts", "--file-path", "akasha/one/held.ts"],
    givenFor(root)
  )
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

test("a body past what one answer holds is refused rather than cut", () => {
  const root = rootWith([{ at: "akasha/one/long.ts", body: `${"x".repeat(ANSWER_CEILING + 1)}\n` }])
  const said = read(["--file-path", "akasha/one/long.ts"], givenFor(root))
  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain(`past the ${ANSWER_CEILING} one answer holds`)
})

test("--seat is refused with what it would have meant", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\n" }])
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
  const call = said.report[said.report.length - 1] ?? ""
  expect(call.startsWith(`${CALLED_AS} --file-path `)).toBe(true)
  const left = call.split(" --file-path ").slice(1)
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
  const call = first.report[first.report.length - 1] ?? ""
  const left = call.split(" --file-path ").slice(1)
  const again: string[] = []
  for (const one of left) again.push("--file-path", one)
  const second = read(again, givenFor(root))
  expect(second.code).toBe(0)
  const returned = second.report.filter((one) => one.includes("the whole file follows"))
  expect(returned.length).toBe(left.length)
  expect(costOf(second.report)).toBeLessThanOrEqual(ANSWER_CEILING)
})

test("every argument the page shows is an argument this takes", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\n" }])
  for (const one of TAKING) {
    const said = read([one.said.split(" ")[0] ?? ""], givenFor(root))
    expect(said.refusals.join(" ")).not.toContain("this takes")
  }
})

test("a read records the body that reached the agent", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\ntwo\n" }])
  const said = read(["--file-path", "akasha/one/held.ts"], givenFor(root))
  expect(said.code).toBe(0)
  const held = readingIn(root, AGENT, "akasha/one/held.ts")
  expect(held?.oid).toBe(blobIdOf(bodyOf("one\ntwo\n")))
  expect(held?.seenAt).toBeGreaterThan(0)
})

test("a read for an agent nothing identifies is refused, and nothing is recorded", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\n" }])
  const said = read(["--file-path", "akasha/one/held.ts"], givenAt(root))
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals).toEqual([NO_AGENT])
  expect(readingIn(root, AGENT, "akasha/one/held.ts")).toBeNull()
  expect(NO_AGENT).toContain("`AGENT_ID`")
  expect(NO_AGENT).toContain("should not be possible")
})

test("a read whose output is thrown away returns nothing and records nothing", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\n" }])
  const said = readWith(["--file-path", "akasha/one/held.ts"], givenFor(root), "a pipe")
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("a pipe")
  expect(readingIn(root, AGENT, "akasha/one/held.ts")).toBeNull()
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
  const root = rootWith([{ at: "akasha/one/held.ts", body: "before\n" }])
  read(["--file-path", "akasha/one/held.ts"], givenFor(root))
  writeFileSync(join(root, "akasha/one/held.ts"), "after\n")
  read(["--file-path", "akasha/one/held.ts"], givenFor(root))
  expect(readingIn(root, AGENT, "akasha/one/held.ts")?.oid).toBe(blobIdOf(bodyOf("after\n")))
})

test("one agent's read is not another agent's", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\n" }])
  read(["--file-path", "akasha/one/held.ts"], givenFor(root))
  expect(readingIn(root, "another-agent", "akasha/one/held.ts")).toBeNull()
})

test("a body the record already holds comes back as one line", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\ntwo\n" }])
  read(["--file-path", "akasha/one/held.ts"], givenFor(root))
  const said = read(["--file-path", "akasha/one/held.ts"], givenFor(root))
  expect(said.code).toBe(0)
  expect(said.report.length).toBe(1)
  expect(said.report[0]).toContain("you read this body already")
  expect(said.report[0]).toContain("2 lines")
})

test("--full returns the body whatever the record holds", () => {
  const root = rootWith([{ at: "akasha/one/held.ts", body: "one\ntwo\n" }])
  read(["--file-path", "akasha/one/held.ts"], givenFor(root))
  const said = read(["--full", "--file-path", "akasha/one/held.ts"], givenFor(root))
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("the whole file follows")
})

test("a body that moved where git holds nothing comes back whole and says why", () => {
  const root = rootWith([{ at: HELD, body: "before\n" }])
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
  const root = rootWith([{ at: HELD, body: lettered(80) }])
  for (const one of [
    ["init", "--quiet"],
    ["add", "--", HELD],
    ["-c", "user.email=h@a", "-c", "user.name=h", "commit", "--quiet", "-m", HELD, "--", HELD],
  ]) {
    execFileSync("git", ["-C", root, ...one], { stdio: "ignore" })
  }
  read(["--file-path", HELD], givenFor(root))
  const now = lettered(80).replace("line 40 ", "line forty ")
  writeFileSync(join(root, HELD), now)
  const said = read(["--file-path", HELD], givenFor(root))
  expect(said.report[0]).toContain("80 lines now, and what changed follows")
  expect(readingIn(root, AGENT, HELD)?.oid).toBe(blobIdOf(bodyOf(now)))
})

test("an agent whose record holds nothing gets the body whole", () => {
  const root = rootWith([{ at: HELD, body: "one\n" }])
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

test("a warrant naming a file outside the akasha folder reaches no read", () => {
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
