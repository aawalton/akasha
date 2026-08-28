import { describe, expect, it } from "bun:test"
import { pageStem, STEM_CEILING } from "../../../named-for/named-for.ts"
import { constantHolesIn, filledName, nameForNew, refuseTakenName } from "./file-name"
import { FileWriteError } from "./file-write-error"

describe("pageStem", () => {
  it("leaves a name that is already a slug exactly as it stands", () => {
    expect(pageStem("push-pull-legs")).toBe("push-pull-legs")
  })

  it("carries a title across, so a page named for one lands somewhere readable", () => {
    expect(pageStem("Gingerbread & Coffee")).toBe("gingerbread-coffee")
  })

  it("folds a diacritic and an apostrophe rather than spelling them as breaks", () => {
    expect(pageStem("Alan's Café")).toBe("alans-cafe")
  })

  it("bounds the stem, leaving room for the suffix that separates two of them", () => {
    expect(pageStem("a".repeat(200))).toHaveLength(STEM_CEILING)
  })

  it("never ends on the dash a cut fell in the middle of", () => {
    expect(pageStem(`${"a".repeat(STEM_CEILING - 1)} bbbb`).endsWith("-")).toBe(false)
  })
})

describe("filledName", () => {
  it("fills every hole from the values the write states", () => {
    expect(filledName("{persona-slug}-{slug}", { "persona-slug": "amy", slug: "rest" })).toEqual({
      ok: true,
      stem: "amy-rest",
    })
  })

  it("fills a hole from a number, because a seq names a page as well as a word does", () => {
    expect(filledName("{seq}", { seq: 12 })).toEqual({ ok: true, stem: "12" })
  })

  it("names the keys it wanted when a hole goes unfilled, rather than naming nothing", () => {
    expect(filledName("{date}-{title}", { date: "2026-08-20" })).toEqual({
      ok: false,
      holes: ["title"],
    })
  })

  it("treats a blank value as unfilled, so a page is never named for an empty string", () => {
    expect(filledName("{slug}", { slug: "   " })).toEqual({ ok: false, holes: ["slug"] })
  })
})

describe("constantHolesIn", () => {
  it("names a hole the row settles, whose value is the same on every page of the type", () => {
    expect(constantHolesIn("{seq}")).toEqual(["seq"])
    expect(constantHolesIn("{user-id}")).toEqual(["user-id"])
  })

  it("names the constant hole inside a rule whose other holes are the page's own", () => {
    expect(constantHolesIn("{persona-slug}-{page-type-slug}")).toEqual(["page-type-slug"])
  })

  it("names none where every hole is a key the page states, which is the control", () => {
    expect(constantHolesIn("{slug}")).toEqual([])
    expect(constantHolesIn("{build-name}")).toEqual([])
    expect(constantHolesIn("{created-at}-{slug}")).toEqual([])
    expect(constantHolesIn("{persona-slug}-l{relationship-level}-{eso-day}")).toEqual([])
  })
})

describe("nameForNew", () => {
  const named = (namedFor: string | null, values: Record<string, string | number>) =>
    nameForNew("createPage", "thing", undefined, values, undefined, namedFor)

  it("takes a stated name ahead of the rule, because it addresses one page", () => {
    expect(nameForNew("createPage", "thing", " stew ", {}, undefined, "{title}")).toEqual({
      stated: true,
      name: "stew",
    })
  })

  it("takes the write's slug ahead of the rule, for the same reason", () => {
    expect(named("{title}", { slug: "stew", title: "Beef Stew" })).toEqual({
      stated: true,
      name: "stew",
    })
  })

  it("fills the rule where the write states neither, and that stem is the whole name", () => {
    expect(named("{persona-slug}-anchor", { "persona-slug": "amy" })).toEqual({
      stated: false,
      stem: "amy-anchor",
    })
  })

  it("refuses a rule naming a key the row settles, which would name every page alike", () => {
    expect(() => named("{seq}", { seq: 5616 })).toThrow(FileWriteError)
    expect(() => named("{seq}", { seq: 5616 })).toThrow(/carries no `seq` of its own/)
  })

  it("refuses that rule even where the write hands it a value, since the reader drops it", () => {
    expect(() => named("{seq}", { seq: 0 })).toThrow(FileWriteError)
  })

  it("does not refuse a rule whose holes the page states, which is the control", () => {
    expect(named("{build-name}", { "build-name": "New Build" })).toEqual({
      stated: false,
      stem: "new-build",
    })
  })
})

describe("refuseTakenName", () => {
  it("refuses rather than filing a second page beside the first under a counter", () => {
    expect(() =>
      refuseTakenName(
        "createPage",
        "character-build",
        "{build-name}",
        "new-build",
        "`New Build`, id 019df354-9a74-74f8-b563-83f3ecaaa8f3"
      )
    ).toThrow(FileWriteError)
  })

  it("names the rule, the name it filled to, and the page already standing there", () => {
    try {
      refuseTakenName(
        "createPage",
        "character-build",
        "{build-name}",
        "new-build",
        "`New Build`, id 019df354"
      )
      expect.unreachable()
    } catch (error) {
      if (!(error instanceof FileWriteError)) throw error
      const why = error.message
      expect(why).toContain("{build-name}")
      expect(why).toContain("new-build")
      expect(why).toContain("019df354")
      expect(why).toContain("new-build-2")
    }
  })
})

describe("two pages one rule fills alike", () => {
  const BUILDS = [
    { "build-name": "New Build", "build-hash": "ATQHgAAAAAAf_4AAA" },
    { "build-name": "New Build", "build-hash": "ATQHgAAAAABgAAD__" },
  ]

  it("fills to one stem for both, which is what the counter used to hide", () => {
    const stems = BUILDS.map((one) => filledName("{build-name}", one))
    expect(stems).toEqual([
      { ok: true, stem: "new-build" },
      { ok: true, stem: "new-build" },
    ])
  })

  it("leaves the seam nothing that appends a counter to tell them apart", async () => {
    const seam = await import("./file-name")
    expect(Object.keys(seam)).not.toContain("freeName")
  })
})
