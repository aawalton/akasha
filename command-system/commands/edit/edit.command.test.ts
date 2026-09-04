import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { bytesOf as bytes } from "@akasha/testing-system/bodying"
import { REFUSES_CODE } from "@akasha/testing-system/minting"
import { put } from "@akasha/testing-system/putting"
import { landingAsked } from "../../asking/asking.module.code.ts"
import { checking } from "../../asking/asking.module.test-fixtures.ts"
import { baseOf as headOf } from "../../landing/landing.module.code.ts"
import { askedIn, edit, editing } from "./edit.command.code.ts"
import {
  changing,
  givenIn,
  MARKS,
  repoWith,
  scratch,
  stating,
} from "./edit.command.test-fixtures.ts"
import { edit as editCommand } from "./edit.command.ts"

afterAll(scratch.sweep)

test("a body no read is recorded of is refused inside the akasha folder, and not outside it", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  put(root, "akasha/loose.ts", "alpha\n")
  put(root, "tools/loose.ts", "alpha\n")
  const was = headOf(root)
  const said = edit(changing(root, "a", "alpha", "delta", "akasha/loose.ts"), givenIn(root))
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("the record does not show you read this")
  expect(readFileSync(join(root, "akasha/loose.ts"), "utf8")).toBe("alpha\n")
  expect(headOf(root)).toBe(was)
  const off = edit(changing(root, "b", "alpha", "delta", "tools/loose.ts"), givenIn(root))
  expect(off.refusals).toEqual([])
  expect(readFileSync(join(root, "tools/loose.ts"), "utf8")).toBe("delta\n")
})

test("a body the record shows read is edited", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = edit(changing(root, "a", "alpha", "delta"), givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
})

test("the glass broken edits a body the record does not show read", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  put(root, "akasha/loose.ts", "alpha\n")
  const said = edit(
    [...changing(root, "a", "alpha", "delta", "akasha/loose.ts"), "--break-the-glass", "held"],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/loose.ts"), "utf8")).toBe("delta\n")
})

test("an edit charged to no agent is refused whole", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = edit(changing(root, "a", "alpha", "delta"), {
    ...givenIn(root),
    agentId: null,
  })
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("should not be possible")
})

test("a stated substitution is worked into a whole body and landed", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\nbeta\ngamma\n" })
  const said = edit([...changing(root, "a", "beta", "delta"), "--message", "held"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("alpha\ndelta\ngamma\n")
  expect(git(root, ["log", "-1", "--pretty=%s"]).trim()).toBe("held")
})

test("substitutions against one file are worked in order, each against what the one before left", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = edit(
    [...changing(root, "a", "alpha", "beta"), ...stating(root, "b", "beta", "gamma")],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("gamma\n")
})

test("a substitution matching no times is refused before any check runs", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  checking(root, "marks", MARKS)
  const was = headOf(root)
  const said = edit(changing(root, "a", "nowhere", "delta"), givenIn(root))
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("matches no passage")
  expect(existsSync(join(root, "ran.txt"))).toBe(false)
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("alpha\n")
  expect(headOf(root)).toBe(was)
  const also = edit(changing(root, "b", "alpha", "delta"), givenIn(root))
  expect(also.code).toBe(0)
  expect(existsSync(join(root, "ran.txt"))).toBe(true)
})

test("a substitution matching more than once is refused before any check runs", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\nbeta\nalpha\n" })
  checking(root, "marks", MARKS)
  const was = headOf(root)
  const said = edit(changing(root, "a", "alpha", "delta"), givenIn(root))
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
  const said = edit(changing(root, "a", "alpha", "delta"), givenIn(root))
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("alpha\n")
  expect(headOf(root)).toBe(was)
})

test("a path that is not there is refused", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = edit(changing(root, "a", "alpha", "delta", "akasha/nowhere.ts"), givenIn(root))
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("is not there")
  expect(existsSync(join(root, "akasha/nowhere.ts"))).toBe(false)
})

test("a body that is not text is refused", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  writeFileSync(join(root, "akasha/one.bin"), new Uint8Array([0xff, 0xfe, 0x00, 0x01]))
  git(root, ["add", "--", "akasha/one.bin"])
  git(root, ["commit", "--quiet", "-m", "held", "--", "akasha/one.bin"])
  const said = edit(changing(root, "a", "alpha", "delta", "akasha/one.bin"), givenIn(root))
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("is not text")
})

test("a body is overwritten only where what is on disk is the body its writer read", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const was = headOf(root)
  const asked = {
    changes: [{ path: "akasha/one.ts", body: bytes("worked out\n") }],
    message: "held",
    dryRun: false,
    glass: null,
    saying: () => [],
  }
  const off = [{ path: "akasha/one.ts", was: bytes("what this call read\n") }]
  const said = landingAsked(givenIn(root), { ...asked, unmoved: off })
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("changed after this call read it")
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("alpha\n")
  expect(headOf(root)).toBe(was)
  const on = [{ path: "akasha/one.ts", was: bytes("alpha\n") }]
  expect(landingAsked(givenIn(root), { ...asked, unmoved: on }).code).toBe(0)
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("worked out\n")
})

test("what an edit hands landing carries the bytes it read for each file it changes", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n", "akasha/two.ts": "beta\n" })
  const asked = askedIn(
    [
      ...changing(root, "a", "alpha", "delta"),
      ...changing(root, "b", "beta", "gamma", "akasha/two.ts"),
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
  const said = edit(changing(root, "a", "alpha", "$& $' $` $1"), givenIn(root))
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("$& $' $` $1\n")
})

test("a path outside the akasha folder is changed and said to be unjudged, unless it is barred", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n", "tools/two.ts": "alpha\n" })
  const said = edit(changing(root, "a", "alpha", "delta", "tools/two.ts"), givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.report.join("\n")).toContain("went unjudged — tools/two.ts")
  expect(readFileSync(join(root, "tools/two.ts"), "utf8")).toBe("delta\n")
  const inner = edit(changing(root, "c", "delta", "beta", ".git/config"), givenIn(root))
  expect(inner.refusals[0]).toContain("`.git/`")
  const top = edit(changing(root, "d", "delta", "beta", "tools"), givenIn(root))
  expect(top.refusals[0]).toContain("at the top of the")
})

test("a substitution naming no passage is refused by its ordinal wherever the path is", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n", "tools/two.ts": "alpha\nbeta\n" })
  const asked = [
    ...changing(root, "a", "alpha", "delta", "tools/two.ts"),
    ...stating(root, "b", "nowhere", "epsilon"),
  ]
  const said = edit(asked, givenIn(root))
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("substitution 2 matches no passage")
  expect(readFileSync(join(root, "tools/two.ts"), "utf8")).toBe("alpha\nbeta\n")
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

test("a file path stating no old file with nothing piped in is refused", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = editing(["--file-path", "akasha/one.ts"], givenIn(root), () => ({ tty: true }))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("nothing is piped in")
  expect(said.refusals[0]).toContain("<<<<<<< old")
})

test("marker blocks piped in state the substitutions, worked in the order stated", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\nbeta\n" })
  const one = "<<<<<<< old\nbeta\n=======\ndelta\n>>>>>>> new\n"
  const two = "<<<<<<< old\ndelta\n=======\ngamma\n>>>>>>> new\n"
  const piped = () => ({ bytes: bytes(one + two) })
  const said = editing(["--file-path", "akasha/one.ts"], givenIn(root), piped)
  expect(said.refusals).toEqual([])
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("alpha\ngamma\n")
  const also = editing(changing(root, "a", "gamma", "delta"), givenIn(root), piped)
  expect(also.refusals).toEqual([])
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("alpha\ndelta\n")
})

test("an empty passage names no place and is refused", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = edit(changing(root, "a", "", "delta"), givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names no place")
})

test("breaking the glass runs no check and says so in the commit", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  checking(root, "refuses", REFUSES_CODE)
  const said = edit(
    [
      ...changing(root, "a", "alpha", "delta"),
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
    [...changing(root, "a", "alpha", "delta"), ...changing(root, "b", "beta", "epsilon")],
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
      ...changing(root, "a", "alpha", "delta"),
      ...changing(root, "b", "nowhere", "epsilon", "akasha/two.ts"),
    ],
    givenIn(root)
  )
  expect(said.code).toBe(2)
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("alpha\n")
  expect(headOf(root)).toBe(was)
})

test("a substitution and a removal land as one commit", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n", "akasha/two.ts": "beta\n" })
  const held = changing(root, "a", "alpha", "delta")
  const said = edit([...held, "--remove", "akasha/two.ts"], givenIn(root))
  expect(said.report.join("\n")).toContain("took away akasha/two.ts")
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe("delta\n")
})

test("a removal alone lands, and what stands beside it goes with it", () => {
  const root = repoWith({ "akasha/a.module.ts": "a\n", "akasha/a.module.code.ts": "b\n" })
  const said = edit(["--remove", "akasha/a.module.ts"], givenIn(root))
  expect(said.code).toBe(0)
  expect(existsSync(join(root, "akasha/a.module.code.ts"))).toBe(false)
})

test("a removal of what is not there is refused", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const said = edit(["--remove", "akasha/nowhere.ts"], givenIn(root))
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("take nothing away")
})

test("one path changed and taken away by one call is refused", () => {
  const root = repoWith({ "akasha/one.ts": "alpha\n" })
  const held = changing(root, "a", "alpha", "delta")
  const said = edit([...held, "--remove", "akasha/one.ts"], givenIn(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("both changed and taken away")
})

test("every flag the surface shows is a flag this takes", () => {
  const given = givenIn("/nowhere")
  for (const one of editCommand.taking) {
    const said = edit([one.said.split(" ")[0] ?? ""], given)
    expect(said.refusals.join(" ")).not.toContain("this takes")
  }
})
