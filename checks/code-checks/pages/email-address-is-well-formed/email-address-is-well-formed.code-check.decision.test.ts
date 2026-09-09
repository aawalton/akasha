import { afterAll, expect, test } from "bun:test"
import { shadowAt } from "@akasha/pages/shadow"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { declaring, founded, typed } from "../../../modules/scratch/check-scratch.module.code.ts"
import {
  ADDRESS,
  type Keying,
  keyingIn,
  reasonsIn,
  whyRefused,
} from "./email-address-is-well-formed.code-check.decision.code.ts"

const TEXT = "text-property"

const HELD = "held"

const AT = "akasha/one.held.ts"

const DOMAIN = "@example.com"

const TAB = String.fromCodePoint(9)

const LONGEST = 254

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-address-decision-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "page-property", "domain")
  typed(root, TEXT, "page-property")
  typed(root, ADDRESS, "page-property")
  declaring(root, "email-address", { pageTypeSlug: ADDRESS })
  declaring(root, "nickname", { pageTypeSlug: TEXT })
  typed(root, HELD, "page", ["email-address"])
  typed(root, "named", "page", ["nickname"])
  return root
}

const keying: Keying = (pageTypeSlug) =>
  pageTypeSlug === HELD ? [{ propertySlug: "email-address", key: "emailAddress" }] : []

function why(said: string): string | null {
  return whyRefused("email-address", said)
}

test("an address written in lowercase with one `@` is let through", () => {
  expect(why(`ada${DOMAIN}`)).toBe(null)
})

test("an address holding a capital is refused for its case", () => {
  expect(why(`Ada${DOMAIN}`)).toContain("written in lowercase")
})

test("an address holding no `@` is refused, and the refusal says how many it holds", () => {
  expect(why("ada.example.com")).toContain("holds 0 `@`")
})

test("an address holding two `@` is refused", () => {
  expect(why(`ada@ada${DOMAIN}`)).toContain("holds 2 `@`")
})

test("an address stating no mailbox before the `@` is refused", () => {
  expect(why(DOMAIN)).toContain("no mailbox")
})

test("an address stating no domain after the `@` is refused", () => {
  expect(why("ada@")).toContain("no domain")
})

test("an address padded before the mailbox or after the domain is refused", () => {
  expect(why(` ada${DOMAIN}`)).toContain("holds whitespace")
  expect(why(`ada${DOMAIN} `)).toContain("holds whitespace")
})

test("an address holding a space inside the mailbox is refused", () => {
  expect(why(`ada ada${DOMAIN}`)).toContain("holds whitespace")
})

test("an address holding a tab is refused", () => {
  expect(why(`ada${TAB}${DOMAIN}`)).toContain("holds whitespace")
})

test("a padded address is refused for its whitespace rather than for its case", () => {
  expect(why(` Ada${DOMAIN}`)).toContain("holds whitespace")
})

test("an address of 254 characters is let through", () => {
  expect(why(`${"a".repeat(LONGEST - DOMAIN.length)}${DOMAIN}`)).toBe(null)
})

test("an address of 255 characters is refused for its length", () => {
  expect(why(`${"a".repeat(LONGEST + 1 - DOMAIN.length)}${DOMAIN}`)).toContain(
    "an address of 255 characters"
  )
})

test("an address too long is refused for its length rather than for its case", () => {
  expect(why(`${"A".repeat(LONGEST + 1 - DOMAIN.length)}${DOMAIN}`)).toContain("255 characters")
})

test("a mailbox tagged after `+` is let through", () => {
  expect(why(`ada+akasha${DOMAIN}`)).toBe(null)
})

test("the refusal names the property the address is stated under", () => {
  expect(why(`Ada${DOMAIN}`)).toContain("`email-address`")
})

test("the refusal names the page the address is on", () => {
  const said = reasonsIn(AT, { type: HELD, emailAddress: `Ada${DOMAIN}` }, keying)
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(AT)
})

test("a page stating no address is passed over", () => {
  expect(reasonsIn(AT, { type: HELD }, keying)).toEqual([])
})

test("a value under a key that is no address is passed over", () => {
  expect(reasonsIn(AT, { type: "named", nickname: `Ada${DOMAIN}` }, keying)).toEqual([])
})

test("a page naming no page type of its own is passed over", () => {
  expect(reasonsIn(AT, { emailAddress: `Ada${DOMAIN}` }, keying)).toEqual([])
})

test("a page stating the older page type key is judged too", () => {
  const said = reasonsIn(AT, { pageTypeSlug: HELD, emailAddress: `Ada${DOMAIN}` }, keying)
  expect(said).toHaveLength(1)
})

test("a value stated as a list is judged address by address", () => {
  const stated = [`ada${DOMAIN}`, `Ada${DOMAIN}`, "ada.example.com"]
  expect(reasonsIn(AT, { type: HELD, emailAddress: stated }, keying)).toHaveLength(2)
})

test("the keys judged are the ones the index holds under an address property", () => {
  const root = rooted()
  const keyed = keyingIn(shadowAt(root).index.kindsUnder(ADDRESS), shadowAt(root))
  expect(keyed(HELD)).toEqual([{ propertySlug: "email-address", key: "emailAddress" }])
  expect(keyed("named")).toEqual([])
})

test("a key held by a page type under `email-address-property` is judged too", () => {
  const root = rooted()
  typed(root, "work-address-property", ADDRESS)
  declaring(root, "work-address", { pageTypeSlug: "work-address-property" })
  typed(root, "worker", "page", ["work-address"])
  const shadow = shadowAt(root)
  const keyed = keyingIn(shadow.index.kindsUnder(ADDRESS), shadow)
  expect(keyed("worker")).toEqual([{ propertySlug: "work-address", key: "workAddress" }])
})
