import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import { shadowFor } from "@akasha/pages-system/shadow"
import { bytesOf } from "@akasha/testing-system/bodying"
import {
  declaring,
  filing,
  founded,
  landing,
  pathFor,
  put,
  typed,
} from "../../../modules/check-scratch/check-scratch.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { emailAddressIsWellFormed } from "./email-address-is-well-formed.code-check.code.ts"

const ADDRESS = "email-address-property"

const TEXT = "text-property"

const HELD = "held"

const ONE = "01a058ff-0000-7001-8000-000000000001"

const DOMAIN = "@example.com"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-address-")
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

function bodyFor(kind: string, stated: Record<string, unknown>): string {
  return `export const one = ${JSON.stringify({ id: ONE, pageTypeSlug: kind, slug: "one", ...stated })}\n`
}

function judged(root: string, kind: string, stated: Record<string, unknown>): readonly Judged[] {
  const at = pathFor(kind, "one")
  filing(root, kind, "one", ONE)
  const change = landing(root, { [at]: put(root, at, bytesOf(bodyFor(kind, stated))) })
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return emailAddressIsWellFormed(change, cast.shadow)
}

function judging(said: string): readonly Judged[] {
  return judged(rooted(), HELD, { emailAddress: said })
}

test("an address written in lowercase with one `@` is let through", () => {
  expect(judging(`ada${DOMAIN}`)).toEqual([])
})

test("an address holding a capital is refused for its case", () => {
  const said = judging(`Ada${DOMAIN}`)

  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("written in lowercase")
})

test("an address holding no `@` is refused, and the refusal says how many it holds", () => {
  const said = judging("ada.example.com")

  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("holds 0 `@`")
})

test("an address holding two `@` is refused", () => {
  const said = judging(`ada@ada${DOMAIN}`)

  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("holds 2 `@`")
})

test("an address stating no mailbox before the `@` is refused", () => {
  const said = judging(DOMAIN)

  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("no mailbox")
})

test("an address stating no domain after the `@` is refused", () => {
  const said = judging("ada@")

  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("no domain")
})

test("an address of 254 characters is let through", () => {
  expect(judging(`${"a".repeat(254 - DOMAIN.length)}${DOMAIN}`)).toEqual([])
})

test("an address of 255 characters is refused for its length", () => {
  const said = judging(`${"a".repeat(255 - DOMAIN.length)}${DOMAIN}`)

  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("an address of 255 characters")
})

test("an address too long is refused for its length rather than for its case", () => {
  const said = judging(`${"A".repeat(255 - DOMAIN.length)}${DOMAIN}`)

  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("255 characters")
})

test("a mailbox tagged after `+` is let through", () => {
  expect(judging(`ada+akasha${DOMAIN}`)).toEqual([])
})

test("a page stating no address is passed over", () => {
  expect(judged(rooted(), HELD, {})).toEqual([])
})

test("a value under a key that is no address is passed over", () => {
  expect(judged(rooted(), "named", { nickname: `Ada${DOMAIN}` })).toEqual([])
})

test("the refusal names the property the address is stated under", () => {
  const said = judging(`Ada${DOMAIN}`)

  expect(said[0]?.reason).toContain("`email-address`")
})

test("the refusal names the page the address stands on", () => {
  const said = judging(`Ada${DOMAIN}`)

  expect(said[0]?.path).toBe(pathFor(HELD, "one"))
})

test("a value stated as a list is judged address by address", () => {
  const said = judged(rooted(), HELD, {
    emailAddress: [`ada${DOMAIN}`, `Ada${DOMAIN}`, "ada.example.com"],
  })

  expect(said).toHaveLength(2)
})

test("a key held by a page type standing under `email-address-property` is judged too", () => {
  const root = rooted()
  typed(root, "work-address-property", ADDRESS)
  declaring(root, "work-address", { pageTypeSlug: "work-address-property" })
  typed(root, "worker", "page", ["work-address"])
  const said = judged(root, "worker", { workAddress: `Ada${DOMAIN}` })

  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`work-address`")
})

test("a change carrying no page is judged without reading a page type", () => {
  const root = rooted()
  const change = landing(root, {})
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)

  expect(emailAddressIsWellFormed(change, cast.shadow)).toEqual([])
})
