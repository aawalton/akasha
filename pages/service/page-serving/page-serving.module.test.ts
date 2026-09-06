import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { said as gitIn } from "@akasha/git/git-running"
import type { Asked, Wrote } from "../page-writing/page-writing.module.code.ts"
import {
  ASK_AT,
  answering,
  foldedInto,
  queryIn,
  READ_AT,
  readIn,
  WRITE_AT,
  writeIn,
} from "./page-serving.module.code.ts"

const ROOT = join(import.meta.dir, "..", "..", "..")

const TOLD: Asked[] = []

const NOTHING_LANDS: Wrote = { commit: null, wrote: [], took: [] }

const GIVEN = {
  root: ROOT,
  writer: {
    writing: (asked: Asked) => {
      TOLD.push(asked)
      return Promise.resolve(NOTHING_LANDS)
    },
  },
}

function asking(body: unknown, at: string = ASK_AT, method: string = "POST"): Request {
  return new Request(`http://workstation${at}`, {
    method,
    body: method === "POST" ? JSON.stringify(body) : undefined,
    headers: { "content-type": "application/json" },
  })
}

async function bodyOf(answered: Response): Promise<Record<string, unknown>> {
  return (await answered.json()) as Record<string, unknown>
}

test("a question is answered with rows", async () => {
  const answered = await answering(
    GIVEN,
    asking({ pageTypeSlug: "invariant-kind", keys: ["slug"] })
  )
  expect(answered.status).toBe(200)
  const held = await bodyOf(answered)
  expect(Array.isArray(held.rows)).toBe(true)
  expect(JSON.stringify(held.rows)).toContain("departure")
})

test("nothing is asked at another path", async () => {
  const answered = await answering(GIVEN, asking({ pageTypeSlug: "invariant-kind" }, "/elsewhere"))
  expect(answered.status).toBe(404)
})

test("a question arrives by POST rather than by GET", async () => {
  const answered = await answering(GIVEN, asking(null, ASK_AT, "GET"))
  expect(answered.status).toBe(405)
})

test("a body that will not parse is refused", async () => {
  const request = new Request(`http://workstation${ASK_AT}`, { method: "POST", body: "not json" })
  const answered = await answering(GIVEN, request)
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("JSON")
})

test("a question naming no page type is refused", async () => {
  const answered = await answering(GIVEN, asking({ keys: ["slug"] }))
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("pageTypeSlug")
})

test("a where that is no test is refused", async () => {
  const answered = await answering(
    GIVEN,
    asking({ pageTypeSlug: "invariant-kind", where: { slug: 7 } })
  )
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("where.slug")
})

test("keys that are not strings are refused", async () => {
  const answered = await answering(GIVEN, asking({ pageTypeSlug: "invariant-kind", keys: [7] }))
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("keys")
})

test("what the pages refuse is carried back", async () => {
  const answered = await answering(GIVEN, asking({ pageTypeSlug: "invariant-kind", limit: -1 }))
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("limit")
})

test("a whole question is read off the body", () => {
  const read = queryIn({
    pageTypeSlug: "invariant-kind",
    where: { slug: { is: "gap" } },
    keys: ["slug"],
    sortBy: "slug",
    descending: true,
    limit: 2,
    offset: 1,
  })
  expect("query" in read && read.query.pageTypeSlug).toBe("invariant-kind")
  expect("query" in read && read.query.descending).toBe(true)
})

test("a question that is not an object is refused", () => {
  const read = queryIn([1, 2, 3])
  expect("refused" in read && read.refused).toContain("JSON object")
})

test("a write is handed in at a path of its own", async () => {
  const answered = await answering(
    GIVEN,
    asking(
      {
        writer: "Amy <amy@alanwalton.com>",
        message: "a message",
        puts: [{ path: "akasha/a.ts", content: "x" }],
      },
      WRITE_AT
    )
  )
  expect(answered.status).toBe(200)
  expect(TOLD[TOLD.length - 1]?.writer).toBe("Amy <amy@alanwalton.com>")
})

test("a write stating no writer is refused", async () => {
  const answered = await answering(GIVEN, asking({ message: "a message" }, WRITE_AT))
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("writer")
})

test("a write stating no message is refused", async () => {
  const answered = await answering(GIVEN, asking({ writer: "Amy <amy@alanwalton.com>" }, WRITE_AT))
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("message")
})

test("a put holding no content is refused", () => {
  const read = writeIn({
    writer: "Amy <amy@alanwalton.com>",
    message: "a message",
    puts: [{ path: "akasha/a.ts" }],
  })
  expect("refused" in read && read.refused).toContain("content")
})

test("what a write puts and what it takes away are both read off the body", () => {
  const read = writeIn({
    writer: "Amy <amy@alanwalton.com>",
    message: "a message",
    puts: [{ path: "akasha/a.ts", content: "x" }],
    removes: ["akasha/b.ts"],
  })
  expect("asked" in read && read.asked.puts?.[0]?.content).toBe("x")
  expect("asked" in read && read.asked.removes?.[0]).toBe("akasha/b.ts")
})

test("an answer to a write names the commit it landed as", async () => {
  const answered = await answering(
    GIVEN,
    asking(
      {
        writer: "Amy <amy@alanwalton.com>",
        message: "a message",
        puts: [{ path: "akasha/a.ts", content: "x" }],
      },
      WRITE_AT
    )
  )
  const held = await bodyOf(answered)
  expect("commit" in held).toBe(true)
})

test("a test the pages do not run is refused by the name it was given", async () => {
  const answered = await answering(
    GIVEN,
    asking({ pageTypeSlug: "invariant-kind", where: { slug: { startsWith: "de" } } })
  )
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("where.slug.startsWith")
})

test("a refusal over a test names what the pages do run", async () => {
  const answered = await answering(
    GIVEN,
    asking({ pageTypeSlug: "invariant-kind", where: { slug: { gt: "de" } } })
  )
  expect(String((await bodyOf(answered)).refused)).toContain("ends-with")
})

test("a test given what it cannot take is refused by name", () => {
  const read = queryIn({ pageTypeSlug: "invariant-kind", where: { slug: { in: "gap" } } })
  expect("refused" in read && read.refused).toContain("where.slug.in")
})

test("an ordering test given a list is refused by name", () => {
  const read = queryIn({ pageTypeSlug: "invariant-kind", where: { at: { before: ["x"] } } })
  expect("refused" in read && read.refused).toContain("where.at.before")
})

test("a test the pages run is read off the body", () => {
  const read = queryIn({
    pageTypeSlug: "invariant-kind",
    where: { slug: { "starts-with": "de" }, at: { "at-or-after": 7 } },
  })
  expect("query" in read && read.query.where?.slug?.["starts-with"]).toBe("de")
  expect("query" in read && read.query.where?.at?.["at-or-after"]).toBe(7)
})

test("a where holding only the tests already taken answers as it did", async () => {
  const answered = await answering(
    GIVEN,
    asking({ pageTypeSlug: "invariant-kind", where: { slug: { is: "gap" } }, keys: ["slug"] })
  )
  expect(answered.status).toBe(200)
  expect((await bodyOf(answered)).rows).toEqual([{ slug: "gap" }])
})

test("a test named nowhere is refused rather than narrowing nothing", async () => {
  const answered = await answering(
    GIVEN,
    asking({ pageTypeSlug: "invariant-kind", where: { slug: { bogusop: "de" } }, keys: ["slug"] })
  )
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("bogusop")
})

test("a test stating nothing is refused by the key it stands on", () => {
  const read = queryIn({ pageTypeSlug: "invariant-kind", where: { slug: {} } })
  expect("refused" in read && read.refused).toContain("where.slug")
})

const scratch = scratchWorld()

afterAll(scratch.sweep)

const A_PAGE = "akasha/a-page.module.ts"

function repoWith(body: string): string {
  const root = scratch.rootFor("akasha-page-serving-")
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@nowhere"])
  gitIn(root, ["config", "user.name", "Held"])
  const at = join(root, A_PAGE)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "first"])
  return root
}

function over(root: string) {
  return { root, writer: GIVEN.writer }
}

test("a read is handed in at a path of its own", async () => {
  const root = repoWith("the whole body\n")
  const answered = await answering(over(root), asking({ paths: [A_PAGE] }, READ_AT))
  expect(answered.status).toBe(200)
  const held = await bodyOf(answered)
  expect(JSON.stringify(held.bodies)).toContain("the whole body")
})

test("an answer to a read names the commit its bodies were read at", async () => {
  const root = repoWith("one")
  const answered = await answering(over(root), asking({ paths: [A_PAGE] }, READ_AT))
  const held = await bodyOf(answered)
  expect(held.at).toBe(gitIn(root, ["rev-parse", "HEAD"]).trim())
})

test("a read carrying neither a path nor a page is refused", async () => {
  const root = repoWith("one")
  const answered = await answering(over(root), asking({}, READ_AT))
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("at least one path")
})

test("a read of a path that is no path inside the repository is refused", async () => {
  const root = repoWith("one")
  const answered = await answering(over(root), asking({ paths: ["/tools/a.ts"] }, READ_AT))
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("no path inside the repository")
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

test("a write may state the commit it read", () => {
  const read = writeIn({
    writer: "Amy <amy@alanwalton.com>",
    message: "a message",
    puts: [{ path: A_PAGE, content: "x" }],
    read: "0123456789abcdef0123456789abcdef01234567",
  })
  expect("asked" in read && read.asked.read).toBe("0123456789abcdef0123456789abcdef01234567")
})

test("a write stating what it read as something other than a string is refused", () => {
  const read = writeIn({
    writer: "Amy <amy@alanwalton.com>",
    message: "a message",
    puts: [{ path: A_PAGE, content: "x" }],
    read: 7,
  })
  expect("refused" in read && read.refused).toContain("`read`")
})

const AN_INSTANT = "2026-09-01T12:00:00.000Z"

const A_DEVICE_TOKEN = {
  pageTypeSlug: "device-token",
  slug: "held-one",
  values: {
    id: "01a05dc7-421c-7000-b93a-ac4514adf294",
    pageTypeSlug: "device-token",
    slug: "held-one",
    personSlug: "alan",
    iosAppSlug: "alanwalton",
    lastSeenAt: AN_INSTANT,
  },
}

function writing(body: Record<string, unknown>): Request {
  return asking({ writer: "Amy <amy@alanwalton.com>", message: "a message", ...body }, WRITE_AT)
}

test("a write may carry pages rather than bodies", async () => {
  const answered = await answering(GIVEN, writing({ pages: [A_DEVICE_TOKEN] }))
  expect(answered.status).toBe(200)
  const told = TOLD[TOLD.length - 1]
  expect(told?.puts?.[0]?.path).toBe("person-system/device-tokens/pages/held-one.device-token.ts")
})

test("which values a page carried commit is read from its page type", async () => {
  await answering(GIVEN, writing({ pages: [A_DEVICE_TOKEN] }))
  const told = TOLD[TOLD.length - 1]
  expect(told?.puts?.[0]?.content).not.toContain("lastSeenAt")
  expect(told?.kept?.[0]?.values.lastSeenAt).toBe(AN_INSTANT)
})

test("a page handing over no values is refused", () => {
  const read = writeIn({
    writer: "Amy <amy@alanwalton.com>",
    message: "a message",
    pages: [{ pageTypeSlug: "device-token", slug: "held-one" }],
  })
  expect("refused" in read && read.refused).toContain("values")
})

test("a page naming a page type nothing holds refuses the write", async () => {
  const answered = await answering(
    GIVEN,
    writing({ pages: [{ pageTypeSlug: "nothing-at-all", slug: "one", values: {} }] })
  )
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("no page type")
})

test("a write carrying no page is handed on as it arrived", () => {
  const asked = { writer: "Amy <amy@alanwalton.com>", message: "a message" }
  expect(foldedInto(asked, [], [])).toBe(asked)
})

test("a page a write carries may say whether it merges", () => {
  const read = writeIn({
    writer: "Amy <amy@alanwalton.com>",
    message: "a message",
    pages: [{ pageTypeSlug: "device-token", slug: "held-one", values: {}, merge: true }],
  })
  expect("pages" in read && read.pages[0]?.merge).toBe(true)
})

test("a page saying it merges as neither true nor false is refused", () => {
  const read = writeIn({
    writer: "Amy <amy@alanwalton.com>",
    message: "a message",
    pages: [{ pageTypeSlug: "device-token", slug: "held-one", values: {}, merge: "yes" }],
  })
  expect("refused" in read && read.refused).toContain("merge")
})

test("a page saying nothing about merging carries no merge", () => {
  const read = writeIn({
    writer: "Amy <amy@alanwalton.com>",
    message: "a message",
    pages: [{ pageTypeSlug: "device-token", slug: "held-one", values: {} }],
  })
  expect("pages" in read && read.pages[0]?.merge).toBeUndefined()
})

test("a page a write carries merging is composed over what the page already carries", async () => {
  await answering(
    GIVEN,
    writing({
      pages: [
        {
          pageTypeSlug: "idle-game",
          slug: "idle",
          values: { favoritedAt: AN_INSTANT },
          merge: true,
        },
      ],
    })
  )
  const told = TOLD[TOLD.length - 1]
  expect(told?.puts?.[0]?.content).toContain('gameEngine: "idle"')
  expect(told?.puts?.[0]?.content).toContain('unitSlug: "moments"')
})
