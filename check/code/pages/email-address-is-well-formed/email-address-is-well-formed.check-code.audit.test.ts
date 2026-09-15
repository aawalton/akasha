import { afterAll, expect, test } from "bun:test"
import { emailAddressIsWellFormed } from "akasha/check/code/pages/email-address-is-well-formed/email-address-is-well-formed.check-code.audit.code.ts"
import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import {
  claiming,
  declaring,
  founded,
  pathFor,
  put,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { valueAlsoFiled } from "akasha/page/index/modules/filing/index-filing.module.code.ts"

const ADDRESS = "email-address-property"

const HELD = "held"

const ONE = "01a058ff-0000-7001-8000-000000000002"

const DOMAIN = "@example.com"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-address-audit-")
  founded(root)
  typed(root, "page-type", "page")
  typed(root, "domain", "page")
  typed(root, "page-property", "domain")
  typed(root, ADDRESS, "page-property")
  declaring(root, "email-address", { pageTypeSlug: ADDRESS })
  typed(root, HELD, "page", ["email-address"])
  return root
}

function heldFor(slug: string, stated: Record<string, unknown>): Record<string, unknown> {
  return { id: ONE, pageTypeSlug: HELD, slug, ...stated }
}

function holding(
  root: string,
  slug: string,
  stated: Record<string, unknown>,
  filed = true
): string {
  const at = pathFor(HELD, slug)
  const value = heldFor(slug, stated)
  put(root, at, bytesOf(`export const one = ${JSON.stringify(value)}\n`))
  if (!filed) return at
  claiming(root, at, ONE)
  valueAlsoFiled(root, HELD, [{ path: at, value }])
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
