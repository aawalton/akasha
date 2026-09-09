import { expect, test } from "bun:test"
import { join } from "node:path"
import type { Carried } from "@akasha/pages/page-type-properties"
import {
  besideItsPage,
  endingRefused,
  endingWhy,
  foldedFor,
  folderFor,
  orderedIn,
  pathFor,
  slugRefused,
} from "./page-composing.module.code.ts"

const ROOT = join(import.meta.dir, "..", "..", "..")

const AN_INSTANT = "2026-09-01T12:00:00.000Z"

const A_DEVICE_TOKEN = {
  pageTypeSlug: "device-token",
  slug: "held-one",
  values: {
    id: "01a05dc7-421c-7000-b93a-ac4514adf294",
    pageTypeSlug: "device-token",
    slug: "held-one",
    person: "alan",
    iosApp: "alanwalton",
    lastSeenAt: AN_INSTANT,
  },
}

const A_DAY = {
  pageTypeSlug: "day",
  slug: "wake-day-1970-01-01",
  values: {
    id: "01a06100-0000-7000-8000-000000000001",
    pageTypeSlug: "day",
    slug: "wake-day-1970-01-01",
    title: "1970-01-01",
    date: "1970-01-01",
  },
}

function carrying(key: string, declaredBy: string): Carried {
  return {
    pagePropertySlug: key,
    pageTypeSlug: "text-property",
    propertySlug: key,
    key,
    unique: null,
    declaredBy,
    required: false,
    many: false,
    maxCount: null,
    maxLength: null,
    uncommitted: false,
    secret: false,
  }
}

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
  const said = pathFor(
    "akasha/person-system/device-tokens/device-token.page-type.ts",
    "device-tokens",
    "device-token",
    "one",
    false
  )
  expect(said).toBe("akasha/person-system/device-tokens/pages/one.device-token.ts")
})

test("a folder named by the plural with the opening taken off takes its pages under pages", () => {
  const said = pathFor(
    "story/chapters-read/story-chapter-read.page-type.ts",
    "story-chapters-read",
    "story-chapter-read",
    "one",
    true
  )
  expect(said).toBe("story/chapters-read/pages/one/one.story-chapter-read.ts")
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

test("a type declaring a property held in a file carries files beside its page", () => {
  const carried = [carrying("slug", "page"), carrying("sessions", "day")]
  expect(besideItsPage(ROOT, carried)).toBe(true)
})

test("a type declaring no property held in a file carries none", () => {
  const carried = [carrying("slug", "page"), carrying("date", "day")]
  expect(besideItsPage(ROOT, carried)).toBe(false)
})

test("a new day is placed in a folder of its own under the plural", () => {
  const said = foldedFor(ROOT, [A_DAY])
  expect("puts" in said && said.puts[0]?.path).toBe(
    "alan/track/days/pages/wake-day-1970-01-01/wake-day-1970-01-01.day.ts"
  )
})

test("several pages compose into what one write puts and what it keeps", () => {
  const said = foldedFor(ROOT, [A_DEVICE_TOKEN])
  expect("puts" in said && said.puts.length).toBe(1)
  expect("puts" in said && said.puts[0]?.path).toBe(
    "persons/device-tokens/pages/held-one.device-token.ts"
  )
  expect("kept" in said && said.kept[0]?.values.lastSeenAt).toBe(AN_INSTANT)
})

test("a value the page type keeps outside the commit is written into no body", () => {
  const said = foldedFor(ROOT, [A_DEVICE_TOKEN])
  expect("puts" in said && said.puts[0]?.content).toContain('person: "alan"')
  expect("puts" in said && said.puts[0]?.content).not.toContain("lastSeenAt")
})

test("one page refused refuses the whole list", () => {
  const said = foldedFor(ROOT, [
    A_DEVICE_TOKEN,
    { pageTypeSlug: "device-token", slug: "held-two", values: { nowhere: "one" } },
  ])
  expect("refused" in said && said.refused).toContain("nowhere")
})

test("a list of no page composes into nothing put and nothing kept", () => {
  const said = foldedFor(ROOT, [])
  expect("puts" in said && said.puts.length).toBe(0)
  expect("kept" in said && said.kept.length).toBe(0)
})

const DEFINER = {
  pageTypeSlug: "role",
  slug: "definer",
  values: {
    pageTypeSlug: "role",
    slug: "definer",
    definition: "an agent settling with Alan what a domain is and becomes",
    onCall: false,
  },
}

test("a page the index already holds keeps the identity it has", () => {
  const said = foldedFor(ROOT, [DEFINER])
  expect("puts" in said && said.puts[0]?.content).toContain("01a053c5-8d29-7025-8439-5c119ee2f12d")
})

test("a page the index does not hold is composed carrying no identity", () => {
  const said = foldedFor(ROOT, [{ ...DEFINER, slug: "held-one" }])
  expect("puts" in said && said.puts[0]?.path).toBe("roles/pages/held-one.role.ts")
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

const A_HELD_DAY = "day-2026-03-06"

const A_HELD_DAY_AT = "alan/track/days/pages/2026-03-06/day-2026-03-06.day.ts"

test("a merge keeps every key the caller does not name", () => {
  const said = foldedFor(ROOT, [
    { pageTypeSlug: "day", slug: A_HELD_DAY, values: { title: "a new title" }, merge: true },
  ])
  const content = "puts" in said ? said.puts[0]?.content : ""
  expect(content).toContain('title: "a new title"')
  expect(content).toContain('date: "2026-03-06"')
  expect(content).toContain('completedTasks: "jsonl"')
  expect(content).toContain('slug: "day-2026-03-06"')
  expect(content).toContain('pageTypeSlug: "day"')
  expect(content).toContain("01a060ba-f203-7ab9-b6f4-796574aad5cd")
})

test("a merge keeps a value held in a file beside the page as the extension it states", () => {
  const said = foldedFor(ROOT, [
    { pageTypeSlug: "day", slug: A_HELD_DAY, values: { title: "a new title" }, merge: true },
  ])
  expect("puts" in said && said.puts[0]?.content).toContain('completedTasks: "jsonl"')
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
  const said = foldedFor(ROOT, [
    { pageTypeSlug: "day", slug: A_HELD_DAY, values: { completedTasks: body }, merge: true },
  ])
  expect("refused" in said && said.refused).toContain("`completedTasks` is held in a file")
  expect("refused" in said && said.refused).toContain("Write that file at a path of its own")
})

test("a key held in a file naming an ending is written into the page", () => {
  const said = foldedFor(ROOT, [
    {
      pageTypeSlug: "day",
      slug: A_HELD_DAY,
      values: { completedTasks: "jsonl" },
      merge: true,
    },
  ])
  expect("puts" in said && said.puts[0]?.content).toContain('completedTasks: "jsonl"')
})

const A_PORTRAIT_AT = "personas/pages/ember/ember.persona.portrait.md"

test("a body handed over for a file property is put at the file its ending names", () => {
  const said = foldedFor(ROOT, [
    {
      pageTypeSlug: "persona",
      slug: "ember",
      values: {},
      bodies: { portrait: "# Ember\n" },
      merge: true,
    },
  ])
  const put = "puts" in said ? said.puts.find((one) => one.path === A_PORTRAIT_AT) : undefined
  expect(put?.content).toBe("# Ember\n")
  expect("puts" in said && said.puts[0]?.content).toContain('portrait: "md"')
})

test("a body handed over names the ending the page already carries", () => {
  const said = foldedFor(ROOT, [
    { pageTypeSlug: "persona", slug: "ember", values: {}, bodies: { portrait: "x" }, merge: true },
  ])
  const paths = "puts" in said ? said.puts.map((one) => one.path) : []
  expect(paths).toContain(A_PORTRAIT_AT)
})

test("a body handed over under a key holding its values as rows is refused", () => {
  const said = foldedFor(ROOT, [
    {
      pageTypeSlug: "day",
      slug: A_HELD_DAY,
      values: {},
      bodies: { completedTasks: "{}\n" },
      merge: true,
    },
  ])
  expect("refused" in said && said.refused).toContain("keeps its values as rows")
})

test("a body handed over under a key held in no file is refused", () => {
  const said = foldedFor(ROOT, [
    {
      pageTypeSlug: "persona",
      slug: "ember",
      values: {},
      bodies: { purpose: "a body" },
      merge: true,
    },
  ])
  expect("refused" in said && said.refused).toContain("holds in a file beside the page")
})

test("a body handed over where nothing names the ending is refused", () => {
  const said = foldedFor(ROOT, [
    { pageTypeSlug: "persona", slug: "ember", values: {}, bodies: { appearance: "a body" } },
  ])
  expect("refused" in said && said.refused).toContain("nothing names that file's ending")
})

test("a body handed over for a file named rather than placed beside the page is refused", () => {
  const said = foldedFor(ROOT, [
    {
      pageTypeSlug: "workspace-package",
      slug: "pages-query",
      values: {},
      bodies: { manifest: "{}" },
      merge: true,
    },
  ])
  expect("refused" in said && said.refused).toContain("a name of its own")
})

test("a write that does not merge keeps only the keys the caller names", () => {
  const said = foldedFor(ROOT, [
    { pageTypeSlug: "day", slug: A_HELD_DAY, values: { title: "a new title" } },
  ])
  const content = "puts" in said ? said.puts[0]?.content : ""
  expect(content).toContain('title: "a new title"')
  expect(content).not.toContain("date:")
  expect(content).not.toContain("completedTasks")
})

test("a merge naming nothing composes the body the page already carries", async () => {
  const said = foldedFor(ROOT, [{ pageTypeSlug: "day", slug: A_HELD_DAY, values: {}, merge: true }])
  const onDisk = await Bun.file(join(ROOT, A_HELD_DAY_AT)).text()
  expect("puts" in said && said.puts[0]?.content).toBe(onDisk)
})

test("a merge keeps a value held outside the commit beside the page rather than in it", () => {
  const said = foldedFor(ROOT, [
    { pageTypeSlug: "idle-game", slug: "idle", values: { lastViewedAt: AN_INSTANT }, merge: true },
  ])
  const content = "puts" in said ? said.puts[0]?.content : ""
  expect(content).toContain('gameEngine: "idle"')
  expect(content).toMatch(/unit(Slug)?: "moments"/)
  expect(content).not.toContain("lastViewedAt")
  expect("kept" in said && said.kept[0]?.values.lastViewedAt).toBe(AN_INSTANT)
})

test("a merge into a page the index does not hold composes that page as a new one", () => {
  const said = foldedFor(ROOT, [{ ...DEFINER, slug: "held-one", merge: true }])
  expect("puts" in said && said.puts[0]?.path).toBe("roles/pages/held-one.role.ts")
  expect("puts" in said && said.puts[0]?.content).not.toContain("id:")
})

const AT_THE_LENGTH = `held-${"a".repeat(95)}`

const PAST_THE_LENGTH = `held-${"a".repeat(96)}`

test("a slug inside the length a page's slug holds is no refusal", () => {
  expect(slugRefused("held-one")).toBeNull()
  expect(AT_THE_LENGTH.length).toBe(100)
  expect(slugRefused(AT_THE_LENGTH)).toBeNull()
})

test("a slug at the length a page's slug holds composes", () => {
  const said = foldedFor(ROOT, [{ ...DEFINER, slug: AT_THE_LENGTH }])
  expect("refused" in said).toBe(false)
  expect("puts" in said && said.puts[0]?.path).toBe(`roles/pages/${AT_THE_LENGTH}.role.ts`)
})

test("a slug one character past that length is refused", () => {
  expect(PAST_THE_LENGTH.length).toBe(101)
  const said = slugRefused(PAST_THE_LENGTH)
  expect(said).toContain("101 characters")
  expect(said).toContain("100 characters a page's slug holds")
})

test("a page whose slug runs past that length composes into nothing", () => {
  const said = foldedFor(ROOT, [{ ...DEFINER, slug: PAST_THE_LENGTH }])
  expect("refused" in said && said.refused).toContain("101 characters")
})

test("a slug past the length is refused before its page type is looked for", () => {
  const said = foldedFor(ROOT, [
    { pageTypeSlug: "no-such-type", slug: PAST_THE_LENGTH, values: {} },
  ])
  expect("refused" in said && said.refused).toContain("101 characters")
})

test("a merge is refused for a key the page type declares no property for", () => {
  const said = foldedFor(ROOT, [
    { pageTypeSlug: "day", slug: A_HELD_DAY, values: { nowhere: "one" }, merge: true },
  ])
  expect("refused" in said && said.refused).toContain("nowhere")
})
