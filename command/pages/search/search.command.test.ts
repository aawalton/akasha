import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  blobIdOf,
  readingIn,
  sightingsIn,
} from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { INPUT, OK } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { ANSWER_CEILING, widthOf } from "akasha/command/modules/long-body/long-body.module.code.ts"
import {
  AGENT,
  givenAt,
  givenFor,
  rootWith,
  scratch,
} from "akasha/command/pages/read/read.command.test-fixtures.ts"
import {
  ripgrepArguments,
  searchWith,
  shownLine,
} from "akasha/command/pages/search/search.command.code.ts"

afterAll(scratch.sweep)

const A = "akasha/one/a.ts"

const B = "akasha/two/b.ts"

const NOTE = "akasha/two/note.md"

function world(): string {
  return rootWith([
    { at: A, body: "alpha\nneedle one\nbeta\ngamma\ndelta\nneedle three\n" },
    { at: B, body: "needle two\n" },
    { at: NOTE, body: "a NEEDLE in a note\n" },
    { at: ".git/held", body: "needle in git\n" },
    { at: ".hidden/held.ts", body: "needle hidden\n" },
  ])
}

test("a search shows each line matched under its file's path, with its line number", async () => {
  const said = await searchWith(["needle"], givenFor(world()), null)
  expect(said.code).toBe(OK)
  expect(said.report).toContain(A)
  expect(said.report).toContain(shownLine(2, "needle one\n", true))
  expect(said.report).toContain(shownLine(1, "needle two\n", true))
  expect(said.report.indexOf(A)).toBeLessThan(said.report.indexOf(B))
  expect(said.report).not.toContain("--")
})

test("a file a search showed is recorded as seen in part, and no read", async () => {
  const root = world()
  await searchWith(["needle"], givenFor(root), null)
  const seen = sightingsIn(root, AGENT, A)
  expect(seen[0]?.linesShown).toEqual([2, 6])
  expect(seen[0]?.oid).toBe(blobIdOf(readFileSync(join(root, A))))
  expect(readingIn(root, AGENT, A)).toBeNull()
})

test("lines around a match are marked apart and recorded as shown", async () => {
  const root = world()
  const said = await searchWith(
    ["needle", "--context-lines", "1", "--within", "akasha/one"],
    givenFor(root),
    null
  )
  expect(said.report).toContain(shownLine(1, "alpha\n", false))
  expect(said.report).toContain("--")
  expect(said.report).not.toContain(B)
  expect(sightingsIn(root, AGENT, A)[0]?.linesShown).toEqual([1, 2, 3, 5, 6])
})

test("a search passes over the git folder and what is hidden", async () => {
  const said = await searchWith(["needle"], givenFor(world()), null)
  expect(said.report.join("\n")).not.toContain("needle in git")
  expect(said.report.join("\n")).not.toContain("needle hidden")
})

test("a glob, a kind of file and a case left open each narrow or widen the search", async () => {
  const root = world()
  const globbed = await searchWith(["NEEDLE", "--glob", "*.md"], givenFor(root), null)
  expect(globbed.report.slice(0, 2)).toEqual([NOTE, shownLine(1, "a NEEDLE in a note\n", true)])
  const typed = await searchWith(["needle", "--file-type", "md"], givenFor(root), null)
  expect(typed.report).not.toContain(NOTE)
  const open = await searchWith(
    ["needle", "--file-type", "md", "--ignore-case"],
    givenFor(root),
    null
  )
  expect(open.report).toContain(NOTE)
})

test("a search naming only paths shows no line and records nothing, wherever it goes", async () => {
  const root = world()
  const said = await searchWith(["needle", "--files-only"], givenAt(root), "a pipe")
  expect(said.code).toBe(OK)
  expect(said.report.slice(0, 2)).toEqual([A, B])
  expect(sightingsIn(root, AGENT, A)).toEqual([])
})

test("a search showing lines whose output is thrown away is refused and records nothing", async () => {
  const root = world()
  const said = await searchWith(["needle"], givenFor(root), "a pipe")
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("a pipe")
  expect(sightingsIn(root, AGENT, A)).toEqual([])
})

test("a search showing lines for an agent nothing identifies is refused", async () => {
  const said = await searchWith(["needle"], givenAt(world()), null)
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("AGENT_ID")
})

test("a path outside the repository, and one naming nothing, are refused", async () => {
  const root = world()
  const away = await searchWith(["needle", "--within", "../elsewhere"], givenFor(root), null)
  expect(away.refusals.join("\n")).toContain("outside the repository")
  const none = await searchWith(["needle", "--within", "akasha/none"], givenFor(root), null)
  expect(none.refusals.join("\n")).toContain("names nothing")
})

test("a search nothing matched says so and is no fault", async () => {
  const said = await searchWith(["absent-word"], givenFor(world()), null)
  expect(said.code).toBe(OK)
  expect(said.report.join("\n")).toContain("Nothing matched")
})

test("a pattern ripgrep will not read is a fault of the input", async () => {
  const said = await searchWith(["needle(", "--files-only"], givenFor(world()), null)
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("ripgrep refused")
  expect(said.refusals.join("\n")).toContain("regex parse error")
})

test("a search past one answer stops under its bytes and says how to narrow it", async () => {
  const many = []
  for (let one = 0; one < 60; one += 1) {
    many.push({ at: `akasha/many/file-${one}.ts`, body: `needle ${"x".repeat(70)}\n`.repeat(20) })
  }
  const root = rootWith(many)
  const said = await searchWith(["needle"], givenFor(root), null)
  expect(said.report.reduce((sum, one) => sum + widthOf(one), 0)).toBeLessThan(ANSWER_CEILING)
  expect(said.report.join("\n")).toContain("stopped at")
})

test("a line longer than a search shows is cut and says how much", () => {
  const said = shownLine(7, `${"x".repeat(450)}\n`, true)
  expect(said).toContain("50 more characters")
  expect(said.startsWith("     7:\t")).toBe(true)
})

test("the git folder is kept out after every glob a search is named", () => {
  const said = ripgrepArguments({
    pattern: "p",
    within: [],
    globs: ["*.ts"],
    types: [],
    around: null,
    filesOnly: false,
    ignoreCase: false,
  })
  expect(said.indexOf("!.git")).toBeGreaterThan(said.indexOf("*.ts"))
})
