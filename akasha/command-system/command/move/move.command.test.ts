import { afterAll, expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { unreadIn } from "../../../context-system/warranting/warranting.module.code.ts"
import { refusing } from "../../../testing-system/minting/minting.module.code.ts"
import { stands } from "../../../testing-system/putting/putting.module.code.ts"
import { blobIdOf, readingIn } from "../../reading/reading.module.code.ts"
import { move, pairsIn } from "./move.command.code.ts"
import {
  AAAA,
  AGENT,
  ARRIVES,
  BOTH,
  besideWorld,
  bodyIn,
  CODE,
  claiming,
  codeWorld,
  DEEP,
  DEEPER,
  git,
  givenIn,
  HELD,
  HOLDER,
  head,
  held,
  heldIndexed,
  heldPage,
  importing,
  NAMER,
  NAMERS,
  NESTED,
  namersIn,
  OTHER,
  oneUnsaid,
  PAGE,
  PAIR,
  RENAME,
  rebuilt,
  renamed,
  renamedText,
  renaming,
  SECOND_UNSAID,
  SECOND_UNSAID_AT,
  SLUG_RENAME,
  SPELLS,
  scratch,
  sidecarWorld,
  slugStanding,
  TARGET,
  THING,
  THING_AT,
  THING_TYPE,
  THREE,
  takenWorld,
  told,
  twoUnsaid,
  UNSAID,
  UNSAID_AT,
  VALUES,
  VOCABULARY,
  why,
} from "./move.command.test-fixtures.ts"
import { move as moveCommand } from "./move.command.ts"

afterAll(scratch.sweep)

test("a file is carried to its new path, the old path goes, and the page's id is untouched", () => {
  const root = heldIndexed()
  const said = move(PAIR, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(stands(root, HELD)).toBe(false)
  expect(git(root, ["ls-files"]).trim().split("\n")).toEqual([...VOCABULARY, THREE].sort())
  expect(bodyIn(root, THREE)).toBe(PAGE)
  expect(said.report[0]).toBe(`${HELD} moved to ${THREE}`)
  expect(told(said)).not.toContain("wrote ")
  expect(said.report.at(-1)).toStartWith("committed as ")
  expect(told(said)).toContain("was not looked for")
})

test("a page's sidecars go with it without being named", () => {
  const root = rebuilt(sidecarWorld())
  const said = move(["--from", HELD, "--to", DEEP], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(stands(root, DEEPER)).toBe(true)
  expect(stands(root, "akasha/one/deep/held.module.test.ts")).toBe(true)
  expect(stands(root, HOLDER)).toBe(false)
  expect(told(said)).toContain("stood beside what you named")
})

test("a moved body's relative specifier is repointed and a package one is not", () => {
  const root = codeWorld()
  const said = move(["--from", HOLDER, "--to", DEEPER], givenIn(root))
  expect(said.refusals).toEqual([])
  const now = bodyIn(root, DEEPER)
  expect(now).toContain('from "../../two/other.module.code.ts"')
  expect(now).toContain('import ts from "typescript"')
})

test("what imports or spells what moved is repointed, and a dry run writes none", () => {
  const root = codeWorld({ [NAMER]: SPELLS })
  claiming(root, NAMER, [AAAA])
  importing(root, TARGET, [HOLDER])
  const carry = ["--from", TARGET, "--to", ARRIVES]
  const named = `2 files naming what moved would be repointed — ${NAMER}, ${HOLDER}`
  expect(told(move([...carry, "--dry-run"], givenIn(root)))).toContain(named)
  expect(bodyIn(root, NAMER)).toBe(SPELLS)
  const said = move(carry, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, HOLDER)).toContain('from "../four/other.module.code.ts"')
  expect(bodyIn(root, NAMER)).toBe(`export const at = "${ARRIVES}"\n`)
})

test("a reading carries to the new path, and the write it warranted is not refused", () => {
  const root = codeWorld()
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
  const root = codeWorld()
  held(root, HOLDER, CODE)
  const said = move(["--from", HOLDER, "--to", DEEPER, "--dry-run"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(readingIn(root, AGENT, DEEPER)).toBeNull()
  expect(readingIn(root, AGENT, HOLDER)?.mechanicalOid).toBeNull()
})

test("a file moving in the same act is repointed from its body, not as an importer", () => {
  const root = codeWorld()
  importing(root, TARGET, [HOLDER])
  const carry = ["--from", TARGET, "--to", ARRIVES, "--from", HOLDER, "--to", DEEPER]
  const said = move(carry, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, DEEPER)).toContain('from "../../four/other.module.code.ts"')
  expect(told(said)).toContain("no file naming what moved needed repointing")
})

test("an unanswerable index leaves the importers as they stand and says so", () => {
  const root = codeWorld()
  const said = move(["--from", TARGET, "--to", ARRIVES], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, HOLDER)).toBe(CODE)
  expect(told(said)).toContain("could not be answered")
  expect(told(said)).toContain("none were repointed")
})

test("a rename carries the page, restates its slug, and repoints what names it", () => {
  const { root, said } = renamed()
  expect(said.refusals).toEqual([])
  expect(stands(root, THING)).toBe(false)
  const now = renamedText(root)
  expect(now).toContain('slug: "renamed"')
  expect(now).toContain("export const renamed =")
  expect(now).toContain('"thing/renamed"')
  expect(now).toContain('names: ["renamed"]')
  expect(slugStanding(root, "held")).toEqual([])
  expect(slugStanding(root, "renamed")).toEqual([THING_AT])
  expect(namersIn(root, AAAA)).toEqual(NAMERS)
})

test("a page type's slug is not renamed here", () => {
  const root = renaming()
  const said = move(["--from", THING_TYPE, "--to", "akasha/other.page-type.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(why(said)).toContain("a page type's slug")
  expect(stands(root, THING_TYPE)).toBe(true)
})

test("a rename leaving an edge naming nobody is refused and lands nothing", () => {
  const root = renaming('"thin" + "g/held"')
  const was = head(root)
  const said = move(SLUG_RENAME, givenIn(root))
  expect(said.code).toBe(3)
  expect(why(said)).toContain("no `thing` carries the slug `held`")
  expect(stands(root, THING)).toBe(true)
  expect(stands(root, THING_AT)).toBe(false)
  expect(head(root)).toBe(was)
})

test("a rename the index cannot answer for is refused", () => {
  const root = heldPage()
  expect(why(move(RENAME, givenIn(root)))).toContain("could not be answered")
  claiming(root, HELD, [AAAA, "01a04bed-1450-7000-8000-00000000dddd"])
  expect(why(move(RENAME, givenIn(root)))).toContain("the index answers 2 pages")
  expect(stands(root, HELD)).toBe(true)
})

test("a refused move leaves nothing behind", () => {
  const root = besideWorld()
  refusing(root)
  const was = head(root)
  const said = move(PAIR, givenIn(root))
  expect(said.code).toBe(3)
  expect(why(said)).toContain("refused for the test")
  expect(stands(root, HELD)).toBe(true)
  expect(stands(root, HOLDER)).toBe(true)
  expect(stands(root, THREE)).toBe(false)
  expect(stands(root, "akasha/three")).toBe(false)
  expect(head(root)).toBe(was)
})

test("a path that is not there is refused", () => {
  const root = heldPage()
  const said = move(
    ["--from", "akasha/one/nowhere.module.ts", "--to", "akasha/three/nowhere.module.ts"],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is not there")
  expect(stands(root, "akasha/three")).toBe(false)
})

test("a destination that already stands is refused", () => {
  const root = takenWorld()
  const said = move(PAIR, givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("already stands")
  expect(bodyIn(root, THREE)).toBe(OTHER)
})

test("a side standing outside the akasha folder is refused", () => {
  const root = heldPage()
  const said = move(["--from", HELD, "--to", "elsewhere/held.module.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is not under `akasha/`")
})

test("naming no pair is refused rather than committed empty", () => {
  const root = heldPage()
  const said = move([], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("name at least one pair")
})

test("a --from with no --to is refused", () => {
  const said = pairsIn(["--from", "one", "--from", "two"])
  expect("refused" in said ? said.refused : "").toContain("each pair names both sides")
})

test("a dry run gates and writes nothing at all", () => {
  const root = heldPage()
  const was = head(root)
  const said = move([...PAIR, "--dry-run"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(told(said)).toContain("nothing was written")
  expect(stands(root, "akasha/three")).toBe(false)
  expect(head(root)).toBe(was)
  expect(git(root, ["status", "--porcelain", "--", "akasha"]).trim()).toBe("")
})

test("a dry run names the pairs it would carry, sidecars and all", () => {
  const root = sidecarWorld()
  const said = move(["--from", HELD, "--to", DEEP, "--dry-run"], givenIn(root))
  const report = told(said)
  expect(report).toContain(`${HELD} would move to ${DEEP}`)
  expect(report).toContain("stand beside what you named and would go with it")
  expect(report).toContain("akasha/one/held.module.code.ts to akasha/one/deep/held.module.code.ts")
  expect(report).toContain("akasha/one/held.module.test.ts to akasha/one/deep/held.module.test.ts")
  expect(report).toContain("none were repointed")
})

test("a dry run over a move the checks refuse reports it and carries nothing", () => {
  const root = heldPage()
  refusing(root)
  const said = move([...PAIR, "--dry-run"], givenIn(root))
  expect(said.code).toBe(3)
  expect(why(said)).toContain("refused for the test")
  expect(stands(root, "akasha/three")).toBe(false)
  expect(stands(root, HELD)).toBe(true)
})

test("breaking the glass carries a move the checks refuse, and only breaking it does", () => {
  const root = heldIndexed()
  refusing(root)
  const was = head(root)
  const gated = move([...PAIR, "--message", "held moves"], givenIn(root))
  expect(gated.code).toBe(3)
  expect(why(gated)).toContain("refused for the test")
  expect(stands(root, THREE)).toBe(false)
  expect(head(root)).toBe(was)

  const said = move(
    [...PAIR, "--message", "held moves", "--break-the-glass", "  the check is wrong  "],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(told(said)).toContain("no check ran — the glass was broken for: the check is wrong")
  expect(stands(root, THREE)).toBe(true)
  expect(stands(root, HELD)).toBe(false)
  expect(git(root, ["log", "-1", "--pretty=%B"]).trim()).toBe(
    "held moves\n\nChecks-bypassed: the check is wrong"
  )
})

test("breaking the glass with no reason, or alongside a dry run, is refused", () => {
  const root = heldPage()
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
  const root = heldIndexed()
  const at = join(root, "message.txt")
  writeFileSync(at, "carried by a file\n")
  const both = move([...PAIR, "--message", "carried", "--message-file", at], givenIn(root))
  expect(both.code).toBe(1)
  expect(why(both)).toContain("both are given")
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
  const root = heldIndexed()
  const said = move(PAIR, { ...givenIn(root), from: join(root, "akasha/one") })
  expect(said.refusals).toEqual([])
  expect(stands(root, THREE)).toBe(true)
  const out = move(["--from", HELD, "--to", "one/held.module.ts"], givenIn(root))
  expect(out.refusals[0]).toContain("read against the repository root")
})

test("every flag the surface shows is a flag this takes", () => {
  for (const one of moveCommand.taking) {
    const said = pairsIn([one.said.split(" ")[0] ?? ""])
    expect("refused" in said ? said.refused : "").not.toContain("this takes")
  }
})

test("a page holding uncommitted values is carried, and that file goes with it", () => {
  const root = oneUnsaid()
  const said = move(PAIR, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(stands(root, UNSAID)).toBe(false)
  expect(bodyIn(root, UNSAID_AT)).toBe(VALUES)
  expect(told(said)).toContain(`${UNSAID} to ${UNSAID_AT}`)
})

test("the commit a move lands carries no path holding uncommitted values", () => {
  const root = oneUnsaid()
  const said = move(PAIR, givenIn(root))
  expect(said.refusals).toEqual([])
  const shown = git(root, ["diff-tree", "--no-commit-id", "--name-only", "-r", "HEAD"])
  expect(shown.trim().split("\n").sort()).toEqual([HELD, THREE].sort())
  expect(git(root, ["ls-files"]).trim().split("\n")).toEqual([...VOCABULARY, THREE].sort())
})

test("two pages each holding uncommitted values carry both of those files with them", () => {
  const root = twoUnsaid()
  const said = move(BOTH, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(stands(root, UNSAID)).toBe(false)
  expect(stands(root, SECOND_UNSAID)).toBe(false)
  expect(bodyIn(root, UNSAID_AT)).toBe(VALUES)
  expect(bodyIn(root, SECOND_UNSAID_AT)).toBe(VALUES)
})

test("an uncommitted file that will not carry leaves the one carried before it where it stood", () => {
  const root = twoUnsaid()
  const was = head(root)
  let code = -1
  try {
    code = move(NESTED, givenIn(root)).code
  } catch {
    code = -2
  }
  expect(head(root)).toBe(was)
  expect(bodyIn(root, UNSAID)).toBe(VALUES)
  expect(stands(root, HELD)).toBe(true)
  expect(code).toBe(3)
})
