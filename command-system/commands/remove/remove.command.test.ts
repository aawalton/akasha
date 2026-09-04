import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { refusing } from "@akasha/testing-system/minting"
import { put, there } from "@akasha/testing-system/putting"
import { readingIn, recordRead } from "../../reading/reading.module.code.ts"
import { namedIn, remove } from "./remove.command.code.ts"
import {
  AGENT,
  BESIDE,
  BODY,
  DEEP,
  fileIn,
  GONE,
  GONE_WAY,
  git,
  givenIn,
  HELD,
  head,
  KEPT,
  KEPT_WAY,
  MANIFEST,
  MOVED_MANIFEST,
  manifested,
  manifestIn,
  naming,
  OUTSIDE,
  PACKAGE_WITH_WAYS,
  PACKAGE_WITHOUT_GONE,
  REFUSED_ENDS,
  REFUSED_FLAGGED,
  REFUSED_UNKNOWN,
  refusalOf,
  removing,
  reportOf,
  repoWith,
  scratch,
  WAYS_IN,
  WORKSPACE,
} from "./remove.command.test-fixtures.ts"
import { remove as removeCommand } from "./remove.command.ts"

afterAll(scratch.sweep)

test("named paths are taken away and the removal is committed", () => {
  const root = repoWith({ [HELD]: BODY, "akasha/one/kept.module.ts": BODY })
  const said = removing(root, naming(HELD))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(there(root, HELD)).toBe(false)
  expect(git(root, ["ls-files"]).trim()).toBe("akasha/one/kept.module.ts")
  expect(said.report[0]).toBe(`${HELD} taken away`)
  expect(reportOf(said)).not.toContain("took away ")
  expect(reportOf(said)).not.toContain("unjudged")
  expect(said.report.at(-1)).toStartWith("committed as ")
})

test("a path that is not there is already gone, and what does stand is still taken", () => {
  const root = repoWith({ [HELD]: BODY })
  const said = removing(root, naming(HELD, GONE))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe(`${HELD} taken away`)
  expect(reportOf(said)).toContain(`${GONE} was already gone`)
  expect(there(root, HELD)).toBe(false)
})

test("a removal forgets the reading of what went, for every agent holding one", () => {
  const root = repoWith({ [HELD]: BODY, [KEPT]: BODY })
  recordRead(root, AGENT, { path: HELD, oid: "one", seenAt: 1, mechanicalOid: null })
  recordRead(root, AGENT, { path: KEPT, oid: "two", seenAt: 1, mechanicalOid: null })
  const said = removing(root, naming(HELD))
  expect(said.refusals).toEqual([])
  expect(readingIn(root, AGENT, HELD)).toBeNull()
  expect(readingIn(root, AGENT, KEPT)?.oid).toBe("two")
})

test("naming a path already gone forgets its reading and commits nothing", () => {
  const root = repoWith({ [HELD]: BODY })
  const was = head(root)
  recordRead(root, AGENT, { path: GONE, oid: "one", seenAt: 1, mechanicalOid: null })
  const said = removing(root, naming(GONE))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(reportOf(said)).toContain(`${GONE} was already gone`)
  expect(reportOf(said)).toContain("nothing stood to be taken away")
  expect(readingIn(root, AGENT, GONE)).toBeNull()
  expect(there(root, HELD)).toBe(true)
  expect(head(root)).toBe(was)
})

test("a directory opens onto every tracked file under it", () => {
  const root = repoWith({ [HELD]: BODY, "akasha/one/deep/under.module.ts": BODY, [KEPT]: BODY })
  const said = removing(root, naming("akasha/one"))
  expect(said.refusals).toEqual([])
  expect(git(root, ["ls-files"]).trim()).toBe(KEPT)
  expect(reportOf(said)).toContain("stood under a directory you named")
})

test("a directory holding no tracked file is refused", () => {
  const root = repoWith({ [HELD]: BODY })
  mkdirSync(join(root, "akasha/empty"), { recursive: true })
  const said = removing(root, naming("akasha/empty"))
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
  const said = removing(root, naming(HELD))
  expect(said.refusals).toEqual([])
  expect(there(root, BESIDE)).toBe(false)
  expect(there(root, "akasha/one/held.module.test.ts")).toBe(false)
  expect(reportOf(said)).toContain("stood beside what you named")
  expect(git(root, ["ls-files"]).trim()).toBe("akasha/one/kept.module.ts")
})

test("a directory the removal leaves empty goes with it", () => {
  const root = repoWith({ [DEEP]: BODY, [KEPT]: BODY })
  const said = removing(root, naming(DEEP))
  expect(said.refusals).toEqual([])
  expect(there(root, "akasha/one/deep")).toBe(false)
  expect(there(root, "akasha/one")).toBe(false)
  expect(there(root, "akasha")).toBe(true)
  expect(reportOf(said)).toContain("git holds no empty directory")
})

test("a refused removal leaves nothing behind, and takes none of the paths it could have taken", () => {
  const root = repoWith({ [HELD]: BODY, [BESIDE]: BODY })
  mkdirSync(join(root, "akasha/empty"), { recursive: true })
  const was = head(root)
  const said = removing(root, naming(HELD, "akasha/empty"))
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
  const said = removing(root, naming(HELD))
  expect(said.code).toBe(3)
  expect(refusalOf(said)).toContain("refused for the test")
  expect(there(root, HELD)).toBe(true)
  expect(head(root)).toBe(was)
})

test("a path named twice is refused", () => {
  const root = repoWith({ [HELD]: BODY })
  const twice = removing(root, naming(HELD, HELD))
  expect(twice.code).toBe(1)
  expect(twice.refusals[0]).toContain("named more than once")
})

test("a directory named opens onto every file git holds under it", () => {
  const root = repoWith({ [OUTSIDE]: BODY, "temper/one/deep/under.ts": BODY, [HELD]: BODY })
  expect(removing(root, naming("temper/one")).refusals).toEqual([])
  expect(git(root, ["ls-files"]).trim()).toBe(HELD)
  expect(there(root, "temper/one")).toBe(false)
  expect(there(root, "temper")).toBe(true)
})

test("a folder at the top of the repository is refused, and so is a path inside .git", () => {
  const root = repoWith({ [HELD]: BODY, [OUTSIDE]: BODY })
  expect(removing(root, naming("temper")).refusals[0]).toContain("at the top of the")
  expect(removing(root, naming("akasha")).code).toBe(1)
  expect(removing(root, naming(".git/config")).refusals[0]).toContain("`.git/`")
  expect(git(root, ["ls-files"]).trim()).toBe(`${HELD}\n${OUTSIDE}`)
})

test("a way into a package is dropped where the removal takes the file it lands on", () => {
  const root = repoWith({
    [HELD]: BODY,
    [WAYS_IN]: PACKAGE_WITH_WAYS,
    [KEPT_WAY]: BODY,
    [GONE_WAY]: BODY,
  })
  const said = removing(root, naming("temper/one/gone"))
  expect(said.refusals).toEqual([])
  expect(fileIn(root, WAYS_IN)).toBe(PACKAGE_WITHOUT_GONE)
  expect(reportOf(said)).toContain("stopped naming 1 way in")
})

test("a way into a package whose file the removal leaves keeps its place", () => {
  const root = repoWith({
    [HELD]: BODY,
    [WAYS_IN]: PACKAGE_WITH_WAYS,
    [KEPT_WAY]: BODY,
    [GONE_WAY]: BODY,
  })
  const said = removing(root, naming(HELD))
  expect(said.refusals).toEqual([])
  expect(fileIn(root, WAYS_IN)).toBe(PACKAGE_WITH_WAYS)
})

test("naming no path is refused rather than committed empty", () => {
  const root = repoWith({ [HELD]: BODY })
  const said = removing(root, [])
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe("name at least one path to remove, as `--file-path <path>`")
})

test("a bare path is refused, and the refusal says what to type instead", () => {
  expect(refusedIn(namedIn([HELD]))).toBe(
    "`akasha/one/held.module.ts` stands on its own, and a removal names every path behind a " +
      "flag — say `--file-path akasha/one/held.module.ts`"
  )
})

test("--file-path with nothing after it, or another flag after it, is refused", () => {
  expect(refusedIn(namedIn(["--file-path"]))).toBe(REFUSED_ENDS)
  expect(refusedIn(namedIn(["--file-path", "--message"]))).toBe(REFUSED_FLAGGED)
})

test("a flag the removal does not take is refused rather than read as a path", () => {
  expect(refusedIn(namedIn(["--force", ...naming(HELD)]))).toBe(REFUSED_UNKNOWN)
})

test("a removal names everything that went, named or not, down to the emptied directory", () => {
  const held = {
    [DEEP]: BODY,
    "akasha/one/deep/held.module.code.ts": BODY,
    "akasha/one/deep/under.module.ts": BODY,
    [KEPT]: BODY,
  }
  const said = reportOf(removing(repoWith(held), naming(DEEP)))
  expect(said).toContain(`${DEEP} taken away`)
  expect(said).toContain("akasha/one/deep/held.module.code.ts taken away")
  expect(said).toContain("stood beside what you named and went with it")
  expect(said).not.toContain(KEPT)
  const root = repoWith(held)
  const also = reportOf(removing(root, naming("akasha/one")))
  expect(also).toContain("stood under a directory you named and went with it")
  expect(also).toContain("akasha/one/deep/under.module.ts taken away")
  expect(also).toContain("git holds no empty directory")
  expect(git(root, ["ls-files"]).trim()).toBe(KEPT)
})

test("breaking the glass takes away what the checks refuse, and only breaking it does", () => {
  const root = repoWith({ [HELD]: BODY })
  refusing(root)
  const was = head(root)
  const gated = removing(root, [...naming(HELD), "--message", "held goes"])
  expect(gated.code).toBe(3)
  expect(refusalOf(gated)).toContain("refused for the test")
  expect(there(root, HELD)).toBe(true)
  expect(head(root)).toBe(was)

  const said = removing(root, [
    ...naming(HELD),
    "--message",
    "held goes",
    "--break-the-glass",
    "  the check is wrong  ",
  ])
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(reportOf(said)).toContain("no check ran — the glass was broken for: the check is wrong")
  expect(there(root, HELD)).toBe(false)
  expect(git(root, ["log", "-1", "--pretty=%s"]).trim()).toBe("held goes")
  expect(git(root, ["log", "-1", "--pretty=%B"]).trim()).toBe(
    "held goes\n\nChecks-bypassed: the check is wrong"
  )
})

test("breaking the glass with no reason is refused", () => {
  const root = repoWith({ [HELD]: BODY })
  const ends = removing(root, [...naming(HELD), "--break-the-glass"])
  expect(ends.code).toBe(1)
  expect(ends.refusals[0]).toBe("--break-the-glass needs a value, and the line ends")
  const empty = removing(root, [...naming(HELD), "--break-the-glass", "  "])
  expect(empty.code).toBe(1)
  expect(empty.refusals[0]).toBe(
    "--break-the-glass takes the reason no check is to run, and this one is empty"
  )
  expect(there(root, HELD)).toBe(true)
})

test("a directory left holding a file git does not track is kept, and the removal says so", () => {
  const root = repoWith({ [DEEP]: BODY, [KEPT]: BODY })
  const loose = "akasha/one/deep/unsaid.txt"
  put(root, loose, "work in progress\n")
  const said = removing(root, naming(DEEP))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(there(root, DEEP)).toBe(false)
  expect(there(root, loose)).toBe(true)
  expect(there(root, "akasha/one/deep")).toBe(true)
  expect(reportOf(said)).not.toContain("git holds no empty directory")
})

test("a message is read from a file and trimmed, and stated twice over or empty is refused", () => {
  const root = repoWith({ [HELD]: BODY })
  const at = join(root, "message.txt")
  writeFileSync(at, "taken by a file\n")
  const both = removing(root, [
    ...naming(HELD),
    "--message",
    "taken by the line",
    "--message-file",
    at,
  ])
  expect(both.code).toBe(1)
  expect(refusalOf(both)).toContain("both are given")
  writeFileSync(at, "   \n")
  const empty = removing(root, [...naming(HELD), "--message-file", at])
  expect(empty.code).toBe(1)
  expect(empty.refusals[0]).toContain("the message given is empty")
  expect(there(root, HELD)).toBe(true)
  writeFileSync(at, "  taken by a file  \n")
  const said = removing(root, [...naming(HELD), "--message-file", at])
  expect(said.refusals).toEqual([])
  expect(git(root, ["log", "-1", "--pretty=%B"]).trim()).toBe("taken by a file")
})

test("the root manifest loses a row only where nothing else moved the manifest meanwhile", () => {
  const clean = manifested()
  expect(removing(clean, naming(WORKSPACE)).refusals).toEqual([])
  expect(manifestIn(clean)).not.toContain(WORKSPACE)

  const root = manifested()
  writeFileSync(join(root, MANIFEST), MOVED_MANIFEST)
  const said = removing(root, naming(WORKSPACE))
  expect(refusalOf(said)).toContain("changed after this call read it")
  expect(manifestIn(root)).toBe(MOVED_MANIFEST)
})

test("a path is read against the repository root, wherever the call was made", () => {
  const root = repoWith({ [HELD]: BODY })
  const said = remove(naming(HELD), { ...givenIn(root), from: join(root, "akasha") })
  expect(said.refusals).toEqual([])
  const out = removing(root, ["--file-path", "../elsewhere/held.ts"])
  expect(out.refusals[0]).toContain("read against the repository root")
})

test("every flag the surface shows is a flag this takes", () => {
  for (const one of removeCommand.taking) {
    expect(refusedIn(namedIn([one.said.split(" ")[0] ?? ""]))).not.toContain("this takes")
  }
})

function refusedIn(said: ReturnType<typeof namedIn>): string {
  return "refused" in said ? said.refused : ""
}
