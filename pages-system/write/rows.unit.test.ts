import { describe, expect, it } from "bun:test"
import { rowsIn } from "../read/rows.ts"
import { type Composed, type Standing, nameOf, rowsWith, rowsWithout } from "./rows.ts"

const NONE: Standing = { kind: "none" }

const standing = (text: string): Standing => ({ kind: "standing", text })

const textOf = (composed: Composed): string =>
  composed.kind === "composed" ? composed.text : composed.why

const whyOf = (composed: Composed): string => (composed.kind === "refused" ? composed.why : "")

const namesIn = (text: string): readonly string[] => {
  const found: string[] = []
  for (const row of rowsIn("pages/thing/one.thing.rows.jsonl", text, "one")) {
    found.push("unread" in row ? row.unread : row.name)
  }
  return found
}

describe("nameOf", () => {
  it("names a row by the slug it states", () => {
    expect(nameOf({ slug: "morning", id: "one" })).toBe("morning")
  })

  it("names a row by its id where it states no slug", () => {
    expect(nameOf({ id: "one", note: "up" })).toBe("one")
  })

  it("gives a row stating neither a slug nor an id no name", () => {
    expect(nameOf({ note: "up" })).toBe(null)
  })

  it("falls to the id where the slug is blank", () => {
    expect(nameOf({ slug: "   ", id: "one" })).toBe("one")
  })

  it("takes the name without the space around it", () => {
    expect(nameOf({ slug: " morning " })).toBe("morning")
  })

  it("gives a row whose id is a number no name", () => {
    expect(nameOf({ id: 7 })).toBe(null)
  })
})

describe("rowsWith", () => {
  it("writes one line for a row, ended by a break", () => {
    expect(textOf(rowsWith(NONE, [{ slug: "morning", note: "up" }]))).toBe(
      `{"slug":"morning","note":"up"}\n`
    )
  })

  it("writes nothing where there is no file and no row", () => {
    expect(textOf(rowsWith(NONE, []))).toBe("")
  })

  it("writes into a file standing empty as into no file at all", () => {
    expect(textOf(rowsWith(standing(""), [{ slug: "a" }]))).toBe(`{"slug":"a"}\n`)
  })

  it("replaces a standing row where it stands", () => {
    const held = standing(`{"slug":"a"}\n{"slug":"b"}\n{"slug":"c"}\n`)
    expect(textOf(rowsWith(held, [{ slug: "b", note: "new" }]))).toBe(
      `{"slug":"a"}\n{"slug":"b","note":"new"}\n{"slug":"c"}\n`
    )
  })

  it("appends a row no standing row names, in the order given", () => {
    const held = standing(`{"slug":"a"}\n`)
    expect(textOf(rowsWith(held, [{ slug: "c" }, { slug: "b" }]))).toBe(
      `{"slug":"a"}\n{"slug":"c"}\n{"slug":"b"}\n`
    )
  })

  it("replaces and appends in one go", () => {
    const held = standing(`{"slug":"a"}\n{"slug":"b"}\n`)
    expect(textOf(rowsWith(held, [{ slug: "b", note: "x" }, { slug: "c" }]))).toBe(
      `{"slug":"a"}\n{"slug":"b","note":"x"}\n{"slug":"c"}\n`
    )
  })

  it("matches a standing row by the id it states", () => {
    const held = standing(`{"id":"one","note":"up"}\n`)
    expect(textOf(rowsWith(held, [{ id: "one", note: "down" }]))).toBe(
      `{"id":"one","note":"down"}\n`
    )
  })

  it("matches by slug rather than by id", () => {
    const held = standing(`{"id":"one","slug":"a"}\n`)
    expect(textOf(rowsWith(held, [{ slug: "a", id: "two" }]))).toBe(`{"slug":"a","id":"two"}\n`)
  })

  it("appends a row naming nothing rather than matching it to one", () => {
    const held = standing(`{"note":"up"}\n`)
    expect(textOf(rowsWith(held, [{ note: "down" }]))).toBe(`{"note":"up"}\n{"note":"down"}\n`)
  })

  it("leaves a standing line as it stands where nothing replaces it", () => {
    const held = standing(`{"note":"up","slug":"a"}\n`)
    expect(textOf(rowsWith(held, [{ slug: "b" }]))).toBe(
      `{"note":"up","slug":"a"}\n{"slug":"b"}\n`
    )
  })

  it("holds the last row of a file ending without a break", () => {
    const held = standing(`{"slug":"a"}\n{"slug":"b"}`)
    expect(textOf(rowsWith(held, [{ slug: "b", note: "x" }]))).toBe(
      `{"slug":"a"}\n{"slug":"b","note":"x"}\n`
    )
  })

  it("drops a blank line rather than carrying it", () => {
    const held = standing(`{"slug":"a"}\n\n{"slug":"b"}\n`)
    expect(textOf(rowsWith(held, []))).toBe(`{"slug":"a"}\n{"slug":"b"}\n`)
  })

  it("treats two standing rows naming nothing as two rows and not as one", () => {
    const held = standing(`{"note":"up"}\n{"note":"down"}\n`)
    expect(textOf(rowsWith(held, []))).toBe(`{"note":"up"}\n{"note":"down"}\n`)
  })

  it("refuses a standing file naming one row twice, naming the row", () => {
    const held = standing(`{"slug":"a"}\n{"slug":"a","note":"second"}\n`)
    const composed = rowsWith(held, [{ slug: "a", note: "new" }])
    expect(composed.kind).toBe("refused")
    expect(whyOf(composed)).toContain("a")
    expect(whyOf(composed)).toContain("line 2")
  })

  it("refuses a standing file naming one row twice even when writing another", () => {
    const held = standing(`{"slug":"a"}\n{"slug":"a"}\n`)
    expect(rowsWith(held, [{ slug: "z" }]).kind).toBe("refused")
  })

  it("refuses a malformed line rather than reading the file as empty", () => {
    const held = standing(`{"slug":"a"}\nnot json at all\n`)
    const composed = rowsWith(held, [{ slug: "b" }])
    expect(composed.kind).toBe("refused")
    expect(whyOf(composed)).toContain("line 2")
    expect(whyOf(composed)).toContain("not json at all")
  })

  it("refuses a standing line holding an array, an array naming no row", () => {
    expect(rowsWith(standing(`[1,2]\n`), []).kind).toBe("refused")
  })

  it("refuses a standing line holding a bare value", () => {
    expect(rowsWith(standing(`7\n`), []).kind).toBe("refused")
  })

  it("refuses what could not be read, naming why", () => {
    const composed = rowsWith({ kind: "unreadable", why: "it is not UTF-8 text" }, [{ slug: "a" }])
    expect(composed.kind).toBe("refused")
    expect(whyOf(composed)).toContain("it is not UTF-8 text")
  })

  it("refuses one name given twice in one go, naming it", () => {
    const composed = rowsWith(NONE, [{ slug: "a", note: "1" }, { slug: "a", note: "2" }])
    expect(composed.kind).toBe("refused")
    expect(whyOf(composed)).toContain("a")
  })
})

describe("rowsWithout", () => {
  it("takes the row away, keeping the rest in order", () => {
    const held = standing(`{"slug":"a"}\n{"slug":"b"}\n{"slug":"c"}\n`)
    expect(textOf(rowsWithout(held, "b"))).toBe(`{"slug":"a"}\n{"slug":"c"}\n`)
  })

  it("leaves nothing where it takes the only row away", () => {
    expect(textOf(rowsWithout(standing(`{"slug":"a"}\n`), "a"))).toBe("")
  })

  it("takes away a row named by the id it states", () => {
    const held = standing(`{"id":"one"}\n{"slug":"b"}\n`)
    expect(textOf(rowsWithout(held, "one"))).toBe(`{"slug":"b"}\n`)
  })

  it("leaves a row naming nothing where it stands", () => {
    const held = standing(`{"note":"up"}\n{"slug":"a"}\n`)
    expect(textOf(rowsWithout(held, "a"))).toBe(`{"note":"up"}\n`)
  })

  it("refuses a name no row stands under, naming it", () => {
    const composed = rowsWithout(standing(`{"slug":"a"}\n`), "b")
    expect(composed.kind).toBe("refused")
    expect(whyOf(composed)).toContain("b")
  })

  it("refuses where there is no file at all", () => {
    expect(rowsWithout(NONE, "a").kind).toBe("refused")
  })

  it("refuses a file naming one row twice rather than leaving a copy behind", () => {
    const held = standing(`{"slug":"a"}\n{"slug":"a"}\n`)
    const composed = rowsWithout(held, "a")
    expect(composed.kind).toBe("refused")
    expect(whyOf(composed)).toContain("a")
  })

  it("refuses a malformed line rather than reading the file as empty", () => {
    const held = standing(`nope\n{"slug":"a"}\n`)
    const composed = rowsWithout(held, "a")
    expect(composed.kind).toBe("refused")
    expect(whyOf(composed)).toContain("line 1")
  })

  it("refuses what could not be read, naming why", () => {
    const composed = rowsWithout({ kind: "unreadable", why: "the disk answered EIO" }, "a")
    expect(composed.kind).toBe("refused")
    expect(whyOf(composed)).toContain("the disk answered EIO")
  })
})

describe("what the reader makes of it", () => {
  it("reads back one page for each row written", () => {
    const composed = rowsWith(NONE, [{ slug: "a" }, { id: "b" }, { slug: "c", note: "up" }])
    expect(namesIn(textOf(composed))).toEqual(["a", "b", "c"])
  })

  it("reads back the standing rows and the new one together", () => {
    const held = standing(`{"slug":"a"}\n{"slug":"b"}\n`)
    const composed = rowsWith(held, [{ slug: "b", note: "x" }, { slug: "c" }])
    expect(textOf(composed)).toBe(`{"slug":"a"}\n{"slug":"b","note":"x"}\n{"slug":"c"}\n`)
    expect(namesIn(textOf(composed))).toEqual(["a", "b", "c"])
  })

  it("reads back a value carrying a break as one row", () => {
    const composed = rowsWith(NONE, [{ slug: "a", note: "one\ntwo" }])
    expect(textOf(composed)).toBe(`{"slug":"a","note":"one\\ntwo"}\n`)
    expect(namesIn(textOf(composed))).toEqual(["a"])
  })

  it("reads back what removal left", () => {
    const composed = rowsWithout(standing(`{"slug":"a"}\n{"slug":"b"}\n`), "a")
    expect(namesIn(textOf(composed))).toEqual(["b"])
  })
})
