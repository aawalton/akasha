import { expect, test } from "bun:test"
import {
  appendIn,
  queryIn,
  readIn,
  type Written,
  writeIn,
} from "akasha/page/service/modules/call-reading/call-reading.module.code.ts"

const A_PAGE = "akasha/a-page.module.ts"

const A_WRITE = { writer: "Amy <amy@alanwalton.com>", message: "a message" }

function written(body: Record<string, unknown>): Written {
  return writeIn({ ...A_WRITE, ...body })
}

test("a whole question is read off the body", () => {
  const read = queryIn({
    pageTypeSlug: "decision-kind",
    where: { slug: { is: "gap" } },
    keys: ["slug"],
    sortBy: "slug",
    descending: true,
    limit: 2,
    offset: 1,
  })
  expect("query" in read && read.query.pageTypeSlug).toBe("decision-kind")
  expect("query" in read && read.query.descending).toBe(true)
})

test("a question that is not an object is refused", () => {
  const read = queryIn([1, 2, 3])
  expect("refused" in read && read.refused).toContain("JSON object")
})

test("a test given what it cannot take is refused by name", () => {
  const read = queryIn({ pageTypeSlug: "decision-kind", where: { slug: { in: "gap" } } })
  expect("refused" in read && read.refused).toContain("where.slug.in")
})

test("an ordering test given a list is refused by name", () => {
  const read = queryIn({ pageTypeSlug: "decision-kind", where: { at: { before: ["x"] } } })
  expect("refused" in read && read.refused).toContain("where.at.before")
})

test("a test the pages run is read off the body", () => {
  const read = queryIn({
    pageTypeSlug: "decision-kind",
    where: { slug: { "starts-with": "de" }, at: { "at-or-after": 7 } },
  })
  expect("query" in read && read.query.where?.slug?.["starts-with"]).toBe("de")
  expect("query" in read && read.query.where?.at?.["at-or-after"]).toBe(7)
})

test("a test stating nothing is refused by the key it is under", () => {
  const read = queryIn({ pageTypeSlug: "decision-kind", where: { slug: {} } })
  expect("refused" in read && read.refused).toContain("where.slug")
})

test("paths that are not strings are refused", () => {
  const found = readIn({ paths: [7] })
  expect("refused" in found && found.refused).toContain("paths")
})

test("a page named without a slug is refused", () => {
  const found = readIn({ pages: [{ pageTypeSlug: "module" }] })
  expect("refused" in found && found.refused).toContain("slug")
})

test("a read naming a page carries it through", () => {
  const found = readIn({ pages: [{ pageTypeSlug: "module", slug: "a-page" }] })
  expect("asked" in found && found.asked.pages?.[0]?.slug).toBe("a-page")
})

test("a read may name the commit it is answered at", () => {
  const found = readIn({ paths: [A_PAGE], at: "0123456789abcdef0123456789abcdef01234567" })
  expect("asked" in found && found.asked.at).toBe("0123456789abcdef0123456789abcdef01234567")
})

test("a read naming that commit as something other than a string is refused", () => {
  const found = readIn({ paths: [A_PAGE], at: 7 })
  expect("refused" in found && found.refused).toContain("`at`")
})

test("a put holding no content is refused", () => {
  const read = written({ puts: [{ path: "akasha/a.ts" }] })
  expect("refused" in read && read.refused).toContain("content")
})

test("what a write puts and what it takes away are both read off the body", () => {
  const read = written({
    puts: [{ path: "akasha/a.ts", content: "x" }],
    removes: ["akasha/b.ts"],
  })
  expect("asked" in read && read.asked.puts?.[0]?.content).toBe("x")
  expect("asked" in read && read.asked.removes?.[0]).toBe("akasha/b.ts")
})

test("a write may state the commit it read", () => {
  const read = written({
    puts: [{ path: A_PAGE, content: "x" }],
    read: "0123456789abcdef0123456789abcdef01234567",
  })
  expect("asked" in read && read.asked.read).toBe("0123456789abcdef0123456789abcdef01234567")
})

test("a write stating what it read as something other than a string is refused", () => {
  const read = written({ puts: [{ path: A_PAGE, content: "x" }], read: 7 })
  expect("refused" in read && read.refused).toContain("`read`")
})

test("a page handing over no values is refused", () => {
  const read = written({ pages: [{ pageTypeSlug: "device-token", slug: "held-one" }] })
  expect("refused" in read && read.refused).toContain("values")
})

test("a write may keep values outside the commit", () => {
  const read = written({ kept: [{ path: A_PAGE, values: { one: "abc" } }] })
  const kept = "asked" in read ? read.asked.kept : null
  expect(kept).toEqual([{ path: A_PAGE, values: { one: "abc" } }])
})

test("a value kept outside the commit naming no path or no values is refused", () => {
  const noPath = written({ kept: [{ values: {} }] })
  expect("refused" in noPath && noPath.refused).toContain("`path`")
  const noValues = written({ kept: [{ path: A_PAGE }] })
  expect("refused" in noValues && noValues.refused).toContain("`values`")
})

test("a page a write has may say whether it merges", () => {
  const read = written({
    pages: [{ pageTypeSlug: "device-token", slug: "held-one", values: {}, merge: true }],
  })
  expect("pages" in read && read.pages[0]?.merge).toBe(true)
})

test("a page saying it merges as neither true nor false is refused", () => {
  const read = written({
    pages: [{ pageTypeSlug: "device-token", slug: "held-one", values: {}, merge: "yes" }],
  })
  expect("refused" in read && read.refused).toContain("merge")
})

test("a page saying nothing about merging has no merge", () => {
  const read = written({
    pages: [{ pageTypeSlug: "device-token", slug: "held-one", values: {} }],
  })
  expect("pages" in read && read.pages[0]?.merge).toBeUndefined()
})

test("a page a write has may name where it is written", () => {
  const read = written({
    pages: [{ pageTypeSlug: "device-token", slug: "held-one", values: {}, path: A_PAGE }],
  })
  expect("pages" in read && read.pages[0]?.path).toBe(A_PAGE)
})

test("a page naming where it is written as anything but a string is refused", () => {
  const read = written({
    pages: [{ pageTypeSlug: "device-token", slug: "held-one", values: {}, path: 7 }],
  })
  expect("refused" in read && read.refused).toContain("`path`")
})

test("a write stating no writer or no message is refused", () => {
  expect("refused" in writeIn({ message: "a message" })).toBe(true)
  expect("refused" in writeIn({ writer: "Amy <amy@alanwalton.com>" })).toBe(true)
})

test("an append naming no part is read off the body naming no part", () => {
  const took = appendIn({ path: A_PAGE, lines: ["{}"] })
  expect("appending" in took && took.appending).toEqual({ path: A_PAGE, lines: ["{}"] })
})

test("an append naming no page is refused", () => {
  expect("refused" in appendIn({ lines: ["{}"] })).toBe(true)
})

test("lines that are not strings are refused", () => {
  const took = appendIn({ path: A_PAGE, lines: [7] })
  expect("refused" in took && took.refused).toContain("`lines`")
})

test("an append carrying no line is refused", () => {
  const took = appendIn({ path: A_PAGE, lines: [] })
  expect("refused" in took && took.refused).toContain("at least one line")
})

test("a line carrying a newline of its own is refused", () => {
  const took = appendIn({ path: A_PAGE, lines: ["{}\n{}"] })
  expect("refused" in took && took.refused).toContain("no newline of its own")
})

test("an append may name the part it is kept under", () => {
  const took = appendIn({ path: A_PAGE, under: "check.logs", lines: ["{}"] })
  expect("appending" in took && took.appending.under).toBe("check.logs")
})

test("an append naming that part as anything but a string is refused", () => {
  const took = appendIn({ path: A_PAGE, under: 7, lines: ["{}"] })
  expect("refused" in took && took.refused).toContain("`under`")
})
