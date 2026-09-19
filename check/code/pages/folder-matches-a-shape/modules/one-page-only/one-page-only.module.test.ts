import { expect, test } from "bun:test"
import {
  folderFrom,
  gatheringFrom,
  holdsFrom,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test-fixtures.ts"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { namedAsAsked } from "akasha/check/code/pages/folder-matches-a-shape/modules/one-page-only/one-page-only.module.code.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import { temper } from "akasha/temper/temper.domain.ts"

const PAGE_TYPES = new Set<string>(["page-type", "domain", "module"])

const NOTHING = "this folder holds no page"

function asked(standing: Standing): readonly string[] {
  const page = standing.pages[0]
  if (page === undefined) return [NOTHING]
  return namedAsAsked(standing, page)
}

test("a folder named what its page calls it is named as asked", () => {
  const held = folderFrom({
    folder: "akasha/models",
    pageTypes: PAGE_TYPES,
    naming: () => ({ name: "models" }),
  })
  expect(asked(held(["models.domain.ts"]))).toEqual([])
})

test("a folder the page above names nothing for is named as asked", () => {
  const held = folderFrom({ folder: "akasha/models", pageTypes: PAGE_TYPES })
  expect(asked(held(["other.domain.ts"]))).toEqual([])
})

const ABOVE = holdsFrom({
  "akasha/temper": [`${domain.slug}/${temper.slug}`],
  "akasha/temper/catalog": ["page-type/temper-catalog"],
})

test("the name of every folder above holding a page is taken off, not the nearest alone", () => {
  const held = folderFrom({
    folder: "akasha/temper/catalog/skill",
    pageTypes: PAGE_TYPES,
    naming: () => ({ name: "catalog-skill" }),
    holds: ABOVE,
  })
  expect(asked(held(["temper-catalog-skill.module.ts"]))).toEqual([])
})

test("a folder named none of the names those leave is refused, naming both", () => {
  const held = folderFrom({
    folder: "akasha/temper/catalog/other",
    pageTypes: PAGE_TYPES,
    naming: () => ({ name: "catalog-skill" }),
    holds: ABOVE,
  })
  const said = asked(held(["temper-catalog-skill.module.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`other`")
  expect(said[0]).toContain("`catalog-skill`")
})

test("a folder named the plural the page's own type gathers its pages under is named as asked", () => {
  const held = folderFrom({
    folder: "akasha/modules",
    pageTypes: PAGE_TYPES,
    naming: () => ({ name: "held" }),
    gathered: gatheringFrom({ modules: ["module"] }),
  })
  expect(asked(held(["held.module.ts"]))).toEqual([])
})

test("a folder named the plural of another page type is refused", () => {
  const held = folderFrom({
    folder: "akasha/modules",
    pageTypes: PAGE_TYPES,
    naming: () => ({ name: "held" }),
    gathered: gatheringFrom({ modules: ["domain"] }),
  })
  const said = asked(held(["held.module.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`modules`")
})

test("a folder wanting a name no name can be worked out for is refused for wanting one", () => {
  const held = folderFrom({
    folder: "akasha/temper-skills/skills",
    pageTypes: PAGE_TYPES,
    naming: () => ({ name: null, gives: "temper-skills" }),
  })
  const said = asked(held(["temper-skill.page-type.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("cannot work out")
  expect(said[0]).toContain("`temper-skills`")
})

test("a plural naming that folder is taken before the name it wants cannot be worked out", () => {
  const held = folderFrom({
    folder: "akasha/temper-skills/skills",
    pageTypes: PAGE_TYPES,
    naming: () => ({ name: null, gives: "temper-skills" }),
    gathered: gatheringFrom({ skills: ["page-type"] }),
  })
  expect(asked(held(["temper-skill.page-type.ts"]))).toEqual([])
})
