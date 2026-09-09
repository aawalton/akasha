import { afterAll, expect, test } from "bun:test"
import { bytesOf } from "@akasha/testing-system/bodying"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import {
  claiming,
  declaring,
  filing,
  founded,
  pathFor,
  put,
  typed,
} from "../../../modules/scratch/check-scratch.module.code.ts"
import { emailAddressIsWellFormed } from "./email-address-is-well-formed.code-check.audit.code.ts"

const ADDRESS = "email-address-property"

const HELD = "held"

const ONE = "01a058ff-0000-7001-8000-000000000002"

const DOMAIN = "@example.com"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-address-audit-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "page-property", "domain")
  typed(root, ADDRESS, "page-property")
  declaring(root, "email-address", { pageTypeSlug: ADDRESS })
  typed(root, HELD, "page", ["email-address"])
  return root
}

function bodyFor(slug: string, stated: Record<string, unknown>): string {
  const held = { id: ONE, pageTypeSlug: HELD, slug, ...stated }
  return `export const one = ${JSON.stringify(held)}\n`
}

function holding(
  root: string,
  slug: string,
  stated: Record<string, unknown>,
  filed = true
): string {
  const at = pathFor(HELD, slug)
  filing(root, HELD, slug, ONE)
  put(root, at, bytesOf(bodyFor(slug, stated)))
  if (filed) claiming(root, at, at, ONE)
  return at
}

test("an audit reads every page the index files rather than a change", () => {
  const root = rooted()
  const at = holding(root, "one", { emailAddress: `Ada${DOMAIN}` })
  const said = emailAddressIsWellFormed(root)
  expect(said.map((one) => one.path)).toEqual([at])
  expect(said[0]?.reason).toContain("written in lowercase")
})

test("an audit lets a well-formed address through", () => {
  const root = rooted()
  holding(root, "one", { emailAddress: `ada${DOMAIN}` })
  expect(emailAddressIsWellFormed(root)).toEqual([])
})

test("an audit lets a page stating no address through", () => {
  const root = rooted()
  holding(root, "one", {})
  expect(emailAddressIsWellFormed(root)).toEqual([])
})

test("an audit judges no page the index files no path for", () => {
  const root = rooted()
  holding(root, "one", { emailAddress: `ada${DOMAIN}` })
  holding(root, "two", { emailAddress: `Ada${DOMAIN}` }, false)
  expect(emailAddressIsWellFormed(root)).toEqual([])
})
