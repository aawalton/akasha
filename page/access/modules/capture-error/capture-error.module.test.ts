import { expect, test } from "bun:test"
import { join } from "node:path"
import { changeGenerator } from "akasha/change/generator/change-generator.page-type.ts"
import { addIfNotPresentFile } from "akasha/change/mechanical/file/add-if-not-present-file/add-if-not-present-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { valueMinting } from "akasha/command/modules/value-minting/value-minting.change-generator.ts"
import {
  captureError,
  type ErrorCapturePayload,
  firstValuesFor,
  slugFor,
} from "akasha/page/access/modules/capture-error/capture-error.module.code.ts"
import { generatorKind } from "akasha/page/generator-kind/generator-kind.page-type.ts"
import {
  idOf,
  indexedRepo,
  pageOf,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import { relationProperty } from "akasha/page/relation-property/relation-property.page-type.ts"
import {
  askingFor,
  type Fetcher,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { answering as serving } from "akasha/page/service/modules/page-serving/page-serving.module.code.ts"
import { writerFor } from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import { z } from "zod"

const AN_INSTANT = "2026-09-01T12:00:00.000Z"

const WRITER = "someone <someone@alanwalton.com>"

const A_REPORT: ErrorCapturePayload = {
  fingerprint: "00384d8d426f113f",
  message: "a thing went wrong",
  stack: "at somewhere (a.ts:1:1)",
  kind: "react-render",
  app: "alanwalton",
  url: "http://localhost:3044/nav",
  userAgent: "a browser",
}

const A_SLUG = "alanwalton-00384d8d426f113f"

const SENT_BODY = z.object({
  pages: z
    .array(z.object({ slug: z.string(), fresh: z.boolean().optional() }).passthrough())
    .optional(),
  puts: z.unknown().optional(),
  key: z.string().optional(),
  by: z.number().optional(),
  set: z.record(z.string(), z.unknown()).optional(),
})

type Sent = { readonly at: string; readonly body: z.infer<typeof SENT_BODY> }

function answering(said: readonly unknown[], sent: Sent[]): Fetcher {
  let taken = 0
  return (url, init) => {
    sent.push({ at: url, body: SENT_BODY.parse(JSON.parse(String(init.body))) })
    const held = said[taken] ?? {}
    taken += 1
    return Promise.resolve(new Response(JSON.stringify(held), { status: 200 }))
  }
}

const noNap = (): Promise<void> => Promise.resolve()

const NOTHING_FILED = { rows: [], n: 0 }

const FILED = { rows: [{ slug: A_SLUG }], n: 1 }

const LANDED = { commit: "abc", wrote: ["a"], took: [] }

function calledAt(sent: readonly Sent[]): readonly (string | undefined)[] {
  return sent.map((one) => one.at.split("/").pop())
}

const seed = (one: string): string => `01a0a301-0000-7000-8000-0000000000${one}`

const ADDING_AT = `akasha/changes/${addIfNotPresentFile.slug}.${changeMechanicalFile.slug}`

const ADDING_CODE = join(
  rootOf(import.meta.dir),
  "change/mechanical/file",
  addIfNotPresentFile.slug,
  `${addIfNotPresentFile.slug}.${changeMechanicalFile.slug}.code.ts`
)

const MINTING_AT = `akasha/changes/${valueMinting.slug}.${changeGenerator.slug}`

const MINTING_CODE = join(
  rootOf(import.meta.dir),
  "command/modules",
  valueMinting.slug,
  `${valueMinting.slug}.${changeGenerator.slug}.code.ts`
)

const ERROR_PROPERTIES: readonly (readonly [string, boolean])[] = [
  ["type", false],
  ["fingerprint", false],
  ["app", false],
  ["kind", false],
  ["message", false],
  ["url", false],
  ["user-agent", false],
  ["release-sha", false],
  ["first-seen-at", false],
  ["last-seen-at", true],
  ["count", true],
]

function declared(pageProperty: string, uncommitted = false): Record<string, unknown> {
  const one: Record<string, unknown> = { pageProperty, required: false, many: false }
  return uncommitted ? { ...one, uncommitted } : one
}

function errorsRoot(): string {
  return indexedRepo({
    ...Object.fromEntries(
      ERROR_PROPERTIES.map(([slug], at) => [
        `akasha/${slug}.text-property.ts`,
        pageOf({ id: seed(String(at + 10)), type: "text-property", slug, propertySlug: slug }),
      ])
    ),
    "akasha/page.page-type.ts": pageOf({
      id: idOf("1"),
      type: "page-type",
      slug: "page",
      extends: [],
      properties: [declared("id"), declared("slug")],
    }),
    "akasha/runtime-error/runtime-error.page-type.ts": pageOf({
      id: seed("01"),
      type: "page-type",
      slug: "runtime-error",
      extends: [`${pageType.slug}/${page.slug}`],
      types: "ts",
      properties: ERROR_PROPERTIES.map(([slug, uncommitted]) => declared(slug, uncommitted)),
    }),
    "akasha/runtime-error/runtime-error.page-type.types.ts":
      "export type RuntimeError = Record<string, unknown>\n",
    [`${ADDING_AT}.ts`]: pageOf({
      id: seed("02"),
      type: `${pageType.slug}/${changeMechanicalFile.slug}`,
      slug: addIfNotPresentFile.slug,
      definition: "the change a page written through the pages service lands",
      code: "ts",
    }),
    [`${ADDING_AT}.code.ts`]: `export { runChange } from "${ADDING_CODE}"\n`,
    [`akasha/${changeGenerator.slug}.page-type.ts`]: pageOf({
      id: seed("03"),
      type: "page-type",
      slug: changeGenerator.slug,
      extends: [`${pageType.slug}/${page.slug}`],
    }),
    [`${MINTING_AT}.ts`]: pageOf({
      id: seed("04"),
      type: `${pageType.slug}/${changeGenerator.slug}`,
      slug: valueMinting.slug,
      definition: "the id a page written as new is given",
      code: "ts",
    }),
    [`${MINTING_AT}.code.ts`]: `export { generateChange } from "${MINTING_CODE}"\n`,
    "akasha/generator.relation-property.ts": pageOf({
      id: seed("05"),
      type: `${pageType.slug}/${relationProperty.slug}`,
      slug: "generator",
      propertySlug: "generator",
      targetPageType: `${pageType.slug}/${generatorKind.slug}`,
    }),
  })
}

function servedOver(root: string): Fetcher {
  const writer = writerFor({ root })
  return (url, init) => serving({ root, writer }, new Request(url, init))
}

async function countOf(through: Fetcher): Promise<unknown> {
  const asked = await askingFor(
    { pageTypeSlug: "runtime-error", where: { slug: { is: A_SLUG } } },
    through,
    noNap
  )
  return "rows" in asked ? asked.rows[0]?.count : asked.refused
}

test("a slug leads with the app so a fingerprint never opens a name", () => {
  expect(slugFor(A_REPORT)).toBe(A_SLUG)
})

test("an error met for the first time is filed with no count, since the count is raised apart", () => {
  const said = firstValuesFor(A_REPORT, AN_INSTANT)
  expect("count" in said).toBe(false)
  expect(said.firstSeenAt).toBe(AN_INSTANT)
})

test("no stack reaches the values a capture writes", () => {
  expect("stack" in firstValuesFor(A_REPORT, AN_INSTANT)).toBe(false)
})

test("a url the report left empty is written into no value", () => {
  expect("url" in firstValuesFor({ ...A_REPORT, url: "" }, AN_INSTANT)).toBe(false)
})

test("an error already filed is counted by one increment and writes no page", async () => {
  const sent: Sent[] = []
  const said = await captureError(A_REPORT, WRITER, answering([FILED, { value: 8 }], sent), noNap)
  expect(calledAt(sent)).toEqual(["ask", "increment"])
  expect(said.commit).toBeNull()
})

test("an increment adds one to the count and moves the moment the error was last met", async () => {
  const sent: Sent[] = []
  await captureError(A_REPORT, WRITER, answering([FILED, { value: 8 }], sent), noNap)
  const counted = sent[1]?.body
  expect(counted?.key).toBe("count")
  expect(counted?.by).toBe(1)
  expect(typeof counted?.set?.lastSeenAt).toBe("string")
})

test("an error met for the first time is written as new and then counted", async () => {
  const sent: Sent[] = []
  const said = await captureError(
    A_REPORT,
    WRITER,
    answering([NOTHING_FILED, LANDED, FILED, { value: 1 }], sent),
    noNap
  )
  expect(calledAt(sent)).toEqual(["ask", "write", "ask", "increment"])
  expect(sent[1]?.body.pages?.[0]?.fresh).toBe(true)
  expect(said.commit).toBe("abc")
})

test("a capture hands its page over as values rather than as a body", async () => {
  const sent: Sent[] = []
  await captureError(
    A_REPORT,
    WRITER,
    answering([NOTHING_FILED, LANDED, FILED, { value: 1 }], sent),
    noNap
  )
  const written = sent[1]?.body
  expect(written).toBeDefined()
  expect(written?.puts).toBeUndefined()
  expect(written?.pages?.[0]?.slug).toBe(A_SLUG)
})

test("a first write refused because the page was filed meanwhile is counted on that page", async () => {
  const already = `\`runtime-error/${A_SLUG}\` is a page already, and a page written as new takes a slug no page of its type has`
  const said = await captureError(
    A_REPORT,
    WRITER,
    answering([NOTHING_FILED, { refused: already }, FILED, { value: 2 }], []),
    noNap
  )
  expect(said.commit).toBeNull()
})

test("a question the pages refuse leaves nothing written", async () => {
  const sent: Sent[] = []
  const thrown = captureError(
    A_REPORT,
    WRITER,
    answering([{ refused: "no such page type" }], sent),
    noNap
  )
  await expect(thrown).rejects.toThrow("no such page type")
  expect(sent.length).toBe(1)
})

test("a write the pages refuse, leaving no page, is thrown rather than answered", async () => {
  const thrown = captureError(
    A_REPORT,
    WRITER,
    answering([NOTHING_FILED, { refused: "a write says what it is for" }, NOTHING_FILED], []),
    noNap
  )
  await expect(thrown).rejects.toThrow("a write says what it is for")
})

test("a count the pages refuse is thrown rather than answered", async () => {
  const thrown = captureError(
    A_REPORT,
    WRITER,
    answering([FILED, { refused: "`count` holds a string rather than a number" }], []),
    noNap
  )
  await expect(thrown).rejects.toThrow("rather than a number")
})

test("a write that landed no commit is answered rather than refused", async () => {
  const said = await captureError(
    A_REPORT,
    WRITER,
    answering([NOTHING_FILED, { commit: null, wrote: ["a"], took: [] }, FILED, { value: 1 }], []),
    noNap
  )
  expect(said.commit).toBeNull()
})

test("two first captures of one error arriving together through the pages service count two", async () => {
  const through = servedOver(errorsRoot())
  await Promise.all([
    captureError(A_REPORT, WRITER, through, noNap),
    captureError(A_REPORT, WRITER, through, noNap),
  ])
  expect(await countOf(through)).toBe(2)
})

test("captures of an error already filed arriving together through the pages service are each counted", async () => {
  const through = servedOver(errorsRoot())
  await captureError(A_REPORT, WRITER, through, noNap)
  const many = 5
  await Promise.all(
    Array.from({ length: many }, () => captureError(A_REPORT, WRITER, through, noNap))
  )
  expect(await countOf(through)).toBe(many + 1)
})
