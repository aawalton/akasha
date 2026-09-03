import { expect, test } from "bun:test"
import {
  idsForTokens,
  RELATIONSHIP,
  relationshipsFor,
  relationshipsIn,
  saidEachFor,
  tokensIn,
  VALUED,
} from "./session-rows.module.code.ts"

const ROOT = "/var/home/walton/repos/akasha"

const JENNIFER = "019db533-f382-757e-93d6-8b217ef99d58"
const LIZZY = "019db533-f382-77f7-87ea-7cf70e32924a"
const RYAN = "019db533-f385-70d7-9034-c413dae12bfa"

const PAGES = [
  { id: JENNIFER, title: "Jennifer Walton" },
  { id: LIZZY, title: "Lizzy Walton" },
  { id: RYAN, title: "Ryan Seamons" },
  { id: "019db533-f382-7d48-88b3-04af42840eee", title: "Dan Sikora" },
  { id: "019db533-f383-7e5a-99ae-eba181a0e833", title: "Dan Sikora" },
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
  expect(relationshipsFor(["--title", "Reading"], ROOT)).toBe(null)
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
