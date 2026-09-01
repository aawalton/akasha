import { expect, test } from "bun:test"
import {
  type Asked,
  batchIn,
  editsIn,
  latestIn,
  messageIn,
  pathsIn,
  refusalIn,
  writerFor,
} from "./page-writing.module.code.ts"

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

test("a path outside akasha is refused", () => {
  const said = refusalIn(asking({ puts: [{ path: "tools/a.ts", content: "" }] }))
  expect(said).toContain("outside")
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

test("a path put carries a body and a path taken away carries none", () => {
  const held = asking({ puts: [{ path: "akasha/a.ts", content: "x" }], removes: ["akasha/b.ts"] })
  const edits = editsIn(held)
  expect(edits[0]?.body).toEqual(new TextEncoder().encode("x"))
  expect(edits[1]?.body).toBe(null)
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
  expect(edits[0]?.body).toEqual(new TextEncoder().encode("second"))
})

test("a write refused is answered without reaching the repository", async () => {
  const writer = writerFor({ root: "/var/tmp/no-such-root-stands-here" })
  const said = await writer.writing(asking({ puts: [{ path: "tools/a.ts", content: "" }] }))
  expect("refused" in said && said.refused).toContain("outside")
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
