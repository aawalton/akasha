import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { gitIn as git, headOf } from "../../../testing-system/gitting.module.code.ts"
import {
  ADMITS_CODE,
  MINTED,
  minting,
  REFUSES_CODE,
} from "../../../testing-system/minting.module.code.ts"
import { scratchWorld } from "../../scratching.module.code.ts"
import { surface, write } from "./write.command.code.ts"

const ADMITS_AT = "akasha/admits.check*"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function put(root: string, path: string, body: string): string {
  const at = join(root, path)
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, body)
  return at
}

function repoWith(
  named: Readonly<Record<string, string>> = { "akasha/one.ts": "committed\n" }
): string {
  const root = scratch.rootFor("akasha-write-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) put(root, path, body)
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  put(root, ".git/info/exclude", `${ADMITS_AT}\n`)
  checking(root, "admits", ADMITS_CODE)
  return root
}

let minted = 0

function checking(root: string, slug: string, body: string): void {
  minted = minted + 1
  const id = `01a04bc4-0000-7000-8000-${String(minted).padStart(12, "0")}`
  minting(root, slug, id, MINTED, body)
}

const givenIn = (root: string) => ({
  root,
  calledAs: "akasha write",
  from: root,
  writer: null,
  agentId: null,
})

const bodyIn = (root: string): string => put(root, "body.txt", "proposed\n")

test("a change that passes is written and committed", () => {
  const root = repoWith()
  const from = bodyIn(root)
  const said = write(
    ["--file-path", "akasha/two.ts", "--content-file", from, "--message", "held"],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe("proposed\n")
  expect(said.report).toContain("1 check judged the 1 path asked for, and none refused")
  expect(git(root, ["log", "-1", "--pretty=%s"]).trim()).toBe("held")
})

test("a refused change writes nothing and moves no head", () => {
  const root = repoWith()
  checking(root, "refuses", REFUSES_CODE)
  const was = headOf(root)
  const from = bodyIn(root)
  const said = write(["--file-path", "akasha/two.ts", "--content-file", from], givenIn(root))
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  expect(headOf(root)).toBe(was)
})

test("the bodies written and the paths taken away are one commit, refused together", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  checking(root, "refuses", REFUSES_CODE)
  const was = headOf(root)
  const from = bodyIn(root)
  const said = write(
    ["--file-path", "akasha/three.ts", "--content-file", from, "--remove", "akasha/two.ts"],
    givenIn(root)
  )
  expect(said.code).toBe(3)
  expect(existsSync(join(root, "akasha/three.ts"))).toBe(false)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe("committed\n")
  expect(headOf(root)).toBe(was)
})

test("a removal takes the file away and commits it with the write", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  const from = bodyIn(root)
  const said = write(
    ["--file-path", "akasha/three.ts", "--content-file", from, "--remove", "akasha/two.ts"],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  expect(git(root, ["ls-files"]).trim().split("\n").sort()).toEqual([
    "akasha/one.ts",
    "akasha/three.ts",
  ])
})

test("a removal of what is not there is refused as data that is wrong", () => {
  const root = repoWith()
  const was = headOf(root)
  const said = write(["--remove", "akasha/nowhere.ts"], givenIn(root))
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("take nothing away")
  expect(headOf(root)).toBe(was)
})

test("breaking the glass with no reason is refused", () => {
  const root = repoWith()
  const from = bodyIn(root)
  const said = write(
    ["--file-path", "akasha/two.ts", "--content-file", from, "--break-the-glass", "   "],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is empty")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
})

test("a path outside the akasha folder is refused", () => {
  const root = repoWith()
  const from = bodyIn(root)
  const said = write(["--file-path", "elsewhere/two.ts", "--content-file", from], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is not under `akasha/`")
  expect(existsSync(join(root, "elsewhere/two.ts"))).toBe(false)
})

test("a path climbing out of the root is refused", () => {
  const root = repoWith()
  const from = bodyIn(root)
  const said = write(["--file-path", "../akasha/two.ts", "--content-file", from], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is not under `akasha/`")
})

test("a file path closed by no content file is refused", () => {
  const root = repoWith()
  const said = write(["--file-path", "akasha/two.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("closed by no --content-file")
})

test("a flag this does not take is refused rather than ignored", () => {
  const root = repoWith()
  const said = write(["--mechanical"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is no flag this takes")
})

test("a call asking for nothing is refused", () => {
  const root = repoWith()
  const said = write(["--message", "held"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("asks for nothing")
})

test("one path written and taken away by one call is refused", () => {
  const root = repoWith()
  const from = bodyIn(root)
  const said = write(
    ["--file-path", "akasha/one.ts", "--content-file", from, "--remove", "akasha/one.ts"],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("both written and taken away")
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("committed\n")
})

test("the message is trimmed whether it is stated or read from a file", () => {
  const root = repoWith()
  const from = bodyIn(root)
  put(root, "message.txt", "  from a file  \n")
  const said = write(
    [
      "--file-path",
      "akasha/two.ts",
      "--content-file",
      from,
      "--message-file",
      join(root, "message.txt"),
    ],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(git(root, ["log", "-1", "--pretty=%B"]).trim()).toBe("from a file")
  const also = write(
    ["--file-path", "akasha/three.ts", "--content-file", from, "--message", "  stated  "],
    givenIn(root)
  )
  expect(also.code).toBe(0)
  expect(git(root, ["log", "-1", "--pretty=%B"]).trim()).toBe("stated")
})

test("a content file that is not there is a caller's mistake, not a refusal by the gate", () => {
  const root = repoWith()
  const said = write(
    ["--file-path", "akasha/two.ts", "--content-file", join(root, "nowhere.txt")],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("could not be read")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
})

test("a body that is not text lands as the bytes it is", () => {
  const root = repoWith()
  const at = join(root, "body.bin")
  writeFileSync(at, new Uint8Array([0xff, 0xfe, 0x01, 0x02]))
  const said = write(
    ["--file-path", "akasha/two.bin", "--content-file", at, "--message", "held"],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect([...readFileSync(join(root, "akasha/two.bin"))]).toEqual([0xff, 0xfe, 0x01, 0x02])
})

test("a change asking for what already stands commits nothing and says so", () => {
  const root = repoWith()
  const was = headOf(root)
  const from = put(root, "body.txt", "committed\n")
  const said = write(["--file-path", "akasha/one.ts", "--content-file", from], givenIn(root))
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("nothing was committed")
  expect(headOf(root)).toBe(was)
})

test("every flag the surface shows is a flag this takes", () => {
  const given = givenIn("/nowhere")
  for (const one of surface.taking) {
    const said = write([one.said.split(" ")[0] ?? ""], given)
    expect(said.refusals.join(" ")).not.toContain("this takes")
  }
})
