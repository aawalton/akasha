import { describe, expect, it } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { type Stated, statedAt } from "../read/files.ts"
import { type Front, frontOf } from "./front.ts"
import type { Kept, Raw } from "./held.ts"

const AT = "287ec2ff-cd1d-5c3a-97d9-8fea6a6a90ca"

const HEAD = "---\npage-type-slug: domain\nid: 287ec2ff-cd1d-5c3a-97d9-8fea6a6a90ca\n"

const CLEARED: Kept = { kind: "cleared" }

const value = (raw: Raw | readonly Raw[]): Kept => ({ kind: "value", raw })

const textOf = (front: Front): string => {
  if (front.kind !== "text") throw new Error(front.why)
  return front.text
}

const whyOf = (front: Front): string => {
  if (front.kind !== "refused") throw new Error(front.text)
  return front.why
}

const pageOf = (key: string, kept: Kept): string =>
  textOf(frontOf({ pageType: "domain", id: AT, entries: [[key, kept]], body: "" }))

const statedOf = (text: string): Stated => {
  const root = mkdtempSync("/var/tmp/pages-system-front-")
  try {
    writeFileSync(`${root}/one.domain.md`, text)
    const stated = statedAt(root, "one.domain.md")
    if (typeof stated === "string") throw new Error(stated)
    return stated
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

describe("what stands at the head of a page", () => {
  it("states the page type, then the id, then the sequence number", () => {
    const front = frontOf({
      pageType: "domain",
      id: AT,
      seq: 7,
      entries: [["title", value("Test")]],
      body: "\n# Definition\n",
    })
    expect(textOf(front)).toBe(`${HEAD}seq: 7\ntitle: Test\n---\n\n# Definition\n`)
  })

  it("leaves the sequence number out where none is given", () => {
    const front = frontOf({ pageType: "domain", id: AT, entries: [], body: "" })
    expect(textOf(front)).toBe(`${HEAD}---\n`)
  })

  it("synthesises the page type rather than taking one that was given", () => {
    const front = frontOf({
      pageType: "domain",
      id: AT,
      entries: [["page-type-slug", value("seat")]],
      body: "",
    })
    expect(whyOf(front)).toContain("page-type-slug")
  })

  it("refuses an id or a sequence number given among the rest, each having its own place", () => {
    const one = frontOf({ pageType: "domain", id: AT, entries: [["id", value("x")]], body: "" })
    const other = frontOf({ pageType: "domain", id: AT, entries: [["seq", value(2)]], body: "" })
    expect(whyOf(one)).toContain("id")
    expect(whyOf(other)).toContain("seq")
  })
})

describe("which keys reach the page", () => {
  it("keeps every remaining key in the order it was given", () => {
    const front = frontOf({
      pageType: "domain",
      id: AT,
      entries: [
        ["zeal", value("one")],
        ["abbot", value("two")],
      ],
      body: "",
    })
    expect(textOf(front)).toBe(`${HEAD}zeal: one\nabbot: two\n---\n`)
  })

  it("leaves a cleared key out of the page entirely", () => {
    const front = frontOf({
      pageType: "domain",
      id: AT,
      entries: [
        ["title", value("Test")],
        ["settled", CLEARED],
        ["slug", value("test")],
      ],
      body: "",
    })
    expect(textOf(front)).toBe(`${HEAD}title: Test\nslug: test\n---\n`)
  })

  it("refuses the whole page for one refused key, carrying its reason unchanged", () => {
    const given = "is declared a list and was given text"
    const front = frontOf({
      pageType: "domain",
      id: AT,
      entries: [
        ["title", value("Test")],
        ["sequence-slugs", { kind: "refused", why: given }],
      ],
      body: "",
    })
    expect(whyOf(front)).toBe(given)
  })
})

describe("how a scalar is spelled", () => {
  it("states a run of characters bare where nothing but text could be read from it", () => {
    expect(pageOf("title", value("Test"))).toBe(`${HEAD}title: Test\n---\n`)
    expect(pageOf("path", value("reminder set"))).toBe(`${HEAD}path: reminder set\n---\n`)
    expect(pageOf("slug", value("domain/one"))).toBe(`${HEAD}slug: domain/one\n---\n`)
    expect(pageOf("day", value("2026-08-27"))).toBe(`${HEAD}day: 2026-08-27\n---\n`)
    expect(pageOf("held", value("019ffe30-e158-7000-8ab9-73591dbe0225"))).toBe(
      `${HEAD}held: 019ffe30-e158-7000-8ab9-73591dbe0225\n---\n`
    )
  })

  it("quotes a run of characters YAML would read as something other than text", () => {
    expect(pageOf("title", value("true"))).toBe(`${HEAD}title: "true"\n---\n`)
    expect(pageOf("title", value("null"))).toBe(`${HEAD}title: "null"\n---\n`)
    expect(pageOf("title", value("12"))).toBe(`${HEAD}title: "12"\n---\n`)
    expect(pageOf("title", value("1.5e3"))).toBe(`${HEAD}title: "1.5e3"\n---\n`)
    expect(pageOf("title", value("0x1F"))).toBe(`${HEAD}title: "0x1F"\n---\n`)
  })

  it("quotes a run of characters a plain scalar could not carry", () => {
    expect(pageOf("title", value(""))).toBe(`${HEAD}title: ""\n---\n`)
    expect(pageOf("title", value("one: two"))).toBe(`${HEAD}title: "one: two"\n---\n`)
    expect(pageOf("title", value(" pad "))).toBe(`${HEAD}title: " pad "\n---\n`)
    expect(pageOf("title", value("# one"))).toBe(`${HEAD}title: "# one"\n---\n`)
    expect(pageOf("title", value("-one"))).toBe(`${HEAD}title: "-one"\n---\n`)
    expect(pageOf("title", value("two\nlines"))).toBe(`${HEAD}title: "two\\nlines"\n---\n`)
  })

  it("states a number and a boolean under the spelling YAML reads them back by", () => {
    expect(pageOf("weight", value(7))).toBe(`${HEAD}weight: 7\n---\n`)
    expect(pageOf("weight", value(1.5))).toBe(`${HEAD}weight: 1.5\n---\n`)
    expect(pageOf("settled", value(true))).toBe(`${HEAD}settled: true\n---\n`)
    expect(pageOf("settled", value(false))).toBe(`${HEAD}settled: false\n---\n`)
  })

  it("refuses a number no page can state rather than writing it back as text", () => {
    const front = frontOf({
      pageType: "domain",
      id: AT,
      entries: [["weight", value(Number.NaN)]],
      body: "",
    })
    expect(whyOf(front)).toContain("weight")
  })
})

describe("how a list is spelled", () => {
  it("states each item on a line of its own", () => {
    expect(pageOf("sequence-slugs", value(["domain/one", "domain/two"]))).toBe(
      `${HEAD}sequence-slugs:\n  - domain/one\n  - domain/two\n---\n`
    )
  })

  it("states an empty list in the one spelling a list has when it has no items", () => {
    expect(pageOf("sequence-slugs", value([]))).toBe(`${HEAD}sequence-slugs: []\n---\n`)
  })

  it("refuses a list holding a number no page can state", () => {
    const front = frontOf({
      pageType: "domain",
      id: AT,
      entries: [["weights", value([1, Number.POSITIVE_INFINITY])]],
      body: "",
    })
    expect(whyOf(front)).toContain("weights")
  })
})

describe("what the read side gets back", () => {
  it("reads an empty list back as an empty list, which no absent key is", () => {
    const stated = statedOf(pageOf("sequence-slugs", value([])))
    expect("sequence-slugs" in stated).toBe(true)
    expect(Array.isArray(stated["sequence-slugs"])).toBe(true)
    expect(stated["sequence-slugs"]).toEqual([])
  })

  it("reads a cleared key back as no key at all, which no empty list is", () => {
    const stated = statedOf(pageOf("sequence-slugs", CLEARED))
    expect("sequence-slugs" in stated).toBe(false)
  })

  it("reads every value back as the value it was given", () => {
    const front = frontOf({
      pageType: "domain",
      id: AT,
      seq: 7,
      entries: [
        ["title", value("Test")],
        ["settled", value(true)],
        ["weight", value(1.5)],
        ["quoted", value("true")],
        ["day", value("2026-08-27")],
        ["blank", value("")],
        ["sequence-slugs", value(["domain/one", "domain/two"])],
        ["required-reading-slugs", value([])],
      ],
      body: "\n# Definition\n",
    })
    expect(statedOf(textOf(front))).toEqual({
      "page-type-slug": "domain",
      id: AT,
      seq: 7,
      title: "Test",
      settled: true,
      weight: 1.5,
      quoted: "true",
      day: "2026-08-27",
      blank: "",
      "sequence-slugs": ["domain/one", "domain/two"],
      "required-reading-slugs": [],
    })
  })

  it("keeps the body after the frontmatter word for word", () => {
    const body = "\n# Definition\n\n- **Test** — a line with --- inside it.\n"
    const front = frontOf({ pageType: "domain", id: AT, entries: [], body })
    expect(textOf(front)).toBe(`${HEAD}---\n${body}`)
    expect(statedOf(textOf(front))).toEqual({ "page-type-slug": "domain", id: AT })
  })
})
