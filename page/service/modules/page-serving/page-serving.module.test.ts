import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import {
  APPEND_AT,
  ASK_AT,
  answering,
  foldedInto,
  READ_AT,
  WRITE_AT,
} from "akasha/page/service/modules/page-serving/page-serving.module.code.ts"
import {
  A_DEVICE_TOKEN,
  A_PAGE,
  AN_INSTANT,
  asking,
  bodyOf,
  GIVEN,
  over,
  refusalOf,
  repoWith,
  scratch,
  TOLD,
  tightly,
  writing,
} from "akasha/page/service/modules/page-serving/page-serving.module.test-fixtures.ts"

test("a question is answered with rows", async () => {
  const answered = await answering(GIVEN, asking({ pageTypeSlug: "decision-kind", keys: ["slug"] }))
  expect(answered.status).toBe(200)
  const held = await bodyOf(answered)
  expect(Array.isArray(held.rows)).toBe(true)
  expect(JSON.stringify(held.rows)).toContain("departure")
})

test("an answer counts what matched before what was taken", async () => {
  const held = await bodyOf(
    await answering(GIVEN, asking({ pageTypeSlug: "decision-kind", limit: 1 }))
  )
  expect(held.n).toBe(6)
})

test("a question whose rows run past what an answer carries is refused by size", async () => {
  const answered = await tightly()
  expect(answered.status).toBe(400)
  const refused = await refusalOf(answered)
  expect(refused).toContain("decision-kind")
  expect(refused).toContain("40 characters")
  expect(refused).toContain("of 6 rows matching")
})

test("a question narrowed under what an answer carries is answered", async () => {
  expect((await bodyOf(await tightly(1))).n).toBe(6)
})

test("nothing is asked at another path", async () => {
  const answered = await answering(GIVEN, asking({ pageTypeSlug: "decision-kind" }, "/elsewhere"))
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
  expect(await refusalOf(answered)).toContain("JSON")
})

test("a question naming no page type is refused", async () => {
  const answered = await answering(GIVEN, asking({ keys: ["slug"] }))
  expect(answered.status).toBe(400)
  expect(await refusalOf(answered)).toContain("pageTypeSlug")
})

test("a where that is no test is refused", async () => {
  const answered = await answering(
    GIVEN,
    asking({ pageTypeSlug: "decision-kind", where: { slug: 7 } })
  )
  expect(answered.status).toBe(400)
  expect(await refusalOf(answered)).toContain("where.slug")
})

test("keys that are not strings are refused", async () => {
  const answered = await answering(GIVEN, asking({ pageTypeSlug: "decision-kind", keys: [7] }))
  expect(answered.status).toBe(400)
  expect(await refusalOf(answered)).toContain("keys")
})

test("what the pages refuse is carried back", async () => {
  const answered = await answering(GIVEN, asking({ pageTypeSlug: "decision-kind", limit: -1 }))
  expect(answered.status).toBe(400)
  expect(await refusalOf(answered)).toContain("limit")
})

test("a write is handed in at a path of its own", async () => {
  const put = writing({ puts: [{ path: "akasha/a.ts", content: "x" }] })
  const answered = await answering(GIVEN, put)
  expect(answered.status).toBe(200)
  expect(TOLD[TOLD.length - 1]?.writer).toBe("Amy <amy@alanwalton.com>")
})

test("a write stating no writer is refused", async () => {
  const answered = await answering(GIVEN, asking({ message: "a message" }, WRITE_AT))
  expect(answered.status).toBe(400)
  expect(await refusalOf(answered)).toContain("writer")
})

test("a write stating no message is refused", async () => {
  const answered = await answering(GIVEN, asking({ writer: "Amy <amy@alanwalton.com>" }, WRITE_AT))
  expect(answered.status).toBe(400)
  expect(await refusalOf(answered)).toContain("message")
})

test("an answer to a write names the commit it landed as", async () => {
  const put = writing({ puts: [{ path: "akasha/a.ts", content: "x" }] })
  const held = await bodyOf(await answering(GIVEN, put))
  expect("commit" in held).toBe(true)
})

test("a test the pages do not run is refused by the name it was given", async () => {
  const answered = await answering(
    GIVEN,
    asking({ pageTypeSlug: "decision-kind", where: { slug: { startsWith: "de" } } })
  )
  expect(answered.status).toBe(400)
  expect(await refusalOf(answered)).toContain("where.slug.startsWith")
})

test("a refusal over a test names what the pages do run", async () => {
  const answered = await answering(
    GIVEN,
    asking({ pageTypeSlug: "decision-kind", where: { slug: { gt: "de" } } })
  )
  expect(await refusalOf(answered)).toContain("ends-with")
})

test("a where holding only the tests already taken answers as it did", async () => {
  const answered = await answering(
    GIVEN,
    asking({ pageTypeSlug: "decision-kind", where: { slug: { is: "gap" } }, keys: ["slug"] })
  )
  expect(answered.status).toBe(200)
  expect((await bodyOf(answered)).rows).toEqual([{ slug: "gap" }])
})

test("a test named nowhere is refused rather than narrowing nothing", async () => {
  const answered = await answering(
    GIVEN,
    asking({ pageTypeSlug: "decision-kind", where: { slug: { bogusop: "de" } }, keys: ["slug"] })
  )
  expect(answered.status).toBe(400)
  expect(await refusalOf(answered)).toContain("bogusop")
})

afterAll(scratch.sweep)

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

test("a read with neither a path nor a page is refused", async () => {
  const root = repoWith("one")
  const answered = await answering(over(root), asking({}, READ_AT))
  expect(answered.status).toBe(400)
  expect(await refusalOf(answered)).toContain("at least one path")
})

test("a read of a path that is no path inside the repository is refused", async () => {
  const root = repoWith("one")
  const answered = await answering(over(root), asking({ paths: ["/tools/a.ts"] }, READ_AT))
  expect(answered.status).toBe(400)
  expect(await refusalOf(answered)).toContain("no path inside the repository")
})

test("a read naming a commit is answered at that commit rather than at HEAD", async () => {
  const root = repoWith("one")
  const first = gitIn(root, ["rev-parse", "HEAD"]).trim()
  const answered = await answering(over(root), asking({ paths: [A_PAGE], at: first }, READ_AT))
  expect(answered.status).toBe(200)
  const held = await bodyOf(answered)
  expect(held.at).toBe(first)
})

test("a read naming a commit the repository does not hold is refused", async () => {
  const root = repoWith("one")
  const asked = { paths: [A_PAGE], at: "0".repeat(40) }
  const answered = await answering(over(root), asking(asked, READ_AT))
  expect(answered.status).toBe(400)
  expect(await refusalOf(answered)).toContain("names no commit here")
})

test("an append is handed in at a path of its own", async () => {
  const root = repoWith("one")
  const answered = await answering(over(root), asking({ path: A_PAGE, lines: ["{}"] }, APPEND_AT))
  expect(answered.status).toBe(200)
  const at = "akasha/a-page.module.entries.uncommitted.jsonl"
  expect((await bodyOf(answered)).appended).toBe(at)
  expect(readFileSync(join(root, at), "utf8")).toBe("{}\n")
})

test("an append naming no page here is refused", async () => {
  const root = repoWith("one")
  const asked = { path: "akasha/nowhere.module.ts", lines: ["{}"] }
  const answered = await answering(over(root), asking(asked, APPEND_AT))
  expect(answered.status).toBe(400)
  expect(await refusalOf(answered)).toContain("names no page here")
})

test("a write may have pages rather than bodies", async () => {
  const answered = await answering(GIVEN, writing({ pages: [A_DEVICE_TOKEN] }))
  expect(answered.status).toBe(200)
  const told = TOLD[TOLD.length - 1]
  expect(told?.puts?.[0]?.path).toBe("person/device-token/pages/held-one.device-token.ts")
})

test("which values a page carried commit is read from its page type", async () => {
  await answering(GIVEN, writing({ pages: [A_DEVICE_TOKEN] }))
  const told = TOLD[TOLD.length - 1]
  expect(told?.puts?.[0]?.content).not.toContain("lastSeenAt")
  expect(told?.kept?.[0]?.values.lastSeenAt).toBe(AN_INSTANT)
})

test("a page naming a page type nothing holds refuses the write", async () => {
  const answered = await answering(
    GIVEN,
    writing({ pages: [{ pageTypeSlug: "nothing-at-all", slug: "one", values: {} }] })
  )
  expect(answered.status).toBe(400)
  expect(await refusalOf(answered)).toContain("no page type")
})

test("a write carrying no page is handed on as it arrived", () => {
  const asked = { writer: "Amy <amy@alanwalton.com>", message: "a message" }
  expect(foldedInto(asked, [], [])).toBe(asked)
})

test("a page a write composes keeps its values beside what that write already kept", () => {
  const held = { writer: "a", message: "a", kept: [{ path: A_PAGE, values: {} }] }
  const folded = foldedInto(held, [], [{ path: "akasha/b.ts", values: {} }])
  expect(folded.kept?.map((one) => one.path)).toEqual([A_PAGE, "akasha/b.ts"])
})

const A_DEFINITION = "a distance the domain has not closed"

test("a page a write has merging is composed over what the page already has", async () => {
  await answering(
    GIVEN,
    writing({
      pages: [
        {
          pageTypeSlug: "decision-kind",
          slug: "gap",
          values: { definition: A_DEFINITION },
          merge: true,
        },
      ],
    })
  )
  const told = TOLD[TOLD.length - 1]
  expect(told?.puts?.[0]?.content).toContain('decisionGroup: "decision-group/intent"')
  expect(told?.puts?.[0]?.content).toContain(`definition: "${A_DEFINITION}"`)
})
