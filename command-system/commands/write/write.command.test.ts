import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { bytesOf as bytes } from "@akasha/testing-system/bodying"
import { REFUSES_CODE } from "@akasha/testing-system/minting"
import { put } from "@akasha/testing-system/putting"
import { MECHANICAL } from "../../asking/asking.module.code.ts"
import {
  applied,
  bodyIn,
  checking,
  commitIn,
  givenIn,
  treeHolds,
  wroteWith,
} from "../../asking/asking.module.test-fixtures.ts"
import { baseOf as headOf } from "../../landing/landing.module.code.ts"
import { filing, write, writing } from "./write.command.code.ts"
import {
  alsoCommitted,
  readAs,
  removed,
  repoWith,
  scratch,
  wroteAndRemoved,
  wroteAt,
} from "./write.command.test-fixtures.ts"
import { write as writeCommand } from "./write.command.ts"

afterAll(scratch.sweep)

test("a write over a body the record does not show read is refused", async () => {
  const root = repoWith()
  put(root, "akasha/loose.ts", "loose\n")
  const was = headOf(root)
  const said = await wroteAt(root, "akasha/loose.ts")
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("the record does not show you read this")
  expect(said.refusals[0]).toContain("akasha read --file-path akasha/loose.ts")
  expect(readFileSync(join(root, "akasha/loose.ts"), "utf8")).toBe("loose\n")
  expect(headOf(root)).toBe(was)
})

test("a path taken away is warranted as one written over is", async () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  readAs(root, "akasha/two.ts", "elsewhere\n")
  const said = await removed(root, "akasha/two.ts")
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("it has changed since")
})

test("a write over a body that changed since it was read is refused", async () => {
  const root = repoWith()
  readAs(root, "akasha/one.ts", "elsewhere\n")
  const said = await wroteAt(root, "akasha/one.ts")
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("it has changed since")
})

test("a body the record shows read is written over", async () => {
  const root = repoWith()
  const said = await wroteAt(root, "akasha/one.ts")
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
})

test("a path standing at no body is written without a reading", async () => {
  const root = repoWith()
  const said = await wroteAt(root, "akasha/new.ts")
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
})

test("the glass broken writes over a body the record does not show read", async () => {
  const root = repoWith()
  put(root, "akasha/loose.ts", "loose\n")
  const said = await wroteAt(root, "akasha/loose.ts", ["--break-the-glass", "held"])
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/loose.ts"), "utf8")).toBe("proposed\n")
})

test("a write charged to no agent is refused whole", async () => {
  const root = repoWith()
  const said = await write(["--file-path", "akasha/new.ts", "--content-file", bodyIn(root)], {
    ...givenIn(root),
    agentId: null,
  })
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("should not be possible")
  expect(existsSync(join(root, "akasha/new.ts"))).toBe(false)
})

test("a write whose kind runs no warrant owes no reading of a body unread", async () => {
  const root = repoWith()
  put(root, "akasha/loose.ts", "loose\n")
  const argv = ["--file-path", "akasha/loose.ts", "--content-file", bodyIn(root)]
  const said = await wroteWith(root, argv, { ...givenIn(root), changeKind: MECHANICAL })
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/loose.ts"), "utf8")).toBe("proposed\n")
})

test("a mechanical write drafts nothing, so it lands charged to no agent", async () => {
  const root = repoWith()
  const said = await filing(
    ["--file-path", "akasha/new.ts", "--content-file", bodyIn(root)],
    { ...givenIn(root), agentId: null, changeKind: MECHANICAL },
    () => ({ tty: true })
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/new.ts"), "utf8")).toBe("proposed\n")
})

test("a change that passes is written and committed", async () => {
  const root = repoWith()
  const said = await wroteAt(root, "akasha/two.ts", ["--message", "held"])
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe("proposed\n")
  expect(said.report).toContain("1 check judged the 1 path the patch would leave, and none refused")
  expect(commitIn(root, said, "%s").trim()).toBe("held")
})

test("a refused change writes nothing and lands nothing", async () => {
  const root = repoWith()
  checking(root, "refuses", REFUSES_CODE)
  const said = await wroteAt(root, "akasha/two.ts")
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  expect(treeHolds(root, "akasha/two.ts")).toBe(false)
})

test("the bodies written and the paths taken away are one commit, refused together", async () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  checking(root, "refuses", REFUSES_CODE)
  const said = await wroteAndRemoved(root, "akasha/three.ts", "akasha/two.ts")
  expect(said.code).toBe(3)
  expect(existsSync(join(root, "akasha/three.ts"))).toBe(false)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe("committed\n")
  expect(treeHolds(root, "akasha/three.ts")).toBe(false)
  expect(treeHolds(root, "akasha/two.ts")).toBe(true)
})

test("a removal takes the file away and commits it with the write", async () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  const said = await wroteAndRemoved(root, "akasha/three.ts", "akasha/two.ts")
  expect(said.code).toBe(0)
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  expect(git(root, ["ls-files"]).trim().split("\n").sort()).toEqual([
    "akasha/one.ts",
    "akasha/three.ts",
  ])
})

test("a file beside a path taken away goes with it, tracked or not, warranted by nobody", async () => {
  const root = repoWith({ "akasha/held.module.ts": "committed\n" })
  const kept = alsoCommitted(root, "akasha/held.module.code.ts", "beside\n")
  const loose = put(root, "akasha/held.module.uncommitted.ts", "loose\n")
  expect(existsSync(loose)).toBe(true)
  const said = await removed(root, "akasha/held.module.ts")
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(existsSync(join(root, kept))).toBe(false)
  expect(existsSync(loose)).toBe(false)
})

test("a path git does not track is taken away where --remove names it", async () => {
  const root = repoWith()
  const at = "akasha/held.module.uncommitted.ts"
  put(root, at, "loose\n")
  expect(existsSync(join(root, at))).toBe(true)
  expect((await removed(root, at)).refusals[0]).not.toContain("take nothing away")
  readAs(root, at, "loose\n")
  const said = await removed(root, at)
  expect(said.refusals).toEqual([])
  expect(existsSync(join(root, at))).toBe(false)
})

test("a file standing beside a path this call writes is not taken away", async () => {
  const root = repoWith({
    "akasha/held.module.ts": "committed\n",
    "akasha/held.module.code.ts": "committed\n",
    "akasha/two.ts": "committed\n",
  })
  const said = await wroteAndRemoved(root, "akasha/held.module.code.ts", "akasha/two.ts")
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/held.module.code.ts"), "utf8")).toBe("proposed\n")
})

test("a removal of what is not there is refused as data that is wrong", async () => {
  const root = repoWith()
  const was = headOf(root)
  const said = await removed(root, "akasha/nowhere.ts")
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("take nothing away")
  expect(headOf(root)).toBe(was)
})

test("breaking the glass with no reason is refused", async () => {
  const root = repoWith()
  const said = await wroteAt(root, "akasha/two.ts", ["--break-the-glass", "   "])
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is empty")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
})

test("a path inside .git and a folder at the top of the repository are both refused", async () => {
  const root = repoWith()
  expect((await wroteAt(root, ".git/config")).refusals[0]).toContain("holds the repository itself")
  expect((await wroteAt(root, "akasha")).refusals[0]).toContain(
    "folder at the top of the repository"
  )
})

test("a path climbing out of the root is refused", async () => {
  const root = repoWith()
  const from = bodyIn(root)
  const said = await write(
    ["--file-path", "../akasha/two.ts", "--content-file", from],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is no path inside the repository")
})

test("a file path naming no content file with nothing piped in is refused", async () => {
  const root = repoWith()
  const said = await writing(["--file-path", "akasha/two.ts"], givenIn(root), () => ({ tty: true }))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("nothing is piped in")
  expect(said.refusals[0]).toContain("<<'EOF'")
})

test("the bytes piped in are the body, text or not", async () => {
  const root = repoWith()
  const raw = new Uint8Array([0xff, 0xfe, 0x01, 0x02])
  const drafted = await writing(["--file-path", "akasha/two.bin"], givenIn(root), () => ({
    bytes: raw,
  }))
  const said = await applied(root, drafted)
  expect(said.code).toBe(0)
  expect([...readFileSync(join(root, "akasha/two.bin"))]).toEqual([...raw])
})

test("what is piped in is left unread where no path wants it, and refused where it marks", async () => {
  const root = repoWith()
  const at = ["--file-path", "akasha/two.ts"]
  const piped = () => ({ bytes: bytes("alpha\n=======\nbeta\n") })
  const refused = async (argv: readonly string[], saying: string) => {
    const said = await writing(argv, givenIn(root), piped)
    expect(said.code).toBe(1)
    expect(said.refusals[0]).toContain(saying)
  }
  const also = await writing([...at, "--content-file", bodyIn(root)], givenIn(root), piped)
  expect(also.refusals).toEqual([])
  refused(at, "handed in at --content-file")
  refused([...at, ...at, "--content-file", bodyIn(root)], "closed by no --content-file before")
})

test("a flag this does not take is refused rather than ignored", async () => {
  const root = repoWith()
  const said = await write(["--mechanical"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is no flag this takes")
})

test("a call asking for nothing is refused", async () => {
  const root = repoWith()
  const said = await write(["--message", "held"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("asks for nothing")
})

test("one path written and taken away by one call is refused", async () => {
  const root = repoWith()
  const said = await wroteAndRemoved(root, "akasha/one.ts", "akasha/one.ts")
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("both written and taken away")
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("committed\n")
})

test("a message stated at the write reaches no commit, so the apply is what names one", async () => {
  const root = repoWith()
  const from = bodyIn(root)
  put(root, "message.txt", "  from a file  \n")
  const drafted = await write(
    ["--file-path", "akasha/two.ts", "--content-file", from, "--message", "  stated  "],
    givenIn(root)
  )
  expect(drafted.code).toBe(0)
  const said = await applied(root, drafted, ["--message-file", join(root, "message.txt")])
  expect(said.code).toBe(0)
  expect(commitIn(root, said).trim()).toBe("from a file")
})

test("a content file that is not there is a caller's mistake, not a refusal by the gate", async () => {
  const root = repoWith()
  const said = await write(
    ["--file-path", "akasha/two.ts", "--content-file", join(root, "nowhere.txt")],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("is not there")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
})

test("a content file standing that will not open says so rather than that it is not there", async () => {
  const root = repoWith()
  const said = await write(["--file-path", "akasha/two.ts", "--content-file", root], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("would not open")
  expect(said.refusals[0]).not.toContain("is not there")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
})

test("a body that is not text lands as the bytes it is", async () => {
  const root = repoWith()
  const at = join(root, "body.bin")
  writeFileSync(at, new Uint8Array([0xff, 0xfe, 0x01, 0x02]))
  const argv = ["--file-path", "akasha/two.bin", "--content-file", at, "--message", "held"]
  const said = await wroteWith(root, argv)
  expect(said.code).toBe(0)
  expect([...readFileSync(join(root, "akasha/two.bin"))]).toEqual([0xff, 0xfe, 0x01, 0x02])
})

test("a change asking for what already stands commits nothing and says so", async () => {
  const root = repoWith()
  const was = headOf(root)
  const from = put(root, "body.txt", "committed\n")
  const said = await write(["--file-path", "akasha/one.ts", "--content-file", from], givenIn(root))
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("the patch was worked out to nothing")
  expect(headOf(root)).toBe(was)
})

test("every flag the surface shows is a flag this takes", async () => {
  const given = givenIn("/nowhere")
  for (const one of writeCommand.taking) {
    const said = await write([one.said.split(" ")[0] ?? ""], given)
    expect(said.refusals.join(" ")).not.toContain("this takes")
  }
})
