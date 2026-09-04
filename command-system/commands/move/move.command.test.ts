import { afterAll, expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { unreadIn } from "@akasha/context-system/warranting"
import { refusing } from "@akasha/testing-system/minting"
import { there } from "@akasha/testing-system/putting"
import { blobIdOf, readingIn } from "../../reading/reading.module.code.ts"
import { pairsIn } from "./arguing/move-arguing.module.code.ts"
import { move } from "./move.command.code.ts"
import {
  AAAA,
  AGENT,
  ARRIVES,
  BOTH,
  besideWorld,
  bodyIn,
  CARRY,
  CODE,
  claiming,
  codeWorld,
  DEEP,
  DEEPER,
  filedAt,
  GAMMA,
  GLASSED,
  git,
  givenIn,
  HELD,
  HOLDER,
  head,
  held,
  heldIndexed,
  heldPage,
  heldUnindexed,
  importing,
  LOCK,
  linkWatched,
  MISSING,
  NAMER,
  NAMERS,
  NESTED,
  namersIn,
  OTHER,
  oneUnsaid,
  outsideMoved,
  PAGE,
  PAIR,
  RELOCKED,
  RENAME,
  REPOINTED,
  rebuilt,
  renamed,
  renamedText,
  renaming,
  SAYING,
  SECOND_UNSAID,
  SECOND_UNSAID_AT,
  SIDE,
  SIDE_AT,
  SLUG_RENAME,
  SPELLS,
  scratch,
  sidecarWorld,
  spellingWorld,
  TARGET,
  THING,
  THING_AT,
  THING_BESIDE,
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
  expect(there(root, HELD)).toBe(false)
  expect(git(root, ["ls-files"]).trim().split("\n")).toEqual([...VOCABULARY, THREE].sort())
  expect(bodyIn(root, THREE)).toBe(PAGE)
  expect(said.report[0]).toBe(`${HELD} moved to ${THREE}`)
  expect(told(said)).not.toContain("wrote ")
  expect(said.report.at(-1)).toStartWith("committed as ")
  expect(told(said)).toContain("no file outside")
})

test("a file outside akasha naming a moved folder is repointed and a near name is not", () => {
  const { root, said } = outsideMoved()
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, LOCK)).toBe(RELOCKED)
  expect(told(said)).toContain(`outside \`akasha/\` naming what moved was repointed — ${LOCK}`)
})

test("a page's sidecars go with it without being named", () => {
  const root = rebuilt(sidecarWorld())
  const said = move(["--from", HELD, "--to", DEEP], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(there(root, DEEPER)).toBe(true)
  expect(there(root, SIDE_AT)).toBe(true)
  expect(there(root, HOLDER)).toBe(false)
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
  const root = spellingWorld()
  expect(told(move([...CARRY, "--dry-run"], givenIn(root)))).toContain(REPOINTED)
  expect(bodyIn(root, NAMER)).toBe(SPELLS)
  const said = move(CARRY, givenIn(root))
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

test("a rename restates its slug, repoints what names it, and names what it left", () => {
  const { root, said } = renamed()
  expect(said.refusals).toEqual([])
  expect(there(root, THING)).toBe(false)
  const now = renamedText(root)
  expect(now).toContain('slug: "renamed"')
  expect(now).toContain("export const renamed =")
  expect(now).toContain('"thing/renamed"')
  expect(now).toContain('names: ["renamed"]')
  expect(filedAt(root, "held")).toEqual([])
  expect(filedAt(root, "renamed")).toEqual([THING_AT])
  expect(namersIn(root, AAAA)).toEqual(NAMERS)
  expect(told(said)).toContain("renamed from the slug `held` to `renamed`")
  expect(told(said)).toContain("still spells the old slug `held`")
  expect(told(said)).toContain(GAMMA)
  expect(THING_BESIDE.map((one) => there(root, one))).toEqual([false, true])
  expect(bodyIn(root, THING_BESIDE[1] ?? "")).toContain("const renamed")
})

test("a page type's slug is not renamed here", () => {
  const root = renaming()
  const said = move(["--from", THING_TYPE, "--to", "akasha/other.page-type.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(why(said)).toContain("a page type's slug")
  expect(there(root, THING_TYPE)).toBe(true)
})

test("a rename leaving an edge naming nobody is refused and lands nothing", () => {
  const root = renaming('"thin" + "g/held"')
  const was = head(root)
  const said = move(SLUG_RENAME, givenIn(root))
  expect(said.code).toBe(3)
  expect(why(said)).toContain("no `thing` carries the slug `held`")
  expect(there(root, THING)).toBe(true)
  expect(there(root, THING_AT)).toBe(false)
  expect(head(root)).toBe(was)
})

test("a rename the index cannot answer for is refused", () => {
  const root = heldUnindexed()
  expect(why(move(RENAME, givenIn(root)))).toContain("could not be answered")
  claiming(root, HELD, [AAAA, "01a04bed-1450-7000-8000-00000000dddd"])
  expect(why(move(RENAME, givenIn(root)))).toContain("the index answers 2 pages")
  expect(there(root, HELD)).toBe(true)
})

test("a refused move leaves nothing behind", () => {
  const root = besideWorld()
  refusing(root)
  const was = head(root)
  const said = move(PAIR, givenIn(root))
  expect(said.code).toBe(3)
  expect(why(said)).toContain("refused for the test")
  expect(there(root, HELD)).toBe(true)
  expect(there(root, HOLDER)).toBe(true)
  expect(there(root, THREE)).toBe(false)
  expect(there(root, "akasha/three")).toBe(false)
  expect(head(root)).toBe(was)
})

test("a path that is not there is refused", () => {
  const root = heldPage()
  const said = move(MISSING, givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is not there")
  expect(there(root, "akasha/three")).toBe(false)
})

test("a destination that already stands is refused", () => {
  const root = takenWorld()
  const said = move(PAIR, givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("already stands")
  expect(bodyIn(root, THREE)).toBe(OTHER)
})

test("a side outside the repository is refused", () => {
  const root = heldPage()
  const said = move(["--from", HELD, "--to", "../held.module.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is no path inside the repository")
})

test("naming no pair is refused rather than committed empty", () => {
  const root = heldPage()
  const said = move([], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("name at least one pair")
})

test("a dry run gates and writes nothing at all", () => {
  const root = heldPage()
  const was = head(root)
  const said = move([...PAIR, "--dry-run"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(told(said)).toContain("nothing was written")
  expect(there(root, "akasha/three")).toBe(false)
  expect(head(root)).toBe(was)
  expect(git(root, ["status", "--porcelain", "--", "akasha"]).trim()).toBe("")
})

test("a package is reached again while the checks judge a move, and a dry run reaches none", () => {
  expect(linkWatched()).toEqual(["gone", "linked"])
})

test("a dry run names the pairs it would carry, sidecars and all", () => {
  const root = sidecarWorld()
  const said = move(["--from", HELD, "--to", DEEP, "--dry-run"], givenIn(root))
  const report = told(said)
  expect(report).toContain(`${HELD} would move to ${DEEP}`)
  expect(report).toContain("stand beside what you named and would go with it")
  expect(report).toContain(`${HOLDER} to ${DEEPER}`)
  expect(report).toContain(`${SIDE} to ${SIDE_AT}`)
  expect(report).toContain("none were repointed")
})

test("a dry run over a move the checks refuse reports it and carries nothing", () => {
  const root = heldPage()
  refusing(root)
  const said = move([...PAIR, "--dry-run"], givenIn(root))
  expect(said.code).toBe(3)
  expect(why(said)).toContain("refused for the test")
  expect(there(root, "akasha/three")).toBe(false)
  expect(there(root, HELD)).toBe(true)
})

test("breaking the glass carries a move the checks refuse, and only breaking it does", () => {
  const root = heldIndexed()
  refusing(root)
  const was = head(root)
  const gated = move(SAYING, givenIn(root))
  expect(gated.code).toBe(3)
  expect(why(gated)).toContain("refused for the test")
  expect(there(root, THREE)).toBe(false)
  expect(head(root)).toBe(was)

  const said = move(GLASSED, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(told(said)).toContain("no check ran — the glass was broken for: the check is wrong")
  expect(there(root, THREE)).toBe(true)
  expect(there(root, HELD)).toBe(false)
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
  expect(there(root, "akasha/three")).toBe(false)
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
  expect(there(root, "akasha/three")).toBe(false)
  writeFileSync(at, "  carried by a file  \n")
  const said = move([...PAIR, "--message-file", at], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(git(root, ["log", "-1", "--pretty=%B"]).trim()).toBe("carried by a file")
})

test("a path is read against the repository root, wherever the call was made", () => {
  const root = heldIndexed()
  const said = move(PAIR, { ...givenIn(root), from: join(root, "akasha/one") })
  expect(said.refusals).toEqual([])
  expect(there(root, THREE)).toBe(true)
  const out = move(["--from", HELD, "--to", "../held.module.ts"], givenIn(root))
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
  expect(there(root, UNSAID)).toBe(false)
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
  expect(there(root, UNSAID)).toBe(false)
  expect(there(root, SECOND_UNSAID)).toBe(false)
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
  expect(there(root, HELD)).toBe(true)
  expect(code).toBe(3)
})
