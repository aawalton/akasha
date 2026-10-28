import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { worldAbilityKind } from "akasha/story/world/mechanics/ability-kinds/world-ability-kind.page-type.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"
import { giftedPath } from "akasha/story/world/pages/gifted/mechanics/ability-kinds/gifted-path.world-ability-kind.ts"
import { giftedPathOfEndurance } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-endurance.world-skill.ts"
import { giftedPathOfWillpower } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-willpower.world-skill.ts"
import { testStoryPlayer } from "akasha/story/world/pages/test-world/stories/played/test-story/characters/test-story-player.character-player.ts"
import { testStoryPlayerWits } from "akasha/story/world/pages/test-world/stories/played/test-story/mechanics/metrics/stats/test-story-player-wits.metric-character-stat.ts"
import {
  abilityKindOf,
  abilityKindsIn,
  attributeOf,
  skillMoreOf,
} from "akasha/story/world/stories/played/modules/played-skills/played-skills.module.code.ts"

const PATH = namedAs(worldAbilityKind.slug, giftedPath.slug, null)

const ENDURANCE = namedAs(worldSkill.slug, giftedPathOfEndurance.slug, null)

const WILLPOWER = namedAs(worldSkill.slug, giftedPathOfWillpower.slug, null)

const KINDS = abilityKindsIn(
  [{ values: { slug: giftedPathOfEndurance.slug, abilityKind: PATH } }],
  [{ values: { slug: giftedPath.slug, title: "Path", pluralTitle: "Paths" } }]
)

test("a holding is of the ability kind its world's skill names", () => {
  expect(abilityKindOf({ values: { skill: ENDURANCE } }, KINDS)).toEqual({
    title: "Path",
    pluralTitle: "Paths",
  })
})

test("a holding naming its own ability kind is of that kind", () => {
  const row = { values: { skill: WILLPOWER, abilityKind: PATH } }
  expect(abilityKindOf(row, KINDS)?.title).toBe("Path")
})

test("a holding whose skill names no ability kind is of none", () => {
  expect(abilityKindOf({ values: { skill: WILLPOWER } }, KINDS)).toBeUndefined()
})

test("a holding states its ability kind beside its experience", () => {
  expect(skillMoreOf(new Map(), KINDS)({ values: { skill: ENDURANCE, experience: 3 } })).toEqual({
    experience: 3,
    abilityKind: { title: "Path", pluralTitle: "Paths" },
  })
})

test("a holding names its own page, whether it is set aside, and its kind's slots", () => {
  const kinds = abilityKindsIn(
    [{ values: { slug: giftedPathOfEndurance.slug, abilityKind: PATH } }],
    [{ values: { slug: giftedPath.slug, title: "Path", pluralTitle: "Paths", activeSlots: 10 } }]
  )
  const slug = "nala-path-of-endurance"
  const row = {
    values: {
      type: namedAs(pageType.slug, characterSkill.slug, null),
      slug,
      skill: ENDURANCE,
      dormant: true,
    },
  }
  expect(skillMoreOf(new Map(), kinds)(row)).toEqual({
    abilityKind: { title: "Path", pluralTitle: "Paths", activeSlots: 10 },
    held: namedAs(characterSkill.slug, slug, null),
    dormant: true,
  })
})

const HOLDER = namedAs(characterPlayer.slug, testStoryPlayer.slug, null)

const WITS = namedAs("metric-character-stat", testStoryPlayerWits.slug, null)

test("a skill's attribute is named by what its slug adds to its holder's", () => {
  const row = { values: { character: HOLDER, attribute: WITS } }
  expect(attributeOf(row, new Map())).toBe("WITS")
})

test("a skill's attribute page stating a title is named by that title", () => {
  const row = { values: { character: HOLDER, attribute: WITS } }
  expect(attributeOf(row, new Map([[WITS, "Cunning"]]))).toBe("CUNNING")
})

test("a holding states its experience and attribute, and a bare one states neither", () => {
  const more = skillMoreOf(new Map())
  expect(more({ values: { character: HOLDER, attribute: WITS, experience: 12 } })).toEqual({
    experience: 12,
    attribute: "WITS",
  })
  expect(more({ values: { character: HOLDER } })).toEqual({})
})
