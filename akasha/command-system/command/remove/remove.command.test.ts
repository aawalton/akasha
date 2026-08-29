import { afterAll, expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Given } from "../../calling.module.code.ts"
import { admitting, refusing } from "../../minting.module.code.ts"
import { scratchWorld } from "../../scratching.module.code.ts"
import {
  emptiedBy,
  namedIn,
  pruneEmptied,
  remove,
  underAkasha,
  wouldEmpty,
} from "./remove.command.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function git(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], { encoding: "utf8" })
}

function repoWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-remove-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  writeFileSync(join(root, ".git/info/exclude"), "akasha/admits.check*\n")
  admitting(root)
  return root
}

function givenIn(root: string): Given {
  return { root, calledAs: "akasha remove", from: root, writer: null }
}

function naming(...paths: readonly string[]): readonly string[] {
  return paths.flatMap((one) => ["--file-path", one])
}

function stands(root: string, path: string): boolean {
  return existsSync(join(root, path))
}

function head(root: string): string {
  return git(root, ["rev-parse", "HEAD"]).trim()
}

const HELD = "akasha/one/held.module.ts"

const BESIDE = "akasha/one/held.module.code.ts"

const KEPT = "akasha/two/kept.module.ts"

const DEEP = "akasha/one/deep/held.module.ts"

const BODY = `export const held = 1\n`

test("named paths are taken away and the removal is committed", () => {
  const root = repoWith({ [HELD]: BODY, "akasha/one/kept.module.ts": BODY })
  const said = remove(naming(HELD), givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(stands(root, HELD)).toBe(false)
  expect(git(root, ["ls-files"]).trim()).toBe("akasha/one/kept.module.ts")
  expect(said.report[0]).toBe(`${HELD} taken away`)
  expect(said.report.join("\n")).not.toContain("took away ")
  expect(said.report.at(-1)).toStartWith("committed as ")
})

test("a path that is not there is refused, and nothing else is taken", () => {
  const root = repoWith({ [HELD]: BODY })
  const was = head(root)
  const said = remove(naming(HELD, "akasha/one/nowhere.ts"), givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("is not there")
  expect(stands(root, HELD)).toBe(true)
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
  expect(stands(root, "akasha/empty")).toBe(true)
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
  expect(stands(root, BESIDE)).toBe(false)
  expect(stands(root, "akasha/one/held.module.test.ts")).toBe(false)
  expect(said.report.join("\n")).toContain("stood beside what you named")
  expect(git(root, ["ls-files"]).trim()).toBe("akasha/one/kept.module.ts")
})

test("a directory the removal leaves empty goes with it", () => {
  const root = repoWith({ [DEEP]: BODY, [KEPT]: BODY })
  const said = remove(naming(DEEP), givenIn(root))
  expect(said.refusals).toEqual([])
  expect(stands(root, "akasha/one/deep")).toBe(false)
  expect(stands(root, "akasha/one")).toBe(false)
  expect(stands(root, "akasha")).toBe(true)
  expect(said.report.join("\n")).toContain("git holds no empty directory")
})

test("a refused removal leaves nothing behind, and takes none of the paths it could have taken", () => {
  const root = repoWith({ [HELD]: BODY, [BESIDE]: BODY })
  mkdirSync(join(root, "akasha/empty"), { recursive: true })
  const was = head(root)
  const said = remove(naming(HELD, "akasha/empty"), givenIn(root))
  expect(said.code).toBe(1)
  expect(stands(root, HELD)).toBe(true)
  expect(stands(root, BESIDE)).toBe(true)
  expect(stands(root, "akasha/empty")).toBe(true)
  expect(head(root)).toBe(was)
})

test("a check that refuses a deletion stops the removal, and nothing is taken away", () => {
  const root = repoWith({ [HELD]: BODY })
  refusing(root)
  const was = head(root)
  const said = remove(naming(HELD), givenIn(root))
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(stands(root, HELD)).toBe(true)
  expect(head(root)).toBe(was)
})

test("a path standing outside the akasha folder, or named twice, is refused", () => {
  const root = repoWith({ "elsewhere/held.ts": BODY, [HELD]: BODY })
  const out = remove(naming("elsewhere/held.ts"), givenIn(root))
  expect(out.code).toBe(1)
  expect(out.refusals[0]).toContain("stands outside")
  expect(stands(root, "elsewhere/held.ts")).toBe(true)
  const twice = remove(naming(HELD, HELD), givenIn(root))
  expect(twice.code).toBe(1)
  expect(twice.refusals[0]).toContain("named more than once")
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
  expect(stands(root, DEEP)).toBe(true)
  expect(stands(root, "akasha/one/deep")).toBe(true)
  expect(head(root)).toBe(was)
  expect(git(root, ["status", "--porcelain", "--", "akasha"]).trim()).toBe("")
  const then = remove(argv, givenIn(root))
  expect(then.refusals).toEqual([])
  expect(stands(root, "akasha/one")).toBe(false)
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
  expect(stands(root, HELD)).toBe(true)
})

test("breaking the glass takes away what the checks refuse, and only breaking it does", () => {
  const root = repoWith({ [HELD]: BODY })
  refusing(root)
  const was = head(root)
  const gated = remove([...naming(HELD), "--message", "held goes"], givenIn(root))
  expect(gated.code).toBe(3)
  expect(gated.refusals.join("\n")).toContain("refused for the test")
  expect(stands(root, HELD)).toBe(true)
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
  expect(stands(root, HELD)).toBe(false)
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
  expect(stands(root, HELD)).toBe(true)
})

test("what a dry run says would be emptied is what the removal empties", () => {
  const root = repoWith({ [DEEP]: BODY, "akasha/one/kept.module.ts": BODY })
  const gone = [DEEP]
  const said = wouldEmpty(root, gone)
  expect(said).toEqual(["akasha/one/deep"])
  expect(pruneEmptied(root, gone)).toEqual([])
  rmSync(join(root, gone[0] ?? ""))
  expect(pruneEmptied(root, gone)).toEqual([...said])
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
  expect(stands(root, HELD)).toBe(true)
  writeFileSync(at, "  taken by a file  \n")
  const said = remove([...naming(HELD), "--message-file", at], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(git(root, ["log", "-1", "--pretty=%B"]).trim()).toBe("taken by a file")
})

test("the directories a removal could empty stop at the akasha folder", () => {
  expect(emptiedBy(["akasha/one/deep/held.ts"])).toEqual(["akasha/one/deep", "akasha/one"])
  expect(emptiedBy(["akasha/held.ts"])).toEqual([])
})

test("a path is read against the folder the call ran in", () => {
  expect(underAkasha("/root", "/root/akasha/one", "held.ts")).toBe("akasha/one/held.ts")
  expect(underAkasha("/root", "/root", "elsewhere/held.ts")).toBeNull()
})
