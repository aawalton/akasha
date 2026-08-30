import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { warrantsStanding } from "../../../context-system/warranting/warranting.module.test-fixtures.ts"
import { bytesOf as bytes } from "../../../testing-system/bodying/bodying.module.code.ts"
import { gitIn as git } from "../../../testing-system/gitting/gitting.module.code.ts"
import {
  ADMITS_CODE,
  MINTED,
  mintedId,
  minting,
  REFUSES_CODE,
} from "../../../testing-system/minting/minting.module.code.ts"
import { put } from "../../../testing-system/putting/putting.module.code.ts"
import { landingAsked } from "../../asking/asking.module.code.ts"
import { baseOf as headOf } from "../../landing/landing.module.code.ts"
import { blobIdOf, recordRead } from "../../reading/reading.module.code.ts"
import { scratchWorld } from "../../scratching/scratching.module.code.ts"
import { askedIn, edit } from "./edit.command.code.ts"
import { edit as editCommand } from "./edit.command.ts"

const ADMITS_AT = "akasha/admits.check*"

const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repoWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-edit-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) {
    put(root, path, body)
    recordRead(root, AGENT, { path, oid: blobIdOf(bytes(body)), seenAt: 1, mechanicalOid: null })
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  put(root, ".git/info/exclude", `${ADMITS_AT}\n`)
  checking(root, "admits", ADMITS_CODE)
  warrantsStanding(root)
  return root
}

function checking(root: string, slug: string, body: string): undefined {
  minting(root, slug, mintedId(slug), MINTED, body)
}

const MARKS =
  'import { writeFileSync } from "node:fs"\n' +
  "\n" +
  "export function marks(leaving) {\n" +
  '  writeFileSync(`${leaving.root}/ran.txt`, "ran")\n' +
  "  return []\n" +
  "}\n"

const givenIn = (root: string) => ({
  root,
  calledAs: "akasha edit",
  from: root,
  writer: null,
  agentId: AGENT,
})

function stating(root: string, name: string, was: string, now: string): readonly string[] {
  return ["--old-file", put(root, `${name}.old`, was), "--new-file", put(root, `${name}.new`, now)]
}

test("an edit of a body the record does not show read is refused", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  put(root, "akasha/loose.ts", "alpha\n")
  const was = headOf(root)
  const said = edit(
    ["--file-path", "akasha/loose.ts", ...stating(root, "a", "alpha", "delta")],
    givenIn(root)
  )
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("the record does not show you read this")
  expect(readFileSync(join(root, "akasha/loose.ts"), "utf8")).toBe("alpha\n")
  expect(headOf(root)).toBe(was)
})

test("a body the record shows read is edited", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = edit(
    ["--file-path", "akasha/one.ts", ...stating(root, "a", "alpha", "delta")],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
})

test("the glass broken edits a body the record does not show read", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  put(root, "akasha/loose.ts", "alpha\n")
  const said = edit(
    [
      "--file-path",
      "akasha/loose.ts",
      ...stating(root, "a", "alpha", "delta"),
      "--break-the-glass",
      "held",
    ],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/loose.ts"), "utf8")).toBe("delta\n")
})

test("an edit charged to no agent is refused whole", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = edit(["--file-path", "akasha/one.ts", ...stating(root, "a", "alpha", "delta")], {
    ...givenIn(root),
    agentId: null,
  })
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("should not be possible")
})

test("a stated substitution is worked into a whole body and landed", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\nbeta\ngamma\n" })
  const said = edit(
    ["--file-path", "akasha/one.ts", ...stating(root, "a", "beta", "delta"), "--message", "held"],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("alpha\ndelta\ngamma\n")
  expect(git(root, ["log", "-1", "--pretty=%s"]).trim()).toBe("held")
})

test("substitutions against one file are worked in order, each against what the one before left", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = edit(
    [
      "--file-path",
      "akasha/one.ts",
      ...stating(root, "a", "alpha", "beta"),
      ...stating(root, "b", "beta", "gamma"),
    ],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("gamma\n")
})

test("a substitution matching no times is refused before any check runs", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  checking(root, "marks", MARKS)
  const was = headOf(root)
  const said = edit(
    ["--file-path", "akasha/one.ts", ...stating(root, "a", "nowhere", "delta")],
    givenIn(root)
  )
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("matches no passage")
  expect(existsSync(join(root, "ran.txt"))).toBe(false)
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("alpha\n")
  expect(headOf(root)).toBe(was)
  const also = edit(
    ["--file-path", "akasha/one.ts", ...stating(root, "b", "alpha", "delta")],
    givenIn(root)
  )
  expect(also.code).toBe(0)
  expect(existsSync(join(root, "ran.txt"))).toBe(true)
})

test("a substitution matching more than once is refused before any check runs", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\nbeta\nalpha\n" })
  checking(root, "marks", MARKS)
  const was = headOf(root)
  const said = edit(
    ["--file-path", "akasha/one.ts", ...stating(root, "a", "alpha", "delta")],
    givenIn(root)
  )
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("matches 2 passages")
  expect(existsSync(join(root, "ran.txt"))).toBe(false)
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("alpha\nbeta\nalpha\n")
  expect(headOf(root)).toBe(was)
})

test("a refused change writes nothing and moves no head", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  checking(root, "refuses", REFUSES_CODE)
  const was = headOf(root)
  const said = edit(
    ["--file-path", "akasha/one.ts", ...stating(root, "a", "alpha", "delta")],
    givenIn(root)
  )
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("alpha\n")
  expect(headOf(root)).toBe(was)
})

test("a path that is not there is refused", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = edit(
    ["--file-path", "akasha/nowhere.ts", ...stating(root, "a", "alpha", "delta")],
    givenIn(root)
  )
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("is not there")
  expect(existsSync(join(root, "akasha/nowhere.ts"))).toBe(false)
})

test("a body that is not text is refused", () => {
  const root = scratch.rootFor("akasha-edit-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  mkdirSync(join(root, "akasha"), { recursive: true })
  writeFileSync(join(root, "akasha/one.bin"), new Uint8Array([0xff, 0xfe, 0x00, 0x01]))
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  const said = edit(
    ["--file-path", "akasha/one.bin", ...stating(root, "a", "alpha", "delta")],
    givenIn(root)
  )
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("is not text")
})

test("a file that changed under a call, between its read and its write, refuses the whole call", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const was = headOf(root)
  const said = landingAsked(givenIn(root), {
    changes: [{ path: "akasha/one.ts", body: bytes("worked out\n") }],
    message: "held",
    dryRun: false,
    glass: null,
    unmoved: [{ path: "akasha/one.ts", was: bytes("what this call read\n") }],
    saying: () => [],
  })
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("changed after this call read it")
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("alpha\n")
  expect(headOf(root)).toBe(was)
})

test("a file that stands as the call read it is landed", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = landingAsked(givenIn(root), {
    changes: [{ path: "akasha/one.ts", body: bytes("worked out\n") }],
    message: "held",
    dryRun: false,
    glass: null,
    unmoved: [{ path: "akasha/one.ts", was: bytes("alpha\n") }],
    saying: () => [],
  })
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("worked out\n")
})

test("what an edit hands landing carries the bytes it read for each file it changes", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n", "akasha/two.ts": "beta\n" })
  const asked = askedIn(
    [
      "--file-path",
      "akasha/one.ts",
      ...stating(root, "a", "alpha", "delta"),
      "--file-path",
      "akasha/two.ts",
      ...stating(root, "b", "beta", "gamma"),
    ],
    givenIn(root)
  )
  if (!("changes" in asked)) throw new Error(asked.refusals.join("\n"))
  const held = new TextDecoder()
  expect(asked.unmoved.map((one) => [one.path, held.decode(one.was)])).toEqual([
    ["akasha/one.ts", "alpha\n"],
    ["akasha/two.ts", "beta\n"],
  ])
})

test("a replacement carrying dollar patterns lands as the bytes it is", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = edit(
    ["--file-path", "akasha/one.ts", ...stating(root, "a", "alpha", "$& $' $` $1")],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("$& $' $` $1\n")
})

test("a path outside the akasha folder is refused", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n", "elsewhere/two.ts": "alpha\n" })
  const said = edit(
    ["--file-path", "elsewhere/two.ts", ...stating(root, "a", "alpha", "delta")],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is not under `akasha/`")
  expect(readFileSync(join(root, "elsewhere/two.ts"), "utf8")).toBe("alpha\n")
})

test("an old file closed by no new file is refused", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = edit(
    ["--file-path", "akasha/one.ts", "--old-file", put(root, "a.old", "alpha")],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("closed by no --new-file")
})

test("a file path stating no substitution is refused", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = edit(["--file-path", "akasha/one.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("states no --old-file")
})

test("an empty passage names no place and is refused", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = edit(
    ["--file-path", "akasha/one.ts", ...stating(root, "a", "", "delta")],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names no place")
})

test("a dry run gates and writes nothing at all", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const was = headOf(root)
  const said = edit(
    ["--file-path", "akasha/one.ts", ...stating(root, "a", "alpha", "delta"), "--dry-run"],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("nothing was written")
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("alpha\n")
  expect(headOf(root)).toBe(was)
})

test("breaking the glass runs no check and says so in the commit", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  checking(root, "refuses", REFUSES_CODE)
  const said = edit(
    [
      "--file-path",
      "akasha/one.ts",
      ...stating(root, "a", "alpha", "delta"),
      "--message",
      "held",
      "--break-the-glass",
      "the checks are themselves broken",
    ],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("delta\n")
  expect(git(root, ["log", "-1", "--pretty=%B"])).toContain(
    "Checks-bypassed: the checks are themselves broken"
  )
})

test("one path named twice by one call is refused", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\nbeta\n" })
  const said = edit(
    [
      "--file-path",
      "akasha/one.ts",
      ...stating(root, "a", "alpha", "delta"),
      "--file-path",
      "akasha/one.ts",
      ...stating(root, "b", "beta", "epsilon"),
    ],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("named more than once")
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("alpha\nbeta\n")
})

test("several files are one act, refused whole when one of them cannot be worked out", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n", "akasha/two.ts": "beta\n" })
  const was = headOf(root)
  const said = edit(
    [
      "--file-path",
      "akasha/one.ts",
      ...stating(root, "a", "alpha", "delta"),
      "--file-path",
      "akasha/two.ts",
      ...stating(root, "b", "nowhere", "epsilon"),
    ],
    givenIn(root)
  )
  expect(said.code).toBe(2)
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("alpha\n")
  expect(headOf(root)).toBe(was)
})

test("every flag the surface shows is a flag this takes", () => {
  const given = givenIn("/nowhere")
  for (const one of editCommand.taking) {
    const said = edit([one.said.split(" ")[0] ?? ""], given)
    expect(said.refusals.join(" ")).not.toContain("this takes")
  }
})
