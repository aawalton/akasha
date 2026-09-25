import { expect, test } from "bun:test"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { addIfNotPresentFile } from "akasha/change/mechanical/file/add-if-not-present-file/add-if-not-present-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"
import { DATA, INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import {
  type Asked,
  batchIn,
  editsIn,
  keptFilesIn,
  keptIn,
  landedFault,
  landedIn,
  latestIn,
  messageIn,
  pathsIn,
  pathsOver,
  refusalIn,
  thrownWhy,
  writerFor,
} from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"

const SCRATCH_AT = "/var/tmp"

const WRITER = "Amy <amy@alanwalton.com>"

function asking(held: Partial<Asked>): Asked {
  return { writer: WRITER, message: "a message", ...held }
}

test("a write naming no writer is refused", () => {
  expect(refusalIn(asking({ writer: "", puts: [{ path: "akasha/a.ts", content: "" }] }))).toContain(
    "names its writer"
  )
})

test("a writer that is not a name and an address is refused", () => {
  expect(
    refusalIn(asking({ writer: "amy", puts: [{ path: "akasha/a.ts", content: "" }] }))
  ).toContain("an address")
})

test("a write saying nothing about what it is for is refused", () => {
  const said = refusalIn(asking({ message: " ", puts: [{ path: "akasha/a.ts", content: "" }] }))
  expect(said).toContain("what it is for")
})

test("a write carrying no path is refused", () => {
  expect(refusalIn(asking({}))).toContain("at least one path")
})

test("a path that is no path inside the repository is refused", () => {
  const said = refusalIn(asking({ puts: [{ path: "/tools/a.ts", content: "" }] }))
  expect(said).toContain("no path inside the repository")
})

test("a path reaching above the root is refused", () => {
  const said = refusalIn(asking({ puts: [{ path: "akasha/../tools/a.ts", content: "" }] }))
  expect(said).toContain("above the root")
})

test("a write inside akasha carrying a writer and a message is taken", () => {
  expect(refusalIn(asking({ puts: [{ path: "akasha/a.ts", content: "x" }] }))).toBe(null)
})

test("what is put and what is taken away are both paths of the write", () => {
  const held = asking({ puts: [{ path: "akasha/a.ts", content: "x" }], removes: ["akasha/b.ts"] })
  expect(pathsIn(held)).toEqual(["akasha/a.ts", "akasha/b.ts"])
})

test("a path put names the change adding a body and a path taken away the change removing one", () => {
  const held = asking({ puts: [{ path: "akasha/a.ts", content: "x" }], removes: ["akasha/b.ts"] })
  expect(editsIn(held)).toEqual([
    {
      at: `${changeMechanicalFile.slug}/${addIfNotPresentFile.slug}`,
      given: { at: "akasha/a.ts", body: "x" },
    },
    {
      at: `${changeMechanicalFile.slug}/${removeFile.slug}`,
      given: { at: "akasha/b.ts" },
    },
  ])
})

test("one write is committed under its own message", () => {
  expect(messageIn([asking({ message: "what it is for" })])).toBe(
    `what it is for\n\nWritten-by: ${WRITER}`
  )
})

test("a batch names every writer it carries", () => {
  const said = messageIn([
    asking({ message: "one" }),
    asking({ writer: "Jenny <jenny@alanwalton.com>", message: "two" }),
  ])
  expect(said).toContain("2 writes arrived together")
  expect(said).toContain(`Written-by: ${WRITER}`)
  expect(said).toContain("Written-by: Jenny <jenny@alanwalton.com>")
})

test("two writes in one batch reaching one path leave the later one standing", () => {
  const edits = latestIn([
    asking({ puts: [{ path: "akasha/a.ts", content: "first" }] }),
    asking({ puts: [{ path: "akasha/a.ts", content: "second" }] }),
  ])
  expect(edits.length).toBe(1)
  expect(edits[0]?.given).toEqual({ at: "akasha/a.ts", body: "second" })
})

test("a write refused is answered without reaching the repository", async () => {
  const writer = writerFor({ root: "/var/tmp/no-such-root-stands-here" })
  const said = await writer.writing(asking({ puts: [{ path: "/tools/a.ts", content: "" }] }))
  expect("refused" in said && said.refused).toContain("no path inside the repository")
  expect("refused" in said && said.fault).toBe("caller")
})

test("a landing refused over a path moved since it was read is a race", () => {
  expect(landedFault({ refusals: ["moved"], code: DATA, moved: true })).toBe("race")
})

test("a landing refused over what the write named is the caller's fault", () => {
  expect(landedFault({ refusals: ["`yesterday` names no commit"], code: INPUT })).toBe("caller")
})

test("any other landing refused is the service's fault", () => {
  expect(landedFault({ refusals: ["the index keeper would not load"], code: DATA })).toBe("service")
})

test("a write stating the commit it read is taken", () => {
  const held = asking({
    puts: [{ path: "akasha/a.ts", content: "x" }],
    read: "0123456789abcdef0123456789abcdef01234567",
  })
  expect(refusalIn(held)).toBe(null)
})

test("a write stating the commit it read by a short name is taken", () => {
  const held = asking({ puts: [{ path: "akasha/a.ts", content: "x" }], read: "dbe667c6bf" })
  expect(refusalIn(held)).toBe(null)
})

test("writes stating nothing they read land together", () => {
  const waiting = [{ asked: asking({}) }, { asked: asking({}) }, { asked: asking({}) }]
  const taken = batchIn(waiting)
  expect(taken.batch.length).toBe(3)
  expect(taken.rest.length).toBe(0)
})

test("a write stating what it read lands in a batch of its own", () => {
  const one = { asked: asking({ read: "a".repeat(40) }) }
  const two = { asked: asking({}) }
  const taken = batchIn([one, two])
  expect(taken.batch).toEqual([one])
  expect(taken.rest).toEqual([two])
})

test("a write stating what it read does not join the batch before it", () => {
  const one = { asked: asking({}) }
  const two = { asked: asking({ read: "a".repeat(40) }) }
  const taken = batchIn([one, two])
  expect(taken.batch).toEqual([one])
  expect(taken.rest).toEqual([two])
})

test("nothing waiting is no batch", () => {
  const taken = batchIn([])
  expect(taken.batch.length).toBe(0)
})

test("a page a value is kept for is a path of the write", () => {
  const held = asking({ kept: [{ path: "akasha/a.thing.ts", values: { lastSeenAt: "now" } }] })
  expect(pathsIn(held)).toEqual(["akasha/a.thing.ts"])
})

test("a page kept at no path inside the repository is refused", () => {
  const held = asking({ kept: [{ path: "/pages/a.thing.ts", values: { one: 1 } }] })
  expect(refusalIn(held)).toContain("no path inside the repository")
})

test("a write carrying only a kept value is taken", () => {
  const held = asking({ kept: [{ path: "akasha/a.thing.ts", values: { one: 1 } }] })
  expect(refusalIn(held)).toBe(null)
})

test("two writes in one batch keeping one page merge onto one another in order", () => {
  const kept = keptIn([
    asking({ kept: [{ path: "akasha/a.thing.ts", values: { one: 1, two: 2 } }] }),
    asking({ kept: [{ path: "akasha/a.thing.ts", values: { two: 22 } }] }),
  ])
  expect(kept.length).toBe(1)
  expect(kept[0]?.values).toEqual({ one: 1, two: 22 })
})

test("a value kept for two pages is kept for each", () => {
  const kept = keptIn([
    asking({
      kept: [
        { path: "akasha/a.thing.ts", values: { one: 1 } },
        { path: "akasha/b.thing.ts", values: { two: 2 } },
      ],
    }),
  ])
  expect(kept.map((one) => one.path)).toEqual(["akasha/a.thing.ts", "akasha/b.thing.ts"])
})

test("a write carrying only kept values lands no commit and writes beside the page", async () => {
  const root = mkdtempSync(join(SCRATCH_AT, "page-writing-"))
  const said = await landedIn(root, [
    asking({
      kept: [{ path: "akasha/a.thing.ts", values: { lastSeenAt: "2026-09-01T00:00:00.000Z" } }],
    }),
  ])
  expect("refused" in said).toBe(false)
  expect("commit" in said && said.commit).toBe(null)
  const beside = join(root, "akasha/a.thing.uncommitted.ts")
  expect(existsSync(beside)).toBe(true)
  expect(readFileSync(beside, "utf8")).toContain("2026-09-01T00:00:00.000Z")
  rmSync(root, { recursive: true, force: true })
})

test("a file kept outside the commit is a path of the write", () => {
  const held = asking({
    keptPuts: [{ path: "akasha/a.thing.rows.uncommitted.jsonl", content: "{}\n" }],
    keptRemoves: ["akasha/a.thing.rows.part2.uncommitted.jsonl"],
  })
  expect(pathsIn(held)).toEqual([
    "akasha/a.thing.rows.uncommitted.jsonl",
    "akasha/a.thing.rows.part2.uncommitted.jsonl",
  ])
})

test("of two writes in one batch reaching one kept file, the later one remains", () => {
  const files = keptFilesIn([
    asking({ keptPuts: [{ path: "akasha/a.jsonl", content: "one\n" }] }),
    asking({ keptRemoves: ["akasha/a.jsonl"] }),
  ])
  expect([...files]).toEqual([["akasha/a.jsonl", null]])
})

test("a file kept outside the commit is written beside the values naming it, and no commit", async () => {
  const root = mkdtempSync(join(SCRATCH_AT, "page-writing-"))
  const rows = "akasha/a.thing.rows.uncommitted.jsonl"
  const gone = "akasha/a.thing.rows.part2.uncommitted.jsonl"
  await landedIn(root, [asking({ keptPuts: [{ path: gone, content: "{}\n" }] })])
  const said = await landedIn(root, [
    asking({
      kept: [{ path: "akasha/a.thing.ts", values: { rows: "jsonl" } }],
      keptPuts: [{ path: rows, content: '{"id":"one"}\n' }],
      keptRemoves: [gone],
    }),
  ])
  expect("commit" in said && said.commit).toBe(null)
  expect("wrote" in said && said.wrote).toEqual([rows, "akasha/a.thing.ts"])
  expect(readFileSync(join(root, rows), "utf8")).toBe('{"id":"one"}\n')
  expect(existsSync(join(root, gone))).toBe(false)
  expect(readFileSync(join(root, "akasha/a.thing.uncommitted.ts"), "utf8")).toContain('"jsonl"')
  rmSync(root, { recursive: true, force: true })
})

test("the paths a batch carries are gathered once each", () => {
  const held = [
    asking({ puts: [{ path: "akasha/a.ts", content: "" }] }),
    asking({ puts: [{ path: "akasha/a.ts", content: "" }], removes: ["akasha/b.ts"] }),
  ]
  expect(pathsOver(held)).toEqual(["akasha/a.ts", "akasha/b.ts"])
})

test("a throw carrying no path is answered naming the paths the write carried", () => {
  const held = [asking({ puts: [{ path: "akasha/a.ts", content: "" }] })]
  const said = thrownWhy(held, new Error("ENAMETOOLONG: name too long, open"))
  expect(said).toContain("ENAMETOOLONG")
  expect(said).toContain("the write carried akasha/a.ts")
})

test("a write that threw after it committed names that commit beside those paths", () => {
  const held = [asking({ puts: [{ path: "akasha/a.ts", content: "" }] })]
  const commit = "1".repeat(40)
  const said = thrownWhy(held, new Error("the index would not free"), [commit])
  expect(said).toContain("the write carried akasha/a.ts")
  expect(said).toContain("stopped part way")
  expect(said).toContain(commit)
})

test("a write that throws is refused naming what the write carried", async () => {
  const held = mkdtempSync(join(SCRATCH_AT, "page-writing-"))
  const root = join(held, "a-file")
  writeFileSync(root, "")
  const said = await landedIn(root, [
    asking({ kept: [{ path: "akasha/a.thing.ts", values: { one: 1 } }] }),
  ])
  expect("refused" in said && said.refused).toContain("the write carried akasha/a.thing.ts")
  expect("refused" in said && said.fault).toBe("service")
  rmSync(held, { recursive: true, force: true })
})

test("acts handed in together run one at a time, each finishing before the next starts", async () => {
  const writer = writerFor({ root: "/var/tmp/no-such-root-is-here" })
  let inside = 0
  let most = 0
  const acting = async (one: number): Promise<number> => {
    inside += 1
    most = Math.max(most, inside)
    await new Promise((settle) => setTimeout(settle, 2))
    inside -= 1
    return one
  }
  const said = await Promise.all([1, 2, 3, 4, 5].map((one) => writer.alone(() => acting(one))))
  expect(said).toEqual([1, 2, 3, 4, 5])
  expect(most).toBe(1)
})

test("an act that throws fails its own caller and leaves the next act running", async () => {
  const writer = writerFor({ root: "/var/tmp/no-such-root-is-here" })
  const failing = writer.alone(() => {
    throw new Error("the act broke")
  })
  const next = writer.alone(() => Promise.resolve("ran"))
  await expect(failing).rejects.toThrow("the act broke")
  expect(await next).toBe("ran")
})

test("a value kept again merges onto what the page already keeps", async () => {
  const root = mkdtempSync(join(SCRATCH_AT, "page-writing-"))
  const at = "akasha/a.thing.ts"
  await landedIn(root, [asking({ kept: [{ path: at, values: { one: 1, two: 2 } }] })])
  await landedIn(root, [asking({ kept: [{ path: at, values: { two: 22 } }] })])
  const held = readFileSync(join(root, "akasha/a.thing.uncommitted.ts"), "utf8")
  expect(held).toContain('"one": 1')
  expect(held).toContain('"two": 22')
  rmSync(root, { recursive: true, force: true })
})
