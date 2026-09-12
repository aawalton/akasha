import { afterAll, expect, test } from "bun:test"
import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { instantPropertySlugClosesWithAt } from "akasha/checks/code-checks/pages/instant-property-slug-closes-with-at/instant-property-slug-closes-with-at.code-check.audit.code.ts"
import {
  founded,
  put,
  treed,
  typed,
} from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const INSTANT = "instant-property"

const STAMPED = "stamped-property"

const AT = "akasha/created.instant-property.ts"

const CLOSING_AT = "akasha/updated-at.instant-property.ts"

const STAMPED_AT = "akasha/made.stamped-property.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function body(pageTypeSlug: string, slug: string): Uint8Array {
  return bytesOf(
    `export const held = {\n  pageTypeSlug: "${pageTypeSlug}",\n  slug: "${slug}",\n} as const\n`
  )
}

function rooted(): string {
  const root = scratch.rootFor("akasha-instant-audit-")
  founded(root)
  typed(root, INSTANT, "page")
  typed(root, STAMPED, INSTANT)
  mkdirSync(join(root, "akasha"), { recursive: true })
  return root
}

test("an audit judges every instant property in the tree, no change naming any of them", () => {
  const root = rooted()
  put(root, AT, body(INSTANT, "created"))
  put(root, CLOSING_AT, body(INSTANT, "updated-at"))
  const said = instantPropertySlugClosesWithAt(treed(root))
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("names itself `created`")
})

test("an audit reads the page types under `instant-property` from the tree's own index", () => {
  const root = rooted()
  put(root, STAMPED_AT, body(STAMPED, "made"))
  const said = instantPropertySlugClosesWithAt(treed(root))
  expect(said.map((one) => one.path)).toEqual([STAMPED_AT])
  expect(said[0]?.reason).toContain(`\`${STAMPED}\``)
})
