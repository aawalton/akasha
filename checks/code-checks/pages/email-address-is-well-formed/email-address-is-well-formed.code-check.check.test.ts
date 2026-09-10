import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  declaring,
  filing,
  founded,
  landing,
  pathFor,
  put,
  typed,
} from "../../../modules/scratch/check-scratch.module.code.ts"
import { emailAddressIsWellFormed } from "./email-address-is-well-formed.code-check.check.code.ts"

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

test("a page the change carries is judged by what the decision answers", () => {
  const said = judged(rooted(), HELD, { emailAddress: `Ada${DOMAIN}` })

  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor(HELD, "one"))
  expect(said[0]?.reason).toContain("`email-address`")
})

test("a well-formed address the change carries is let through", () => {
  expect(judged(rooted(), HELD, { emailAddress: `ada${DOMAIN}` })).toEqual([])
})

test("a page whose keys are no address is passed over", () => {
  expect(judged(rooted(), "named", { nickname: `Ada${DOMAIN}` })).toEqual([])
})

test("a key held by a page type under `email-address-property` is judged too", () => {
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
