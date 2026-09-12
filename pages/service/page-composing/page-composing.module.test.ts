import { afterAll, expect, test } from "bun:test"
import { scratch } from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"
import {
  besideItsPage,
  endingRefused,
  endingWhy,
  foldedFor,
  folderFor,
  orderedIn,
  pagesAtFor,
  pathFor,
  slugRefused,
} from "akasha/pages/service/page-composing/page-composing.module.code.ts"
import {
  A_CRATE,
  A_HELD_FIGURE,
  A_NEW_FIGURE,
  A_NEW_THING,
  A_PORTRAIT_AT,
  AN_INSTANT,
  AT_THE_LENGTH,
  carrying,
  DEVICE_TOKENS_AT,
  HELD_CRATE_ID,
  HELD_THING,
  HELD_THING_BODY,
  HELD_THING_ID,
  PAST_THE_LENGTH,
  pageTypeAt,
  ROOT,
} from "akasha/pages/service/page-composing/page-composing.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("the keys are written in the order they are declared, the deepest type first", () => {
  const said = orderedIn([
    carrying("token", "device-token"),
    carrying("id", "page"),
    carrying("slug", "page"),
  ])
  expect(said.map((one) => one.key)).toEqual(["id", "slug", "token"])
})

test("one type's keys keep the order that type declares them in", () => {
  const said = orderedIn([carrying("b", "thing"), carrying("a", "thing")])
  expect(said.map((one) => one.key)).toEqual(["b", "a"])
})

test("a folder already named by the plural takes a new page under pages", () => {
  const said = pathFor(DEVICE_TOKENS_AT, "device-tokens", "device-token", "one", false)
  expect(said).toBe("akasha/person-system/device-tokens/pages/one.device-token.ts")
})

test("a folder named by the plural with the opening taken off takes its pages under pages", () => {
  const said = pathFor(
    pageTypeAt("story-chapter-read"),
    "story-chapters-read",
    "story-chapter-read",
    "one",
    true
  )
  expect(said).toBe("akasha/story/chapters-read/pages/one/one.story-chapter-read.ts")
})

test("a folder not named by the plural takes a new page under the plural", () => {
  const said = pathFor(
    "akasha/pages-system/indexes/index/index.page-type.ts",
    "indexes",
    "index",
    "one",
    false
  )
  expect(said).toBe("akasha/pages-system/indexes/index/indexes/one.index.ts")
})

test("a page carrying files beside it takes a folder of its own under the plural", () => {
  const said = pathFor(
    "akasha/pages-system/indexes/index/index.page-type.ts",
    "indexes",
    "index",
    "one",
    true
  )
  expect(said).toBe("akasha/pages-system/indexes/index/indexes/one/one.index.ts")
})

test("a type declaring a property held beside the page carries files beside it", () => {
  const carried = [carrying("slug", "thing"), carrying("rounds", "figure")]
  expect(besideItsPage(ROOT, carried)).toBe(true)
})

test("a type declaring no property held in a file carries none", () => {
  const carried = [carrying("slug", "thing"), carrying("title", "thing")]
  expect(besideItsPage(ROOT, carried)).toBe(false)
})

test("a type whose only file is named of its own carries none beside its page", () => {
  const carried = [carrying("slug", "thing"), carrying("manifest", "crate")]
  expect(besideItsPage(ROOT, carried)).toBe(false)
})

test("a file the root page type declares carries none beside the page", () => {
  const carried = [carrying("slug", "thing"), carrying("entries", "page")]
  expect(besideItsPage(ROOT, carried)).toBe(false)
})

test("a new page with a file beside it is placed in a folder of its own", () => {
  const said = foldedFor(ROOT, [A_NEW_FIGURE])
  expect("puts" in said && said.puts[0]?.path).toBe(
    "akasha/figures/pages/new-figure/new-figure.figure.ts"
  )
})

test("several pages compose into what one write puts and what it keeps", () => {
  const said = foldedFor(ROOT, [A_NEW_THING])
  expect("puts" in said && said.puts.length).toBe(1)
  expect("puts" in said && said.puts[0]?.path).toBe("akasha/things/pages/new-thing.thing.ts")
  expect("kept" in said && said.kept[0]?.values.lastSeenAt).toBe(AN_INSTANT)
})

test("a value the page type keeps outside the commit is written into no body", () => {
  const said = foldedFor(ROOT, [A_NEW_THING])
  expect("puts" in said && said.puts[0]?.content).toContain('title: "one that is new"')
  expect("puts" in said && said.puts[0]?.content).not.toContain("lastSeenAt")
})

test("one page refused refuses the whole list", () => {
  const said = foldedFor(ROOT, [
    A_NEW_THING,
    { pageTypeSlug: "thing", slug: "held-two", values: { nowhere: "one" } },
  ])
  expect("refused" in said && said.refused).toContain("nowhere")
})

test("a list of no page composes into nothing put and nothing kept", () => {
  const said = foldedFor(ROOT, [])
  expect("puts" in said && said.puts.length).toBe(0)
  expect("kept" in said && said.kept.length).toBe(0)
})

test("a page the index already holds keeps the identity it has", () => {
  const said = foldedFor(ROOT, [A_CRATE])
  expect("puts" in said && said.puts[0]?.content).toContain(HELD_CRATE_ID)
})

test("a page the index does not hold is composed carrying no identity", () => {
  const said = foldedFor(ROOT, [{ ...A_CRATE, slug: "held-one" }])
  expect("puts" in said && said.puts[0]?.path).toBe("akasha/crates/pages/held-one.crate.ts")
  expect("puts" in said && said.puts[0]?.content).not.toContain("id:")
})

test("a folder of a page's own drops the name above it from the front of the slug", () => {
  expect(folderFor("wake-days", "wake-day", "wake-day-1970-01-01")).toBe("1970-01-01")
  expect(folderFor("eso-days", "eso-day", "eso-day-1970-01-01")).toBe("1970-01-01")
})

test("a slug the name above it does not open is the folder whole", () => {
  expect(folderFor("seats", "seat", "one")).toBe("one")
  expect(folderFor("seats", "seat", "seat-")).toBe("seat-")
})

test("a merge keeps every key the caller does not name", () => {
  const said = foldedFor(ROOT, [
    { pageTypeSlug: "thing", slug: HELD_THING, values: { title: "a new title" }, merge: true },
  ])
  const content = "puts" in said ? said.puts[0]?.content : ""
  expect(content).toContain('title: "a new title"')
  expect(content).toContain('remark: "what was already noted"')
  expect(content).toContain('caption: "what it is shown as"')
  expect(content).toContain('slug: "held-thing"')
  expect(content).toContain('pageTypeSlug: "thing"')
  expect(content).toContain('type: "thing"')
  expect(content).toContain(HELD_THING_ID)
})

test("a merge keeps a value held in a file beside the page as the extension it states", () => {
  const said = foldedFor(ROOT, [{ ...A_HELD_FIGURE, values: { title: "a new title" } }])
  expect("puts" in said && said.puts[0]?.content).toContain('portrait: "md"')
})

test("an ending naming a file is no refusal", () => {
  expect(endingWhy("jsonl", "a.wake-day.completed-tasks.jsonl")).toBeNull()
})

test("an ending naming nothing is refused", () => {
  expect(endingWhy("", "a.wake-day.completed-tasks.")).toBe("names nothing")
})

test("an ending naming a folder is refused", () => {
  expect(endingWhy("held/one", "a.b.held/one")).toBe("names a folder rather than an ending")
})

test("an ending holding a line break is refused", () => {
  expect(endingWhy('{\n"a": 1}', 'a.b.{\n"a": 1}')).toBe("holds a character no file name takes")
})

test("an ending making a name past what a file name holds is refused", () => {
  const long = "j".repeat(300)
  expect(endingWhy(long, `a.b.${long}`)).toBe(
    "makes a name of 304 bytes, past the 255 a file name holds"
  )
})

test("a value that is no string under a key held in a file is refused", () => {
  const said = endingRefused("completedTasks", "completed-tasks", "a/b.wake-day.ts", 7)
  expect(said).toContain("hands over a number rather than an ending")
})

test("a body handed over under a key held in a file is refused rather than written", () => {
  const body = JSON.stringify({ achievements: Array.from({ length: 400 }, (_, at) => at) })
  const said = foldedFor(ROOT, [{ ...A_HELD_FIGURE, values: { rounds: body } }])
  expect("refused" in said && said.refused).toContain("`rounds` is held in a file")
  expect("refused" in said && said.refused).toContain("Write that file at a path of its own")
})

test("a key held in a file naming an ending is written into the page", () => {
  const said = foldedFor(ROOT, [{ ...A_HELD_FIGURE, values: { rounds: "jsonl" } }])
  expect("puts" in said && said.puts[0]?.content).toContain('rounds: "jsonl"')
})

test("a body handed over for a file property is put at the file its ending names", () => {
  const said = foldedFor(ROOT, [{ ...A_HELD_FIGURE, values: {}, bodies: { portrait: "# One\n" } }])
  const put = "puts" in said ? said.puts.find((one) => one.path === A_PORTRAIT_AT) : undefined
  expect(put?.content).toBe("# One\n")
  expect("puts" in said && said.puts[0]?.content).toContain('portrait: "md"')
})

test("a body handed over names the ending the page already carries", () => {
  const said = foldedFor(ROOT, [{ ...A_HELD_FIGURE, values: {}, bodies: { portrait: "x" } }])
  const paths = "puts" in said ? said.puts.map((one) => one.path) : []
  expect(paths).toContain(A_PORTRAIT_AT)
})

test("a body handed over under a key holding its values as rows is refused", () => {
  const said = foldedFor(ROOT, [{ ...A_HELD_FIGURE, values: {}, bodies: { rounds: "{}\n" } }])
  expect("refused" in said && said.refused).toContain("keeps its values as rows")
})

test("a body handed over under a key held in no file is refused", () => {
  const said = foldedFor(ROOT, [{ ...A_HELD_FIGURE, values: {}, bodies: { remark: "a body" } }])
  expect("refused" in said && said.refused).toContain("holds in a file beside the page")
})

test("a body handed over where nothing names the ending is refused", () => {
  const said = foldedFor(ROOT, [
    { pageTypeSlug: "figure", slug: "new-figure", values: {}, bodies: { portrait: "a body" } },
  ])
  expect("refused" in said && said.refused).toContain("nothing names that file's ending")
})

test("a body handed over for a file named rather than placed beside the page is refused", () => {
  const said = foldedFor(ROOT, [
    {
      pageTypeSlug: "crate",
      slug: "held-crate",
      values: {},
      bodies: { manifest: "{}" },
      merge: true,
    },
  ])
  expect("refused" in said && said.refused).toContain("a name of its own")
})

test("a write that does not merge keeps only the keys the caller names", () => {
  const said = foldedFor(ROOT, [
    { pageTypeSlug: "thing", slug: HELD_THING, values: { title: "a new title" } },
  ])
  const content = "puts" in said ? said.puts[0]?.content : ""
  expect(content).toContain('title: "a new title"')
  expect(content).not.toContain("remark:")
  expect(content).not.toContain("caption:")
})

test("a write that does not merge states the key naming the page type", () => {
  const said = foldedFor(ROOT, [
    { pageTypeSlug: "thing", slug: HELD_THING, values: { title: "a new title" } },
  ])
  const content = "puts" in said ? said.puts[0]?.content : ""
  expect(content).toContain('type: "thing"')
  expect(content).not.toContain("pageTypeSlug:")
})

test("a merge naming nothing composes the body the page already carries", () => {
  const said = foldedFor(ROOT, [
    { pageTypeSlug: "thing", slug: HELD_THING, values: {}, merge: true },
  ])
  expect("puts" in said && said.puts[0]?.content).toBe(HELD_THING_BODY)
})

test("a merge keeps a value held outside the commit beside the page rather than in it", () => {
  const said = foldedFor(ROOT, [
    { pageTypeSlug: "thing", slug: HELD_THING, values: { lastSeenAt: AN_INSTANT }, merge: true },
  ])
  const content = "puts" in said ? said.puts[0]?.content : ""
  expect(content).toContain('title: "the name it already has"')
  expect(content).toContain('remark: "what was already noted"')
  expect(content).not.toContain("lastSeenAt")
  expect("kept" in said && said.kept[0]?.values.lastSeenAt).toBe(AN_INSTANT)
})

test("a merge into a page the index does not hold composes that page as a new one", () => {
  const said = foldedFor(ROOT, [{ ...A_CRATE, slug: "held-one", merge: true }])
  expect("puts" in said && said.puts[0]?.path).toBe("akasha/crates/pages/held-one.crate.ts")
  expect("puts" in said && said.puts[0]?.content).not.toContain("id:")
})

test("a slug inside the length a page's slug holds is no refusal", () => {
  expect(slugRefused("held-one")).toBeNull()
  expect(AT_THE_LENGTH.length).toBe(100)
  expect(slugRefused(AT_THE_LENGTH)).toBeNull()
})

test("a slug at the length a page's slug holds composes", () => {
  const said = foldedFor(ROOT, [{ ...A_CRATE, slug: AT_THE_LENGTH }])
  expect("refused" in said).toBe(false)
  expect("puts" in said && said.puts[0]?.path).toBe(`akasha/crates/pages/${AT_THE_LENGTH}.crate.ts`)
})

test("a slug one character past that length is refused", () => {
  expect(PAST_THE_LENGTH.length).toBe(101)
  const said = slugRefused(PAST_THE_LENGTH)
  expect(said).toContain("101 characters")
  expect(said).toContain("100 characters a page's slug holds")
})

test("a page whose slug runs past that length composes into nothing", () => {
  const said = foldedFor(ROOT, [{ ...A_CRATE, slug: PAST_THE_LENGTH }])
  expect("refused" in said && said.refused).toContain("101 characters")
})

test("a slug past the length is refused before its page type is looked for", () => {
  const said = foldedFor(ROOT, [
    { pageTypeSlug: "no-such-type", slug: PAST_THE_LENGTH, values: {} },
  ])
  expect("refused" in said && said.refused).toContain("101 characters")
})

test("a slug making a name no export may be declared under is refused", () => {
  expect(slugRefused("2-things")).toContain("`2Things`")
  expect(slugRefused("held.one")).toContain("no `export const` may be declared under")
  expect(slugRefused("class")).toContain("TypeScript keeps for itself")
  expect(slugRefused("")).toContain("a slug saying nothing names no export")
})

test("a page whose slug makes no name composes into nothing", () => {
  const said = foldedFor(ROOT, [{ ...A_CRATE, slug: "2-things" }])
  expect("refused" in said && said.refused).toContain("`2Things`")
})

test("a merge is refused for a key the page type declares no property for", () => {
  const said = foldedFor(ROOT, [
    { pageTypeSlug: "thing", slug: HELD_THING, values: { nowhere: "one" }, merge: true },
  ])
  expect("refused" in said && said.refused).toContain("nowhere")
})

test("the folder a page type's pages sit in is answered from that type alone", () => {
  expect(pagesAtFor(ROOT, "thing")).toBe("akasha/things/pages")
  expect(pagesAtFor(ROOT, "crate")).toBe("akasha/crates/pages")
})

test("that folder is the folder every new page of that type is placed under", () => {
  const said = foldedFor(ROOT, [{ ...A_CRATE, slug: "held-one" }])
  const at = "puts" in said ? said.puts[0]?.path : ""
  expect(at).toBe(`${pagesAtFor(ROOT, "crate")}/held-one.crate.ts`)
})

test("a page type that is no page the index holds is refused rather than guessed at", () => {
  expect(() => pagesAtFor(ROOT, "no-such-type")).toThrow("names no page type the index holds")
})
