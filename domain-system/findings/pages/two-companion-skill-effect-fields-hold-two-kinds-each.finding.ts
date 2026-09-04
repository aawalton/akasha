import type { Finding } from "../finding.page-type.ts"

export const twoCompanionSkillEffectFieldsHoldTwoKindsEach = {
  id: "01a061b0-5cb9-7560-805b-a2e35d869331",
  pageTypeSlug: "finding",
  slug: "two-companion-skill-effect-fields-hold-two-kinds-each",
  domainSlug: "domain/temper-catalog",
  claim:
    "Two fields of the companion skill effect entries hold a genuine union of kinds, and akasha has no property type for a union. `effect` is text on 9 entries and an object on 13, and landed as a record property, so the 9 text values answer to a shape declaring named fields. `value` is a number on 18 entries and the string `reset` on 1, and reuses `effect-value`, a number property. Both landed unrefused, so the pages assert a kind the data does not keep.",
  evidence:
    "Measured 2026-09-02 over akasha/temper/temper-catalog/temper-companions/companion-skills/pages, 436 effect entries across 121 `.skill-effects.jsonl` files and 27 condition entries across 24 `.cast-conditions.jsonl` files. Of the 22 entries carrying `effect`, 9 hold text and 13 hold an object; the four kinds nesting one are `delayed`, `special`, `periodic-trigger` and `synergy`. Of the 19 entries carrying `value`, 18 hold a number and 1 holds the string `reset`, on `cooldown-reduction`. The same split reads on the generated side: temper/game-companions-core/src/generated/temper-companion-skill.generated.ts answers 9 text and 13 object for `effect`, and 18 numbers and one `reset` for `value`, so nothing between the page and the file narrows either one. The properties landed as akasha/temper/temper-catalog/temper-companions/companion-skills/properties/nested-effect.record-property.ts and effect-value. Neither shape is wrong for the majority kind, and no shape in the tree covers both. COMPANION-SKILL-EFFECTS-DESIGN.md call 3 chose the record property for `effect` deliberately, to carry the recursion without a join, and the text minority was not known when that call was made. Why nothing refused either is a separate claim, filed as `the-page-type-check-cannot-see-a-field-whose-kind-varies`.",
} as const satisfies Finding
