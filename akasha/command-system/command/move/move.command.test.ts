import { afterAll, expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { unreadIn } from "../../../context-system/warranting/warranting.module.code.ts"
import { warrantsStanding } from "../../../context-system/warranting/warranting.module.test-fixtures.ts"
import { refusing } from "../../../testing-system/minting/minting.module.code.ts"
import { put, stands } from "../../../testing-system/putting/putting.module.code.ts"
import { blobIdOf, readingIn, recordRead } from "../../reading/reading.module.code.ts"
import { move, PATHS_AT, pairsIn, surface } from "./move.command.code.ts"
import {
  AAAA,
  ARRIVES,
  CODE,
  claiming,
  DEEP,
  DEEPER,
  git,
  givenIn,
  HELD,
  HOLDER,
  head,
  importing,
  NAMER,
  naming,
  OTHER,
  PAGE,
  PAIR,
  READER,
  RENAME,
  rebuilt,
  repoWith,
  SPELLS,
  scratch,
  TARGET,
  THREE,
  VOCABULARY,
} from "./move.command.test-fixtures.ts"

afterAll(scratch.sweep)

const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

const UNSAID = "akasha/one/held.module.uncommitted.ts"

const UNSAID_AT = "akasha/three/held.module.uncommitted.ts"

const VALUES = `export const held = { title: "unsaid" }\n`

function held(root: string, path: string, body: string): void {
  warrantsStanding(root, ["file-itself"])
  recordRead(root, AGENT, {
    path,
    oid: blobIdOf(new TextEncoder().encode(body)),
    seenAt: 1,
    mechanicalOid: null,
  })
}

function renamed(root: string): string {
  const said = move(RENAME, givenIn(root))
  const why = said.refusals.join("\n")
  expect(said.code).toBe(1)
  expect(why).toContain("renaming is not a move")
  expect(stands(root, HELD)).toBe(true)
  return why
}

test("a file is carried to its new path, the old path goes, and the page's id is untouched", () => {
  const root = rebuilt(repoWith({ [HELD]: PAGE }))
  const said = move(PAIR, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(stands(root, HELD)).toBe(false)
  expect(git(root, ["ls-files"]).trim().split("\n")).toEqual([...VOCABULARY, THREE].sort())
  expect(readFileSync(join(root, THREE), "utf8")).toBe(PAGE)
  expect(said.report[0]).toBe(`${HELD} moved to ${THREE}`)
  expect(said.report.join("\n")).not.toContain("wrote ")
  expect(said.report.at(-1)).toStartWith("committed as ")
  expect(said.report.join("\n")).toContain("was not looked for")
})

test("a page's sidecars go with it without being named", () => {
  const root = rebuilt(
    repoWith({
      [HELD]: PAGE,
      [HOLDER]: CODE,
      "akasha/one/held.module.test.ts": OTHER,
    })
  )
  const said = move(["--from", HELD, "--to", DEEP], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(stands(root, DEEPER)).toBe(true)
  expect(stands(root, "akasha/one/deep/held.module.test.ts")).toBe(true)
  expect(stands(root, HOLDER)).toBe(false)
  expect(said.report.join("\n")).toContain("stood beside what you named")
})

test("a moved body's relative specifier is repointed and a package one is not", () => {
  const root = repoWith({ [HOLDER]: CODE, [TARGET]: OTHER })
  const said = move(["--from", HOLDER, "--to", DEEPER], givenIn(root))
  expect(said.refusals).toEqual([])
  const now = readFileSync(join(root, DEEPER), "utf8")
  expect(now).toContain('from "../../two/other.module.code.ts"')
  expect(now).toContain('import ts from "typescript"')
})

test("what imports or spells what moved is repointed, and a dry run writes none", () => {
  const root = repoWith({ [HOLDER]: CODE, [TARGET]: OTHER, [NAMER]: SPELLS })
  claiming(root, NAMER, [AAAA])
  importing(root, TARGET, [HOLDER])
  const carry = ["--from", TARGET, "--to", ARRIVES]
  const named = `2 files naming what moved would be repointed — ${NAMER}, ${HOLDER}`
  expect(move([...carry, "--dry-run"], givenIn(root)).report.join("\n")).toContain(named)
  expect(readFileSync(join(root, NAMER), "utf8")).toBe(SPELLS)
  const said = move(carry, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(readFileSync(join(root, HOLDER), "utf8")).toContain('from "../four/other.module.code.ts"')
  expect(readFileSync(join(root, NAMER), "utf8")).toBe(`export const at = "${ARRIVES}"\n`)
})

test("a reading carries to the new path, and the write it warranted is not refused", () => {
  const root = repoWith({ [HOLDER]: CODE, [TARGET]: OTHER })
  held(root, HOLDER, CODE)
  const said = move(["--from", HOLDER, "--to", DEEPER], givenIn(root))
  expect(said.refusals).toEqual([])
  const now = readingIn(root, AGENT, DEEPER)
  expect(now?.oid).toBe(blobIdOf(new TextEncoder().encode(CODE)))
  expect(now?.mechanicalOid).toBe(blobIdOf(readFileSync(join(root, DEEPER))))
  expect(readingIn(root, AGENT, HOLDER)).toBeNull()
  expect(unreadIn(root, AGENT, [DEEPER])).toEqual([])
})

test("a dry run carries no reading anywhere", () => {
  const root = repoWith({ [HOLDER]: CODE, [TARGET]: OTHER })
  held(root, HOLDER, CODE)
  const said = move(["--from", HOLDER, "--to", DEEPER, "--dry-run"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(readingIn(root, AGENT, DEEPER)).toBeNull()
  expect(readingIn(root, AGENT, HOLDER)?.mechanicalOid).toBeNull()
})

test("a file moving in the same act is repointed from its body, not as an importer", () => {
  const root = repoWith({ [HOLDER]: CODE, [TARGET]: OTHER })
  importing(root, TARGET, [HOLDER])
  const carry = ["--from", TARGET, "--to", ARRIVES, "--from", HOLDER, "--to", DEEPER]
  const said = move(carry, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(readFileSync(join(root, DEEPER), "utf8")).toContain(
    'from "../../four/other.module.code.ts"'
  )
  expect(said.report.join("\n")).toContain("no file naming what moved needed repointing")
})

test("an unanswerable index leaves the importers as they stand and says so", () => {
  const root = repoWith({ [HOLDER]: CODE, [TARGET]: OTHER })
  const said = move(["--from", TARGET, "--to", ARRIVES], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(readFileSync(join(root, HOLDER), "utf8")).toBe(CODE)
  expect(said.report.join("\n")).toContain("what names the moved files could not be answered")
})

test("a rename names what names the file, and only where the index answers one page", () => {
  const root = repoWith({ [HELD]: PAGE })
  naming(root, AAAA)
  expect(renamed(root)).toContain(
    `\`${PATHS_AT}\` is not there, so what names it could not be answered`
  )
  claiming(root, "akasha/one/two.module.ts", [AAAA])
  expect(renamed(root)).toContain("the index shows no page naming it")
  claiming(root, HELD, [AAAA, "01a04bed-1450-7000-8000-00000000dddd"])
  const two = renamed(root)
  expect(two).toContain(`the index answers 2 pages to the path \`${HELD}\``)
  expect(two).not.toContain(READER)
  claiming(root, HELD, [AAAA])
  expect(renamed(root)).toContain(READER)
})

test("a refused move leaves nothing behind", () => {
  const root = repoWith({ [HELD]: PAGE, [HOLDER]: OTHER })
  refusing(root)
  const was = head(root)
  const said = move(PAIR, givenIn(root))
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(stands(root, HELD)).toBe(true)
  expect(stands(root, HOLDER)).toBe(true)
  expect(stands(root, THREE)).toBe(false)
  expect(stands(root, "akasha/three")).toBe(false)
  expect(head(root)).toBe(was)
})

test("a path that is not there is refused", () => {
  const root = repoWith({ [HELD]: PAGE })
  const said = move(
    ["--from", "akasha/one/nowhere.module.ts", "--to", "akasha/three/nowhere.module.ts"],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is not there")
  expect(stands(root, "akasha/three")).toBe(false)
})

test("a destination that already stands is refused", () => {
  const root = repoWith({ [HELD]: PAGE, [THREE]: OTHER })
  const said = move(PAIR, givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("already stands")
  expect(readFileSync(join(root, THREE), "utf8")).toBe(OTHER)
})

test("a side standing outside the akasha folder is refused", () => {
  const root = repoWith({ [HELD]: PAGE })
  const said = move(["--from", HELD, "--to", "elsewhere/held.module.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is not under `akasha/`")
})

test("naming no pair is refused rather than committed empty", () => {
  const root = repoWith({ [HELD]: PAGE })
  const said = move([], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("name at least one pair")
})

test("a --from with no --to is refused", () => {
  const said = pairsIn(["--from", "one", "--from", "two"])
  expect("refused" in said ? said.refused : "").toContain("each pair names both sides")
})

test("a dry run gates and writes nothing at all", () => {
  const root = repoWith({ [HELD]: PAGE })
  const was = head(root)
  const said = move([...PAIR, "--dry-run"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.report.join("\n")).toContain("nothing was written")
  expect(stands(root, "akasha/three")).toBe(false)
  expect(head(root)).toBe(was)
  expect(git(root, ["status", "--porcelain", "--", "akasha"]).trim()).toBe("")
})

test("a dry run names the pairs it would carry, sidecars and all", () => {
  const root = repoWith({
    [HELD]: PAGE,
    [HOLDER]: CODE,
    "akasha/one/held.module.test.ts": OTHER,
  })
  const said = move(["--from", HELD, "--to", DEEP, "--dry-run"], givenIn(root))
  const report = said.report.join("\n")
  expect(report).toContain(`${HELD} would move to ${DEEP}`)
  expect(report).toContain("stand beside what you named and would go with it")
  expect(report).toContain("akasha/one/held.module.code.ts to akasha/one/deep/held.module.code.ts")
  expect(report).toContain("akasha/one/held.module.test.ts to akasha/one/deep/held.module.test.ts")
  expect(report).toContain("what names the moved files could not be answered")
})

test("a dry run over a move the checks refuse reports it and carries nothing", () => {
  const root = repoWith({ [HELD]: PAGE })
  refusing(root)
  const said = move([...PAIR, "--dry-run"], givenIn(root))
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(stands(root, "akasha/three")).toBe(false)
  expect(stands(root, HELD)).toBe(true)
})

test("breaking the glass carries a move the checks refuse, and only breaking it does", () => {
  const root = rebuilt(repoWith({ [HELD]: PAGE }))
  refusing(root)
  const was = head(root)
  const gated = move([...PAIR, "--message", "held moves"], givenIn(root))
  expect(gated.code).toBe(3)
  expect(gated.refusals.join("\n")).toContain("refused for the test")
  expect(stands(root, THREE)).toBe(false)
  expect(head(root)).toBe(was)

  const said = move(
    [...PAIR, "--message", "held moves", "--break-the-glass", "  the check is wrong  "],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain(
    "no check ran — the glass was broken for: the check is wrong"
  )
  expect(stands(root, THREE)).toBe(true)
  expect(stands(root, HELD)).toBe(false)
  expect(git(root, ["log", "-1", "--pretty=%B"]).trim()).toBe(
    "held moves\n\nChecks-bypassed: the check is wrong"
  )
})

test("breaking the glass with no reason, or alongside a dry run, is refused", () => {
  const root = repoWith({ [HELD]: PAGE })
  const ends = move([...PAIR, "--break-the-glass"], givenIn(root))
  expect(ends.code).toBe(1)
  expect(ends.refusals[0]).toContain("needs a value, and the line ends")
  const empty = move([...PAIR, "--break-the-glass", "  "], givenIn(root))
  expect(empty.code).toBe(1)
  expect(empty.refusals[0]).toContain("no check is to run, and this one is empty")
  const both = move([...PAIR, "--break-the-glass", "no time", "--dry-run"], givenIn(root))
  expect(both.code).toBe(1)
  expect(both.refusals[0]).toContain("runs none, so together they report nothing")
  expect(stands(root, "akasha/three")).toBe(false)
})

test("a message is read from a file and trimmed, and stated twice over or empty is refused", () => {
  const root = rebuilt(repoWith({ [HELD]: PAGE }))
  const at = join(root, "message.txt")
  writeFileSync(at, "carried by a file\n")
  const both = move([...PAIR, "--message", "carried", "--message-file", at], givenIn(root))
  expect(both.code).toBe(1)
  expect(both.refusals.join("\n")).toContain("both are given")
  writeFileSync(at, "   \n")
  const empty = move([...PAIR, "--message-file", at], givenIn(root))
  expect(empty.code).toBe(1)
  expect(empty.refusals[0]).toContain("the message given is empty")
  expect(stands(root, "akasha/three")).toBe(false)
  writeFileSync(at, "  carried by a file  \n")
  const said = move([...PAIR, "--message-file", at], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(git(root, ["log", "-1", "--pretty=%B"]).trim()).toBe("carried by a file")
})

test("a path is read against the repository root, wherever the call was made", () => {
  const root = rebuilt(repoWith({ [HELD]: PAGE }))
  const said = move(PAIR, { ...givenIn(root), from: join(root, "akasha/one") })
  expect(said.refusals).toEqual([])
  expect(stands(root, THREE)).toBe(true)
  const out = move(["--from", HELD, "--to", "one/held.module.ts"], givenIn(root))
  expect(out.refusals[0]).toContain("read against the repository root")
})

test("every flag the surface shows is a flag this takes", () => {
  for (const one of surface.taking) {
    const said = pairsIn([one.said.split(" ")[0] ?? ""])
    expect("refused" in said ? said.refused : "").not.toContain("this takes")
  }
})

test("a page holding uncommitted values is carried, and that file goes with it", () => {
  const root = rebuilt(repoWith({ [HELD]: PAGE }))
  put(root, UNSAID, VALUES)
  const said = move(PAIR, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(stands(root, UNSAID)).toBe(false)
  expect(readFileSync(join(root, UNSAID_AT), "utf8")).toBe(VALUES)
  expect(said.report.join("\n")).toContain(`${UNSAID} to ${UNSAID_AT}`)
})

test("the commit a move lands carries no path holding uncommitted values", () => {
  const root = rebuilt(repoWith({ [HELD]: PAGE }))
  put(root, UNSAID, VALUES)
  const said = move(PAIR, givenIn(root))
  expect(said.refusals).toEqual([])
  const shown = git(root, ["diff-tree", "--no-commit-id", "--name-only", "-r", "HEAD"])
  expect(shown.trim().split("\n").sort()).toEqual([HELD, THREE].sort())
  expect(git(root, ["ls-files"]).trim().split("\n")).toEqual([...VOCABULARY, THREE].sort())
})
