import { describe, expect, it } from "bun:test"
import type { Value } from "../formula/formula.ts"
import type { Declared } from "../query/query.ts"
import type { Stated } from "../read/files.ts"
import type { Front } from "./front.ts"
import { type Writing, pageWith } from "./page.ts"

const MARK = String.fromCharCode(96)

const AT = "287ec2ff-cd1d-5c3a-97d9-8fea6a6a90ca"

const MINTED = "00000000-0001-7000-8000-000000000000"

const HEAD = `---\npage-type-slug: domain\nid: ${AT}\n`

const DECLARED: Declared = {
  properties: {
    id: { type: { kind: "text" } },
    title: { type: { kind: "text" } },
    slug: { type: { kind: "text" } },
    settled: { type: { kind: "boolean" } },
    weight: { type: { kind: "number" } },
    "sequence-slugs": { type: { kind: "list", of: "text" } },
    depth: { type: { kind: "number" }, formula: "1" },
  },
  beyond: { notes: "markdown" },
}

const STANDING: Stated = {
  "page-type-slug": "domain",
  id: AT,
  title: "Old",
  settled: true,
  "sequence-slugs": ["domain/one", "domain/two"],
}

const STOOD = `${HEAD}title: Old\nsettled: true\nsequence-slugs:\n  - domain/one\n  - domain/two\n---\n`

const text = (held: string): Value => ({ kind: "text", text: held })

const list = (items: readonly string[]): Value => ({
  kind: "list",
  of: "text",
  items: items.map(text),
})

const ABSENT: Value = { kind: "absent" }

const never = (): number => {
  throw new Error("an id was minted for a page that already states one")
}

const textOf = (front: Front): string => {
  if (front.kind !== "text") throw new Error(front.why)
  return front.text
}

const whyOf = (front: Front): string => {
  if (front.kind !== "refused") throw new Error(front.text)
  return front.why
}

const writing = (
  setting: Readonly<Record<string, Value>>,
  standing: Stated | null,
  random: () => number
): Writing => ({
  pageType: "domain",
  declared: DECLARED,
  setting,
  body: "",
  standing,
  now: 1,
  random,
})

const pageOf = (setting: Readonly<Record<string, Value>>, standing: Stated): Front =>
  pageWith(writing(setting, standing, never))

const freshOf = (setting: Readonly<Record<string, Value>>): Front =>
  pageWith(writing(setting, null, () => 0))

describe("what a page holds after a write", () => {
  it("states the page type, the id and every key given, for a page standing nowhere yet", () => {
    const front = freshOf({ title: text("Test"), slug: text("test") })
    expect(textOf(front)).toBe(
      `---\npage-type-slug: domain\nid: ${MINTED}\ntitle: Test\nslug: test\n---\n`
    )
  })

  it("carries every standing key the caller never mentions through untouched", () => {
    expect(textOf(pageOf({}, STANDING))).toBe(STOOD)
  })

  it("changes only the key the caller names, leaving its neighbours where they stood", () => {
    expect(textOf(pageOf({ title: text("New") }, STANDING))).toBe(
      `${HEAD}title: New\nsettled: true\nsequence-slugs:\n  - domain/one\n  - domain/two\n---\n`
    )
  })

  it("carries a standing key the page type never declared, so an omission destroys nothing", () => {
    expect(textOf(pageOf({}, { ...STANDING, colour: "red" }))).toBe(
      `${HEAD}title: Old\nsettled: true\nsequence-slugs:\n  - domain/one\n  - domain/two\ncolour: red\n---\n`
    )
  })

  it("adds a key the page never stated after the keys that stood", () => {
    expect(textOf(pageOf({ slug: text("old") }, STANDING))).toBe(
      `${HEAD}title: Old\nsettled: true\nsequence-slugs:\n  - domain/one\n  - domain/two\nslug: old\n---\n`
    )
  })

  it("keeps the body after the frontmatter word for word", () => {
    const body = "\n# Definition\n\n- **Test** — a line with --- inside it.\n"
    const front = pageWith({
      pageType: "domain",
      declared: DECLARED,
      setting: {},
      body,
      standing: STANDING,
      now: 1,
      random: never,
    })
    expect(textOf(front)).toBe(
      `${HEAD}title: Old\nsettled: true\nsequence-slugs:\n  - domain/one\n  - domain/two\n---\n${body}`
    )
  })
})

describe("what takes a key away", () => {
  it("takes a key away only where the caller gives it as absent", () => {
    expect(textOf(pageOf({ settled: ABSENT }, STANDING))).toBe(
      `${HEAD}title: Old\nsequence-slugs:\n  - domain/one\n  - domain/two\n---\n`
    )
  })

  it("states an empty list as an empty list, which is not the key being taken away", () => {
    expect(textOf(pageOf({ "sequence-slugs": list([]) }, STANDING))).toBe(
      `${HEAD}title: Old\nsettled: true\nsequence-slugs: []\n---\n`
    )
  })
})

describe("which identity a page comes out under", () => {
  it("mints an id for a page that states none", () => {
    expect(textOf(freshOf({}))).toBe(`---\npage-type-slug: domain\nid: ${MINTED}\n---\n`)
  })

  it("carries the standing id whatever moment the write happens at", () => {
    const front = pageWith({
      pageType: "domain",
      declared: DECLARED,
      setting: {},
      body: "",
      standing: STANDING,
      now: 1756000000000,
      random: never,
    })
    expect(textOf(front)).toBe(STOOD)
  })

  it("refuses rather than minting over an identity stated in a way no id is", () => {
    const front = pageOf({}, { "page-type-slug": "domain", id: 12345, title: "Old" })
    expect(whyOf(front)).toContain("id")
  })

  it("carries the sequence number a page states, in the place of its own it has", () => {
    const front = pageOf({}, { "page-type-slug": "domain", id: AT, seq: 7, title: "Old" })
    expect(textOf(front)).toBe(`---\npage-type-slug: domain\nid: ${AT}\nseq: 7\ntitle: Old\n---\n`)
  })
})

describe("which keys a caller may state", () => {
  it("refuses a key the page type does not declare, naming it", () => {
    expect(whyOf(pageOf({ colour: text("red") }, STANDING))).toContain("colour")
  })

  it("refuses a key a formula works out, rather than freezing one answer into the page", () => {
    expect(whyOf(pageOf({ depth: { kind: "number", number: 2 } }, STANDING))).toContain("depth")
  })

  it("refuses a key held beside the page rather than in it", () => {
    expect(whyOf(pageOf({ notes: text("x") }, STANDING))).toContain("notes")
  })

  it("answers a refusal rather than throwing for a key only a prototype names", () => {
    expect(whyOf(pageOf({ constructor: text("x") }, STANDING))).toContain("constructor")
  })
})

describe("which refusals reach the caller unchanged", () => {
  it("carries a refusal about how a value is kept, word for word", () => {
    expect(whyOf(pageOf({ settled: text("yes") }, STANDING))).toBe(
      `${MARK}settled${MARK} is declared boolean and was given text`
    )
  })

  it("carries a refusal about how the page is spelled, word for word", () => {
    expect(whyOf(freshOf({ id: text("other") }))).toBe(
      `${MARK}id${MARK} stands in a place of its own and cannot be given among the rest`
    )
  })

  it("refuses a standing value no page could state again, rather than dropping it", () => {
    const front = pageOf({}, { "page-type-slug": "domain", id: AT, nested: { deep: 1 } })
    expect(whyOf(front)).toContain("nested")
  })
})
