import { afterAll, expect, test } from "bun:test"
import {
  foldedFor,
  type Judging,
  judgingBy,
} from "akasha/check/code/pages/property-sits-under-the-page-it-is-a-part-of/property-sits-under-the-page-it-is-a-part-of.check-code.decision.code.ts"
import {
  claiming,
  edging,
  founded,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const HELD = "01a0a7b1-0000-7001-8000-000000000001"

const OWNER = "01a0a7b1-0000-7002-8000-000000000002"

const OTHER = "01a0a7b1-0000-7003-8000-000000000003"

const OWNER_AT = "akasha/one/one.domain.ts"

const OTHER_AT = "akasha/two/two.domain.ts"

const BESIDE = "akasha/one/properties/held.text-property.ts"

const APART = "akasha/two/properties/held.text-property.ts"

const SHOWN = "text-property/held"

const PARTS = "parts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(at: string): string {
  const root = scratch.rootFor("akasha-property-beside-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "page-property", "domain")
  typed(root, "text-property", "page-property")
  claiming(root, OWNER_AT, OWNER)
  claiming(root, OTHER_AT, OTHER)
  claiming(root, at, HELD)
  return root
}

function judging(root: string): Judging {
  const shadow = shadowAt(root)
  return judgingBy(shadow, shadow.index.knownIn())
}

test("a property page in the `properties` folder beside the page naming it a part is let through", () => {
  const root = rooted(BESIDE)
  edging(root, HELD, PARTS, OWNER, OWNER_AT)

  expect(judging(root)(HELD, SHOWN, BESIDE)).toBe(null)
})

test("a property page in another page's `properties` folder is refused, naming where it sits", () => {
  const root = rooted(APART)
  edging(root, HELD, PARTS, OWNER, OWNER_AT)
  const said = judging(root)(HELD, SHOWN, APART)

  expect(said).toContain("`akasha/two/properties`")
  expect(said).toContain("`akasha/one/properties`")
  expect(said).toContain(OWNER_AT)
})

test("a property page no page names a part is passed over here", () => {
  const root = rooted(APART)

  expect(judging(root)(HELD, SHOWN, APART)).toBe(null)
})

test("a property page two pages name a part is passed over here", () => {
  const root = rooted(APART)
  edging(root, HELD, PARTS, OWNER, OWNER_AT)
  edging(root, HELD, PARTS, OTHER, OTHER_AT)

  expect(judging(root)(HELD, SHOWN, APART)).toBe(null)
})

test("the folder wanted is the `properties` folder beside the page naming the property", () => {
  expect(foldedFor(OWNER_AT)).toBe("akasha/one/properties")
})
