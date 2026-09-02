import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { refusing } from "@akasha/testing-system/minting"
import { put, there } from "@akasha/testing-system/putting"
import { readingIn, recordRead } from "../../reading/reading.module.code.ts"
import { namedIn, remove } from "./remove.command.code.ts"
import {
  BESIDE,
  BESIDE_IT,
  BODY,
  DEEP,
  git,
  givenIn,
  HELD,
  head,
  KEPT,
  naming,
  OUTSIDE,
  repoWith,
  scratch,
} from "./remove.command.test-fixtures.ts"
import { remove as removeCommand } from "./remove.command.ts"

afterAll(scratch.sweep)

const AGENT = "01a04bed-1461-7364-8579-6799d5aa8ea0"

const GONE = "akasha/one/nowhere.ts"

test("named paths are taken away and the removal is committed", () => {
  const root = repoWith({ [HELD]: BODY, "akasha/one/kept.module.ts": BODY })
  const said = remove(naming(HELD), givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(there(root, HELD)).toBe(false)
  expect(git(root, ["ls-files"]).trim()).toBe("akasha/one/kept.module.ts")
  expect(said.report[0]).toBe(`${HELD} taken away`)
  expect(said.report.join("\n")).not.toContain("took away ")
  expect(said.report.join("\n")).not.toContain("unjudged")
  expect(said.report.at(-1)).toStartWith("committed as ")
})

test("a path that is not there is already gone, and what does stand is still taken", () => {
  const root = repoWith({ [HELD]: BODY })
  const said = remove(naming(HELD, GONE), givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe(`${HELD} taken away`)
  expect(said.report.join("\n")).toContain(`${GONE} was already gone`)
  expect(there(root, HELD)).toBe(false)
})

test("a removal forgets the reading of what went, for every agent holding one", () => {
  const root = repoWith({ [HELD]: BODY, [KEPT]: BODY })
  recordRead(root, AGENT, { path: HELD, oid: "one", seenAt: 1, mechanicalOid: null })
  recordRead(root, AGENT, { path: KEPT, oid: "two", seenAt: 1, mechanicalOid: null })
  const said = remove(naming(HELD), givenIn(root))
  expect(said.refusals).toEqual([])
  expect(readingIn(root, AGENT, HELD)).toBeNull()
  expect(readingIn(root, AGENT, KEPT)?.oid).toBe("two")
})

test("naming a path already gone forgets its reading and commits nothing", () => {
  const root = repoWith({ [HELD]: BODY })
  const was = head(root)
  recordRead(root, AGENT, { path: GONE, oid: "one", seenAt: 1, mechanicalOid: null })
  const said = remove(naming(GONE), givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain(`${GONE} was already gone`)
  expect(said.report.join("\n")).toContain("nothing stood to be taken away")
  expect(readingIn(root, AGENT, GONE)).toBeNull()
  expect(there(root, HELD)).toBe(true)
  expect(head(root)).toBe(was)
})

test("a directory opens onto every tracked file under it", () => {
  const root = repoWith({ [HELD]: BODY, "akasha/one/deep/under.module.ts": BODY, [KEPT]: BODY })
  const said = remove(naming("akasha/one"), givenIn(root))
  expect(said.refusals).toEqual([])
  expect(git(root, ["ls-files"]).trim()).toBe(KEPT)
  expect(said.report.join("\n")).toContain("stood under a directory you named")
})

test("a directory holding no tracked file is refused", () => {
  const root = repoWith({ [HELD]: BODY })
  mkdirSync(join(root, "akasha/empty"), { recursive: true })
  const said = remove(naming("akasha/empty"), givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("git holds no file under")
  expect(there(root, "akasha/empty")).toBe(true)
})

test("a page's sidecars go with it without being named", () => {
  const root = repoWith({
    [HELD]: BODY,
    [BESIDE]: BODY,
    "akasha/one/held.module.test.ts": BODY,
    "akasha/one/kept.module.ts": BODY,
  })
  const said = remove(naming(HELD), givenIn(root))
  expect(said.refusals).toEqual([])
  expect(there(root, BESIDE)).toBe(false)
  expect(there(root, "akasha/one/held.module.test.ts")).toBe(false)
  expect(said.report.join("\n")).toContain("stood beside what you named")
  expect(git(root, ["ls-files"]).trim()).toBe("akasha/one/kept.module.ts")
})

test("a directory the removal leaves empty goes with it", () => {
  const root = repoWith({ [DEEP]: BODY, [KEPT]: BODY })
  const said = remove(naming(DEEP), givenIn(root))
  expect(said.refusals).toEqual([])
  expect(there(root, "akasha/one/deep")).toBe(false)
  expect(there(root, "akasha/one")).toBe(false)
  expect(there(root, "akasha")).toBe(true)
  expect(said.report.join("\n")).toContain("git holds no empty directory")
})

test("a refused removal leaves nothing behind, and takes none of the paths it could have taken", () => {
  const root = repoWith({ [HELD]: BODY, [BESIDE]: BODY })
  mkdirSync(join(root, "akasha/empty"), { recursive: true })
  const was = head(root)
  const said = remove(naming(HELD, "akasha/empty"), givenIn(root))
  expect(said.code).toBe(1)
  expect(there(root, HELD)).toBe(true)
  expect(there(root, BESIDE)).toBe(true)
  expect(there(root, "akasha/empty")).toBe(true)
  expect(head(root)).toBe(was)
})

test("a check that refuses a deletion stops the removal, and nothing is taken away", () => {
  const root = repoWith({ [HELD]: BODY })
  refusing(root)
  const was = head(root)
  const said = remove(naming(HELD), givenIn(root))
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(there(root, HELD)).toBe(true)
  expect(head(root)).toBe(was)
})

test("a path named twice is refused", () => {
  const root = repoWith({ [HELD]: BODY })
  const twice = remove(naming(HELD, HELD), givenIn(root))
  expect(twice.code).toBe(1)
  expect(twice.refusals[0]).toContain("named more than once")
})

test("a path outside akasha goes unjudged, and the file beside it is left alone", () => {
  const root = repoWith({ [OUTSIDE]: BODY, [BESIDE_IT]: BODY, [HELD]: BODY })
  const dry = remove([...naming(OUTSIDE), "--dry-run"], givenIn(root))
  expect(dry.code).toBe(0)
  expect(dry.report.join("\n")).toContain(`would go unjudged — ${OUTSIDE}`)
  expect(there(root, OUTSIDE)).toBe(true)
  const said = remove(naming(OUTSIDE), givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.report.join("\n")).toContain(`went unjudged — ${OUTSIDE}`)
  expect(git(root, ["ls-files"]).trim()).toBe(`${HELD}\n${BESIDE_IT}`)
})

test("a directory outside the akasha folder opens onto every file git holds under it", () => {
  const root = repoWith({ [OUTSIDE]: BODY, "temper/one/deep/under.ts": BODY, [HELD]: BODY })
  expect(remove(naming("temper/one"), givenIn(root)).refusals).toEqual([])
  expect(git(root, ["ls-files"]).trim()).toBe(HELD)
  expect(there(root, "temper/one")).toBe(false)
  expect(there(root, "temper")).toBe(true)
})

test("a folder at the top of the repository is refused, and so is a path inside .git", () => {
  const root = repoWith({ [HELD]: BODY, [OUTSIDE]: BODY })
  expect(remove(naming("temper"), givenIn(root)).refusals[0]).toContain("at the top of the")
  expect(remove(naming("akasha"), givenIn(root)).code).toBe(1)
  expect(remove(naming(".git/config"), givenIn(root)).refusals[0]).toContain("`.git/`")
  expect(git(root, ["ls-files"]).trim()).toBe(`${HELD}\n${OUTSIDE}`)
})

test("naming no path is refused rather than committed empty", () => {
  const root = repoWith({ [HELD]: BODY })
  const said = remove([], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe("name at least one path to remove, as `--file-path <path>`")
})

test("a bare path is refused, and the refusal says what to type instead", () => {
  const said = namedIn([HELD])
  expect("refused" in said ? said.refused : "").toBe(
    "`akasha/one/held.module.ts` stands on its own, and a removal names every path behind a " +
      "flag — say `--file-path akasha/one/held.module.ts`"
  )
})

test("--file-path with nothing after it, or another flag after it, is refused", () => {
  const ends = namedIn(["--file-path"])
  expect("refused" in ends ? ends.refused : "").toBe(
    "--file-path takes a path, and none follows it"
  )
  const flagged = namedIn(["--file-path", "--dry-run"])
  expect("refused" in flagged ? flagged.refused : "").toBe(
    "--file-path takes a path, and `--dry-run` names another flag"
  )
})

test("a flag the removal does not take is refused rather than read as a path", () => {
  const said = namedIn(["--force", ...naming(HELD)])
  expect("refused" in said ? said.refused : "").toBe(
    "`--force` is not a flag this takes — a removal names its paths as `--file-path <path>` and " +
      "takes `--message`, `--message-file`, `--break-the-glass`, `--dry-run`"
  )
})

test("a dry run takes nothing away and writes nothing at all", () => {
  const root = repoWith({ [DEEP]: BODY, "akasha/one/deep/held.module.code.ts": BODY, [KEPT]: BODY })
  const was = head(root)
  const argv = naming("akasha/one")
  const said = remove([...argv, "--dry-run"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("nothing was written")
  expect(there(root, DEEP)).toBe(true)
  expect(there(root, "akasha/one/deep")).toBe(true)
  expect(head(root)).toBe(was)
  expect(git(root, ["status", "--porcelain", "--", "akasha"]).trim()).toBe("")
  const then = remove(argv, givenIn(root))
  expect(then.refusals).toEqual([])
  expect(there(root, "akasha/one")).toBe(false)
  expect(git(root, ["ls-files"]).trim()).toBe(KEPT)
  expect(head(root)).not.toBe(was)
})

test("a dry run names everything that would go, named or not, down to the emptied directory", () => {
  const root = repoWith({
    [DEEP]: BODY,
    "akasha/one/deep/held.module.code.ts": BODY,
    "akasha/one/deep/under.module.ts": BODY,
    [KEPT]: BODY,
  })
  const one = remove([...naming(DEEP), "--dry-run"], givenIn(root))
  const said = one.report.join("\n")
  expect(said).toContain(`${DEEP} would be taken away`)
  expect(said).toContain("akasha/one/deep/held.module.code.ts would be taken away")
  expect(said).toContain("stand beside what you named and would go with it")
  expect(said).not.toContain(KEPT)
  const two = remove([...naming("akasha/one"), "--dry-run"], givenIn(root))
  const also = two.report.join("\n")
  expect(also).toContain("stand under a directory you named and would go with it")
  expect(also).toContain("akasha/one/deep/under.module.ts would be taken away")
  expect(also).toContain("git holds no empty directory")
})

test("a dry run over a removal the checks refuse reports the refusal and takes nothing", () => {
  const root = repoWith({ [HELD]: BODY })
  refusing(root)
  const said = remove([...naming(HELD), "--dry-run"], givenIn(root))
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(there(root, HELD)).toBe(true)
})

test("breaking the glass takes away what the checks refuse, and only breaking it does", () => {
  const root = repoWith({ [HELD]: BODY })
  refusing(root)
  const was = head(root)
  const gated = remove([...naming(HELD), "--message", "held goes"], givenIn(root))
  expect(gated.code).toBe(3)
  expect(gated.refusals.join("\n")).toContain("refused for the test")
  expect(there(root, HELD)).toBe(true)
  expect(head(root)).toBe(was)

  const said = remove(
    [...naming(HELD), "--message", "held goes", "--break-the-glass", "  the check is wrong  "],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain(
    "no check ran — the glass was broken for: the check is wrong"
  )
  expect(there(root, HELD)).toBe(false)
  expect(git(root, ["log", "-1", "--pretty=%s"]).trim()).toBe("held goes")
  expect(git(root, ["log", "-1", "--pretty=%B"]).trim()).toBe(
    "held goes\n\nChecks-bypassed: the check is wrong"
  )
})

test("breaking the glass with no reason, or alongside a dry run, is refused", () => {
  const root = repoWith({ [HELD]: BODY })
  const ends = remove([...naming(HELD), "--break-the-glass"], givenIn(root))
  expect(ends.code).toBe(1)
  expect(ends.refusals[0]).toBe("--break-the-glass needs a value, and the line ends")
  const empty = remove([...naming(HELD), "--break-the-glass", "  "], givenIn(root))
  expect(empty.code).toBe(1)
  expect(empty.refusals[0]).toBe(
    "--break-the-glass takes the reason no check is to run, and this one is empty"
  )
  const both = remove([...naming(HELD), "--break-the-glass", "no time", "--dry-run"], givenIn(root))
  expect(both.code).toBe(1)
  expect(both.refusals[0]).toBe(
    "--dry-run reports what the checks say and --break-the-glass runs none, so together they report nothing"
  )
  expect(there(root, HELD)).toBe(true)
})

test("a directory left holding a file git does not track is kept, and the removal says so", () => {
  const root = repoWith({ [DEEP]: BODY, [KEPT]: BODY })
  const loose = "akasha/one/deep/unsaid.txt"
  put(root, loose, "work in progress\n")
  const said = remove(naming(DEEP), givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(there(root, DEEP)).toBe(false)
  expect(there(root, loose)).toBe(true)
  expect(there(root, "akasha/one/deep")).toBe(true)
  expect(said.report.join("\n")).not.toContain("git holds no empty directory")
})

test("a message is read from a file and trimmed, and stated twice over or empty is refused", () => {
  const root = repoWith({ [HELD]: BODY })
  const at = join(root, "message.txt")
  writeFileSync(at, "taken by a file\n")
  const both = remove(
    [...naming(HELD), "--message", "taken by the line", "--message-file", at],
    givenIn(root)
  )
  expect(both.code).toBe(1)
  expect(both.refusals.join("\n")).toContain("both are given")
  writeFileSync(at, "   \n")
  const empty = remove([...naming(HELD), "--message-file", at], givenIn(root))
  expect(empty.code).toBe(1)
  expect(empty.refusals[0]).toContain("the message given is empty")
  expect(there(root, HELD)).toBe(true)
  writeFileSync(at, "  taken by a file  \n")
  const said = remove([...naming(HELD), "--message-file", at], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(git(root, ["log", "-1", "--pretty=%B"]).trim()).toBe("taken by a file")
})

test("a path is read against the repository root, wherever the call was made", () => {
  const root = repoWith({ [HELD]: BODY })
  const said = remove(naming(HELD), { ...givenIn(root), from: join(root, "akasha") })
  expect(said.refusals).toEqual([])
  const out = remove(["--file-path", "../elsewhere/held.ts"], givenIn(root))
  expect(out.refusals[0]).toContain("read against the repository root")
})

test("every flag the surface shows is a flag this takes", () => {
  for (const one of removeCommand.taking) {
    const said = namedIn([one.said.split(" ")[0] ?? ""])
    expect("refused" in said ? said.refused : "").not.toContain("this takes")
  }
})
