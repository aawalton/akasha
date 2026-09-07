import { expect, test } from "bun:test"
import {
  aliasesIn,
  carriedIn,
  idsForTokens,
  matchedIn,
  RELATIONSHIP,
  relationshipsFor,
  relationshipsIn,
  saidEachFor,
  taggedFor,
  termOf,
  tokensIn,
  VALUED,
} from "./session-rows.module.code.ts"

const ROOT = "/var/home/walton/repos/akasha"

const JENNIFER = "019db533-f382-757e-93d6-8b217ef99d58"
const JOSEPH = "019db533-f382-777c-aa86-873204c877f7"
const LIZZY = "019db533-f382-77f7-87ea-7cf70e32924a"
const RYAN = "019db533-f385-70d7-9034-c413dae12bfa"
const PATRICK = "019db533-f382-75a1-877e-481e938e7964"

const PAGES = [
  { id: JENNIFER, title: "Jennifer Walton", aliases: ["Jen", "Jenny"] },
  { id: JOSEPH, title: "Joseph Walton", aliases: ["Joseph"] },
  { id: LIZZY, title: "Lizzy Walton", aliases: ["Lizzy", "Elizabeth"] },
  { id: RYAN, title: "Ryan Seamons", aliases: [] },
  { id: PATRICK, title: "Patrick + Marquie Walton", aliases: [] },
  { id: "019db533-f382-7d48-88b3-04af42840eee", title: "Dan Sikora", aliases: ["Dan"] },
  { id: "019db533-f383-7e5a-99ae-eba181a0e833", title: "Dan Sikora", aliases: ["Dan"] },
]

function idsIn(argv: readonly string[]): readonly string[] {
  const read = idsForTokens(tokensIn(saidEachFor(argv, RELATIONSHIP)), PAGES)
  return read.read === "relationships" ? read.ids : []
}

test("the flag is one this command takes", () => {
  expect(VALUED).toContain(RELATIONSHIP)
})

test("a relationship said by its title is read as its id", () => {
  expect(idsIn(["--relationship", "Jennifer Walton"])).toEqual([JENNIFER])
})

test("a title is read whatever its case", () => {
  expect(idsIn(["--relationship", "jennifer walton"])).toEqual([JENNIFER])
})

test("a relationship said by its id is read without a lookup", () => {
  const read = idsForTokens([JENNIFER], [])
  expect(read.read).toBe("relationships")
  expect(read.read === "relationships" ? read.ids : []).toEqual([JENNIFER])
})

test("the flag said again names both", () => {
  expect(idsIn(["--relationship", "Jennifer Walton", "--relationship", RYAN])).toEqual([
    JENNIFER,
    RYAN,
  ])
})

test("relationships parted by commas name each", () => {
  expect(idsIn(["--relationship", `Lizzy Walton, ${RYAN}`])).toEqual([LIZZY, RYAN])
})

test("one relationship named twice is written once", () => {
  expect(idsIn(["--relationship", `Jennifer Walton,${JENNIFER}`])).toEqual([JENNIFER])
})

test("a title no relationship carries is refused", () => {
  const read = idsForTokens(["Nobody At All"], PAGES)
  expect(read.read).toBe("refused")
})

test("a title more than one relationship carries is refused", () => {
  const read = idsForTokens(["Dan Sikora"], PAGES)
  expect(read.read).toBe("refused")
})

test("a uuid that is no version 7 is refused rather than written", () => {
  const read = idsForTokens(["019db533-f382-457e-93d6-8b217ef99d58"], PAGES)
  expect(read.read).toBe("refused")
})

test("every refusal is said rather than the first alone", () => {
  const read = idsForTokens(["Nobody At All", "Dan Sikora"], PAGES)
  expect(read.read === "refused" ? read.refusals.length : 0).toBe(2)
})

test("the flag left unsaid reads as no tagging at all", () => {
  expect(relationshipsFor(["--title", "Reading"], PAGES)).toBe(null)
})

test("the flag said with nothing after it names no relationship", () => {
  expect(saidEachFor(["--relationship", "--json"], RELATIONSHIP)).toEqual([])
  expect(saidEachFor(["--relationship"], RELATIONSHIP)).toEqual([])
})

test("the relationship pages are read off the checkout", () => {
  const pages = relationshipsIn(ROOT)
  expect(pages.length).toBeGreaterThan(600)
  expect(pages.every((one) => one.id !== "" && one.title !== "")).toBe(true)
  expect(pages.find((one) => one.id === JENNIFER)?.title).toBe("Jennifer Walton")
})

test("the aliases a relationship page carries are read off it too", () => {
  const pages = relationshipsIn(ROOT)
  expect(pages.find((one) => one.id === JENNIFER)?.aliases).toEqual(["Jen", "Jenny"])
  expect(pages.find((one) => one.id === LIZZY)?.aliases).toEqual(["Lizzy", "Elizabeth"])
  expect(pages.find((one) => one.id === RYAN)?.aliases).toEqual([])
})

test("a page carrying no aliases is read as carrying none", () => {
  expect(aliasesIn('  title: "Ryan Seamons",\n')).toEqual([])
})

test("a term is read without its case, its marks or its accents", () => {
  expect(termOf("Jen + Eat")).toBe("jen eat")
  expect(termOf("  Jenny's  ")).toBe("jenny s")
  expect(termOf("Zoë")).toBe("zoe")
})

test("a title carrying an alias is tagged with the relationship that alias names", () => {
  expect(matchedIn("Jen + Eat", PAGES)).toEqual([JENNIFER])
})

test("a title carrying two aliases is tagged with both", () => {
  expect(matchedIn("Jen + Joseph + Walk", PAGES)).toEqual([JENNIFER, JOSEPH].sort())
})

test("two aliases of one relationship tag it once", () => {
  expect(matchedIn("Jen and Jenny", PAGES)).toEqual([JENNIFER])
})

test("an alias two relationships carry tags neither", () => {
  expect(matchedIn("Dan + Pod", PAGES)).toEqual([])
})

test("an alias two relationships carry silences that alias alone", () => {
  expect(matchedIn("Dan + Jen", PAGES)).toEqual([JENNIFER])
})

test("a title carrying no alias is tagged with nothing", () => {
  expect(matchedIn("Projects", PAGES)).toEqual([])
})

test("a title is tagged whatever the case the alias is written in", () => {
  expect(matchedIn("JEN + EAT", PAGES)).toEqual([JENNIFER])
})

test("a relationship carrying no alias is never tagged by a title", () => {
  expect(matchedIn("Ryan + Pod", PAGES)).toEqual([])
})

test("a relationship the caller states is kept beside the one the title tags", () => {
  expect(taggedFor([PATRICK], "Jen + Patrick", [], PAGES)).toEqual([PATRICK, JENNIFER])
})

test("a relationship the caller states twice over the title is written once", () => {
  expect(taggedFor([JENNIFER], "Jen + Eat", [], PAGES)).toEqual([JENNIFER])
})

test("what a row already carries is kept where the caller states nothing", () => {
  expect(taggedFor(null, "Eat", [RYAN], PAGES)).toEqual([RYAN])
})

test("what the caller states replaces what the row carried", () => {
  expect(taggedFor([PATRICK], "Eat", [RYAN], PAGES)).toEqual([PATRICK])
})

test("a title tags on top of what the row already carried", () => {
  expect(taggedFor(null, "Jen + Eat", [RYAN], PAGES)).toEqual([RYAN, JENNIFER])
})

test("the relationships a row carries are read off it", () => {
  const row = { id: "a", title: "t", startTime: "s", dailyTracking: "d" }
  expect(carriedIn(row)).toEqual([])
  expect(carriedIn({ ...row, relationships: [JENNIFER, 3] })).toEqual([JENNIFER])
})
