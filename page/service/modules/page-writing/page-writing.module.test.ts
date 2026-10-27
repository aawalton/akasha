import { expect, test } from "bun:test"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { DATA, INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import {
  batchIn,
  landedFault,
  landedIn,
  unreadIn,
  writerFor,
} from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import {
  AT,
  asking,
  cleared,
  putting,
  rootHolding,
  SCRATCH_AT,
} from "akasha/page/service/modules/page-writing/page-writing.module.test-fixtures.ts"
import { refusalIn } from "akasha/page/service/modules/write-batching/write-batching.module.code.ts"

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

test("a blind write changing or taking away a body already there is refused", () => {
  const root = rootHolding(AT, "was")
  for (const held of [putting("now"), { removes: [AT] }]) {
    const said = unreadIn(root, [{ asked: asking(held) }])
    expect(said.landing).toEqual([])
    expect(said.refused[0]?.[1]).toContain(`\`${AT}\``)
    expect(said.refused[0]?.[1]).toContain("send the commit that read answered")
  }
  cleared(root)
})

test("a write that reads, creates, puts the body held, keeps beside or is new is taken", () => {
  const root = rootHolding(AT, "same")
  for (const held of [
    { ...putting("now"), read: "a".repeat(40) },
    { puts: [{ path: "akasha/b.ts", content: "new" }] },
    putting("same"),
    { kept: [{ path: AT, values: { one: 1 } }] },
    { ...putting("now"), fresh: [{ pageTypeSlug: "thing", slug: "a", path: AT }] },
  ]) {
    const one = { asked: asking(held) }
    expect(unreadIn(root, [one])).toEqual({ landing: [one], refused: [] })
  }
  cleared(root)
})

test("a blind write over a body put earlier in its batch is refused", () => {
  const one = { asked: asking(putting("first")) }
  const two = { asked: asking(putting("second")) }
  const said = unreadIn(SCRATCH_AT, [one, two])
  expect(said.landing).toEqual([one])
  expect(said.refused.map(([held]) => held)).toEqual([two])
})

test("the writer refuses a blind write before it lands, as the caller's fault", async () => {
  const root = rootHolding(AT, "was")
  const said = await writerFor({ root }).writing(asking(putting("now")))
  expect("refused" in said && said.fault).toBe("caller")
  expect(readFileSync(join(root, AT), "utf8")).toBe("was")
  cleared(root)
})

test("nothing waiting is no batch", () => {
  const taken = batchIn([])
  expect(taken.batch.length).toBe(0)
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
