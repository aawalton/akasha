import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { expect, test } from "bun:test"
import { passedOver, write } from "./write.command.code.ts"

const CHECKS_AT = ".git/data/index/identity/check/slug"

function git(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], { encoding: "utf8" })
}

function put(root: string, path: string, body: string): string {
  const at = join(root, path)
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, body)
  return at
}

function repoWith(named: Readonly<Record<string, string>>): string {
  const root = mkdtempSync(join(tmpdir(), "akasha-write-"))
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) put(root, path, body)
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  return root
}

let minted = 0

function checking(root: string, slug: string, body: string): void {
  const at = `akasha/checks-system/check/${slug}/${slug}.check.ts`
  const camel = slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
  put(
    root,
    at,
    `export const ${camel} = {\n  slug: "${slug}",\n  code: "ts",\n  runsOn: ["patch"],\n}\n`
  )
  put(root, `${at.slice(0, -".ts".length)}.code.ts`, body)
  minted = minted + 1
  const id = `01a04bc4-0000-7000-8000-${String(minted).padStart(12, "0")}`
  put(root, join(CHECKS_AT, `${slug}.jsonl`), `${JSON.stringify({ path: at, id })}\n`)
}

const REFUSES =
  "export function refuses(leaving) {\n" +
  '  return leaving.changed.map((path) => ({ path, reason: "refused for the test" }))\n' +
  "}\n"

const ADMITS = "export function admits() {\n  return []\n}\n"

const REFUSES_TAKING =
  "export function refusesTaking(leaving) {\n" +
  "  return leaving.changed\n" +
  "    .filter((path) => leaving.at(path) === null)\n" +
  '    .map((path) => ({ path, reason: "a check judged this going away" }))\n' +
  "}\n"

const headOf = (root: string): string => git(root, ["rev-parse", "HEAD"]).trim()

const givenIn = (root: string) => ({ root, calledAs: "akasha write", from: root, writer: null })

test("a change that passes is written and committed", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  const from = put(root, "body.txt", "proposed\n")
  const said = write([
    "--file-path", "akasha/two.ts", "--content-file", from, "--message", "held",
  ], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe("proposed\n")
  expect(git(root, ["log", "-1", "--pretty=%s"]).trim()).toBe("held")
  rmSync(root, { recursive: true })
})

test("a refused change writes nothing and moves no head", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  checking(root, "refuses", REFUSES)
  const was = headOf(root)
  const from = put(root, "body.txt", "proposed\n")
  const said = write(["--file-path", "akasha/two.ts", "--content-file", from], givenIn(root))
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  expect(headOf(root)).toBe(was)
  rmSync(root, { recursive: true })
})

test("the bodies written and the paths taken away are one commit, refused together", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  checking(root, "refuses", REFUSES)
  const was = headOf(root)
  const from = put(root, "body.txt", "proposed\n")
  const said = write([
    "--file-path", "akasha/three.ts", "--content-file", from, "--remove", "akasha/two.ts",
  ], givenIn(root))
  expect(said.code).toBe(3)
  expect(existsSync(join(root, "akasha/three.ts"))).toBe(false)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe("committed\n")
  expect(headOf(root)).toBe(was)
  rmSync(root, { recursive: true })
})

test("a removal takes the file away and commits it with the write", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  const from = put(root, "body.txt", "proposed\n")
  const said = write([
    "--file-path", "akasha/three.ts", "--content-file", from, "--remove", "akasha/two.ts",
  ], givenIn(root))
  expect(said.code).toBe(0)
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  expect(git(root, ["ls-files"]).trim().split("\n").sort()).toEqual([
    "akasha/one.ts",
    "akasha/three.ts",
  ])
  rmSync(root, { recursive: true })
})

test("a removal of what is not there is refused as data that is wrong", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  const was = headOf(root)
  const said = write(["--remove", "akasha/nowhere.ts"], givenIn(root))
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("take nothing away")
  expect(headOf(root)).toBe(was)
  rmSync(root, { recursive: true })
})

test("a dry run gates and writes nothing at all", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  const was = headOf(root)
  const from = put(root, "body.txt", "proposed\n")
  const said = write([
    "--file-path", "akasha/two.ts", "--content-file", from, "--dry-run",
  ], givenIn(root))
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("nothing was written")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  expect(headOf(root)).toBe(was)
  expect(git(root, ["status", "--porcelain", "--", "akasha"]).trim()).toBe("")
  rmSync(root, { recursive: true })
})

test("a dry run over a change the checks refuse reports the refusal", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  checking(root, "refuses", REFUSES)
  const from = put(root, "body.txt", "proposed\n")
  const said = write([
    "--file-path", "akasha/two.ts", "--content-file", from, "--dry-run",
  ], givenIn(root))
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  rmSync(root, { recursive: true })
})

test("a check is handed a removal, and can refuse it", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  checking(root, "refuses-taking", REFUSES_TAKING)
  const said = write(["--remove", "akasha/two.ts", "--dry-run"], givenIn(root))
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("akasha/two.ts — a check judged this going away")
  rmSync(root, { recursive: true })
})

test("that same check lets a written body through, so it refuses the going and not the arriving", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  checking(root, "refuses-taking", REFUSES_TAKING)
  const from = put(root, "body.txt", "proposed\n")
  const said = write(
    ["--file-path", "akasha/two.ts", "--content-file", from, "--dry-run"],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  rmSync(root, { recursive: true })
})

test("a gate counts the removal it judged beside the body it wrote, so a move is not doubled", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  checking(root, "admits", ADMITS)
  const from = put(root, "body.txt", "proposed\n")
  const said = write(
    [
      "--file-path", "akasha/three.ts", "--content-file", from,
      "--remove", "akasha/two.ts", "--dry-run",
    ],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("1 check passed over the 2 paths asked for")
  rmSync(root, { recursive: true })
})

test("a pass names how many checks ran and how many paths they were handed", () => {
  expect(passedOver(1, 1)).toBe("1 check passed over the 1 path asked for")
  expect(passedOver(12, 6)).toBe("12 checks passed over the 6 paths asked for")
  expect(passedOver(0, 2)).toBe(
    "no check runs at this phase, so the 2 paths asked for went unjudged"
  )
})

test("breaking the glass runs no check and says so in the commit", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  checking(root, "refuses", REFUSES)
  const from = put(root, "body.txt", "proposed\n")
  const said = write([
    "--file-path", "akasha/two.ts", "--content-file", from,
    "--message", "held", "--break-the-glass", "the checks are themselves broken",
  ], givenIn(root))
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe("proposed\n")
  expect(git(root, ["log", "-1", "--pretty=%B"])).toContain(
    "Checks-bypassed: the checks are themselves broken"
  )
  rmSync(root, { recursive: true })
})

test("breaking the glass with no reason is refused", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  const from = put(root, "body.txt", "proposed\n")
  const said = write([
    "--file-path", "akasha/two.ts", "--content-file", from, "--break-the-glass", "   ",
  ], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is empty")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  rmSync(root, { recursive: true })
})

test("a dry run that breaks the glass is refused, having nothing to report", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  const from = put(root, "body.txt", "proposed\n")
  const said = write([
    "--file-path", "akasha/two.ts", "--content-file", from, "--dry-run", "--break-the-glass", "why",
  ], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("report nothing")
  rmSync(root, { recursive: true })
})

test("a path outside the akasha folder is refused", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  const from = put(root, "body.txt", "proposed\n")
  const said = write(["--file-path", "elsewhere/two.ts", "--content-file", from], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is not under `akasha/`")
  expect(existsSync(join(root, "elsewhere/two.ts"))).toBe(false)
  rmSync(root, { recursive: true })
})

test("a path climbing out of the root is refused", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  const from = put(root, "body.txt", "proposed\n")
  const said = write(["--file-path", "../akasha/two.ts", "--content-file", from], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is not under `akasha/`")
  rmSync(root, { recursive: true })
})

test("a file path closed by no content file is refused", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  const said = write(["--file-path", "akasha/two.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("closed by no --content-file")
  rmSync(root, { recursive: true })
})

test("a flag this does not take is refused rather than ignored", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  const said = write(["--mechanical"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is no flag this takes")
  rmSync(root, { recursive: true })
})

test("a call asking for nothing is refused", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  const said = write(["--message", "held"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("asks for nothing")
  rmSync(root, { recursive: true })
})

test("one path written and taken away by one call is refused", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  const from = put(root, "body.txt", "proposed\n")
  const said = write([
    "--file-path", "akasha/one.ts", "--content-file", from, "--remove", "akasha/one.ts",
  ], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("both written and taken away")
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("committed\n")
  rmSync(root, { recursive: true })
})

test("the message is trimmed whether it is stated or read from a file", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  const from = put(root, "body.txt", "proposed\n")
  put(root, "message.txt", "  from a file  \n")
  const said = write([
    "--file-path", "akasha/two.ts", "--content-file", from,
    "--message-file", join(root, "message.txt"),
  ], givenIn(root))
  expect(said.code).toBe(0)
  expect(git(root, ["log", "-1", "--pretty=%B"]).trim()).toBe("from a file")
  const also = write([
    "--file-path", "akasha/three.ts", "--content-file", from, "--message", "  stated  ",
  ], givenIn(root))
  expect(also.code).toBe(0)
  expect(git(root, ["log", "-1", "--pretty=%B"]).trim()).toBe("stated")
  rmSync(root, { recursive: true })
})

test("a content file that is not there is a caller's mistake, not a refusal by the gate", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  const said = write([
    "--file-path", "akasha/two.ts", "--content-file", join(root, "nowhere.txt"),
  ], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("could not be read")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  rmSync(root, { recursive: true })
})

test("a body that is not text lands as the bytes it is", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  const at = join(root, "body.bin")
  writeFileSync(at, new Uint8Array([0xff, 0xfe, 0x01, 0x02]))
  const said = write([
    "--file-path", "akasha/two.bin", "--content-file", at, "--message", "held",
  ], givenIn(root))
  expect(said.code).toBe(0)
  expect([...readFileSync(join(root, "akasha/two.bin"))]).toEqual([0xff, 0xfe, 0x01, 0x02])
  rmSync(root, { recursive: true })
})

test("a change asking for what already stands commits nothing and says so", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n" })
  const was = headOf(root)
  const from = put(root, "body.txt", "committed\n")
  const said = write(["--file-path", "akasha/one.ts", "--content-file", from], givenIn(root))
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("nothing was committed")
  expect(headOf(root)).toBe(was)
  rmSync(root, { recursive: true })
})
