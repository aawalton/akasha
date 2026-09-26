import { describe, expect, test } from "bun:test"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { temperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.ts"
import {
  SkillUnkeyed,
  skillKeysIn,
  skillTemplatesOf,
} from "akasha/temper/catalog/skill/modules/skill-templates-reading/skill-templates-reading.module.code.ts"
import { temperFocusScript } from "akasha/temper/catalog/skill/temper-focus-script/temper-focus-script.page-type.ts"
import { temperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.ts"
import { temperSkillType } from "akasha/temper/catalog/skill/type/temper-skill-type.page-type.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"

const PAGES: Readonly<Record<string, readonly Value[]>> = {
  [temperSkillLine.slug]: [{ slug: "bow", key: "weapon-bow" }],
  [temperSkillType.slug]: [{ slug: "active", key: "active" }],
  [temperGrimoire.slug]: [{ slug: "vault", key: "vault" }],
  [temperFocusScript.slug]: [{ slug: "stun", key: "stun" }],
  [temperMetricTree.slug]: [{ slug: "metric-power", nodeId: "power" }],
}

const KEYS = skillKeysIn((pageTypeSlug) => PAGES[pageTypeSlug] ?? [])

const SNIPE: Value = {
  slug: "snipe",
  key: "snipe",
  title: "Snipe",
  baseName: "Snipe",
  description: '"Deal damage.\\nFar away."',
  icon: "/snipe.dds",
  esoSkillId: 28882,
  isMorph: false,
  morphIndex: 0,
  lineRankNeeded: 1,
  rank: 1,
  skillLineId: `${temperSkillLine.slug}/bow`,
  skillType: `${temperSkillType.slug}/active`,
  status: "supported",
  effects: [
    { id: "row", metricId: `${temperMetricTree.slug}/metric-power`, type: "integer", value: 5 },
    { id: "row", seconds: null },
  ],
  hashPlace: 2,
}

const NO_SKILL: Value = { ...SNIPE, slug: "no-skill", key: "no-skill", hashPlace: 0 }

const VAULT_STUN: Value = {
  ...SNIPE,
  slug: "scribed-vault-stun",
  key: "scribed-vault-stun",
  effects: undefined,
  status: undefined,
  grimoireId: `${temperGrimoire.slug}/vault`,
  focusScriptId: `${temperFocusScript.slug}/stun`,
  hashPlace: 3,
}

describe("skillTemplatesOf", () => {
  test("puts every skill at its page's place, the scribed ones among them", () => {
    const read = skillTemplatesOf([SNIPE, NO_SKILL, VAULT_STUN], [VAULT_STUN], KEYS)
    expect(read.skills.map((one) => one.id)).toEqual(["no-skill", "snipe", "scribed-vault-stun"])
    expect(read.scribedSkills.map((one) => one.grimoireId)).toEqual(["vault"])
  })

  test("reads a named page as its key, and a duration held as null as forever", () => {
    const [, snipe] = skillTemplatesOf([SNIPE, NO_SKILL], [], KEYS).skills
    expect(snipe?.skillLineId).toBe("weapon-bow")
    expect(snipe?.effects).toEqual([
      { metricId: "power", effectType: "integer", effectValue: 5 },
      { seconds: Number.POSITIVE_INFINITY },
    ] as never)
  })

  test("reads quoted text as the text inside, and the sentinel under no line", () => {
    const [none, snipe] = skillTemplatesOf([SNIPE, NO_SKILL], [], KEYS).skills
    expect(snipe?.description).toBe("Deal damage.\nFar away.")
    expect(none?.subcategoryId).toBe("none")
  })

  test("throws on a page naming a page that states no key", () => {
    const lost = { ...SNIPE, skillLineId: `${temperSkillLine.slug}/nowhere` }
    expect(() => skillTemplatesOf([lost], [], KEYS)).toThrow(SkillUnkeyed)
  })
})
