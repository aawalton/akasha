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

const PAGES = [
  { id: "019db533-f382-757e-93d6-8b217ef99d58", title: "Jen Walton" },
  { id: "019db533-f382-77f7-87ea-7cf70e32924a", title: "Aaron Ferris" },
  { id: "019db533-f382-777c-aa86-873204c877f7", title: "Aaron Ferris" },
]

function idsIn(argv: readonly string[]): readonly string[] {
  const read = idsForTokens(tokensIn(saidEachFor(argv, RELATIONSHIP)), PAGES)
  return read.read === "relationships" ? read.ids : []
}

test("the flag is one this command takes", () => {
  expect(VALUED).toContain(RELATIONSHIP)
})

test("a relationship said once is read", () => {
  expect(idsIn(["--relationship", "Jen Walton"])).toEqual(["019db533-f382-757e-93d6-8b217ef99d58"])
})

test("a relationship said by its id is read without a lookup", () => {
  const read = idsForTokens(["019db533-f382-757e-93d6-8b217ef99d58"], [])
  expect(read.read).toBe("relationships")
})

test("the flag said again names both", () => {
  expect(
    idsIn([
      "--relationship",
      "Jen Walton",
      "--relationship",
      "019db533-f385-70d7-9034-c413dae12bfa",
    ])
  ).toEqual(["019db533-f382-757e-93d6-8b217ef99d58", "019db533-f385-70d7-9034-c413dae12bfa"])
})

test("relationships parted by commas name each", () => {
  expect(idsIn(["--relationship", "Jen Walton,019db533-f385-70d7-9034-c413dae12bfa"])).toEqual([
    "019db533-f382-757e-93d6-8b217ef99d58",
    "019db533-f385-70d7-9034-c413dae12bfa",
  ])
})

test("one relationship named twice is written once", () => {
  expect(idsIn(["--relationship", "Jen Walton,Jen Walton"])).toEqual([
    "019db533-f382-757e-93d6-8b217ef99d58",
  ])
})

test("a title no relationship carries is refused", () => {
  const read = idsForTokens(["Nobody At All"], PAGES)
  expect(read.read).toBe("refused")
})

test("a title more than one relationship carries is refused", () => {
  const read = idsForTokens(["Aaron Ferris"], PAGES)
  expect(read.read).toBe("refused")
})

test("a uuid that is no version 7 is refused rather than written", () => {
  const read = idsForTokens(["019db533-f382-457e-93d6-8b217ef99d58"], PAGES)
  expect(read.read).toBe("refused")
})

test("the flag left unsaid reads as no tagging at all", () => {
  expect(relationshipsFor(["--title", "Reading"], ROOT)).toBe(null)
})

test("a flag whose value is another flag names no relationship", () => {
  expect(saidEachFor(["--relationship", "--json"], RELATIONSHIP)).toEqual([])
})

test("the relationship pages are read off the checkout", () => {
  const pages = relationshipsIn(ROOT)
  expect(pages.length).toBeGreaterThan(600)
  expect(pages.every((one) => one.id !== "" && one.title !== "")).toBe(true)
})
