import { expect, test } from "bun:test"
import { addIfNotPresentFile } from "akasha/change/mechanical/file/add-if-not-present-file/add-if-not-present-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"
import { appendLines } from "akasha/change/mechanical/file-content/append-lines/append-lines.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  AT,
  asking,
  putting,
  WRITER,
} from "akasha/page/service/modules/page-writing/page-writing.module.test-fixtures.ts"
import {
  appendsIn,
  editsIn,
  keptFilesIn,
  keptIn,
  latestIn,
  messageIn,
  pathsIn,
  pathsOver,
  refusalIn,
  thrownWhy,
  unheldIn,
  wroteBy,
} from "akasha/page/service/modules/write-batching/write-batching.module.code.ts"

const CHAT = "akasha/a.chat.jsonl"

const ONE = "0000-one-0000-one"

const TWO = "0000-two-0000-two"

function line(id: string): {
  readonly path: string
  readonly content: string
  readonly id: string
} {
  return { path: CHAT, content: `{"id":"${id}"}\n`, id }
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

test("a write sent again after it landed names the path it put", () => {
  expect(wroteBy(editsIn(asking(putting("x"))), []).wrote).toEqual([AT])
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

test("two writes in one batch reaching one path keep the later one", () => {
  const edits = latestIn([
    asking({ puts: [{ path: "akasha/a.ts", content: "first" }] }),
    asking({ puts: [{ path: "akasha/a.ts", content: "second" }] }),
  ])
  expect(edits.length).toBe(1)
  expect(edits[0]?.given).toEqual({ at: "akasha/a.ts", body: "second" })
})

test("lines appended land as an append-lines edit and are paths of the write", () => {
  const held = asking({ appends: [line(ONE)] })
  expect(refusalIn(held)).toBe(null)
  expect(pathsIn(held)).toEqual([CHAT])
  expect(editsIn(held)).toEqual([
    {
      at: `${changeMechanicalFileContent.slug}/${appendLines.slug}`,
      given: { at: CHAT, content: line(ONE).content },
    },
  ])
  expect(wroteBy(editsIn(held), []).wrote).toEqual([CHAT])
})

test("two writes in one batch appending to one file both land, in order", () => {
  const edits = latestIn([asking({ appends: [line(ONE)] }), asking({ appends: [line(TWO)] })])
  expect(edits.map((one) => one.given)).toEqual([
    { at: CHAT, content: line(ONE).content },
    { at: CHAT, content: line(TWO).content },
  ])
})

test("an append naming no id is refused, so no append can land twice when it is sent again", () => {
  expect(appendsIn([{ path: CHAT, content: "one\n" }])).toContain("names itself as `id`")
  expect(appendsIn([line(ONE)])).toEqual([line(ONE)])
})

test("an append whose id is short enough to be met by chance is refused", () => {
  const said = refusalIn(asking({ appends: [{ path: CHAT, content: '{"id":"a"}\n', id: "a" }] }))
  expect(said).toContain("16 characters or more")
})

test("an append whose content does not carry its id is refused", () => {
  const said = refusalIn(asking({ appends: [{ path: CHAT, content: "one\n", id: ONE }] }))
  expect(said).toContain("carries its `id` in its `content`")
})

test("an append the file already holds is dropped and answered as held", () => {
  const { batch, held } = unheldIn(
    [asking({ appends: [line(ONE), line(TWO)] })],
    () => line(ONE).content
  )
  expect(held).toEqual([ONE])
  expect(latestIn(batch).map((one) => one.given)).toEqual([
    { at: CHAT, content: line(TWO).content },
  ])
})

test("an append sent twice in one batch lands once", () => {
  const { batch, held } = unheldIn(
    [asking({ appends: [line(ONE)] }), asking({ appends: [line(ONE)] })],
    () => null
  )
  expect(held).toEqual([ONE])
  expect(latestIn(batch).length).toBe(1)
})

test("a file is read once however many appends a batch makes to it", () => {
  const read: string[] = []
  unheldIn([asking({ appends: [line(ONE), line(TWO)] })], (path) => {
    read.push(path)
    return ""
  })
  expect(read).toEqual([CHAT])
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
