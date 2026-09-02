import type { Finding } from "../finding.page-type.ts"

export const theSkillPagesCarryNoneOfTheEffectsTheSkillsTableCarries = {
  id: "01a06193-2de1-7f22-b109-723f8e32ede2",
  pageTypeSlug: "finding",
  slug: "the-skill-pages-carry-none-of-the-effects-the-skills-table-carries",
  domainSlug: "domain/temper",
  claim:
    "Not one of the 203 skills whose table row carries `effects` would keep those effects through a regeneration. 113 hold an effects sidecar naming the fields `type` and `value` where the table names them `effectType` and `effectValue`, and the other 90 hold no sidecar at all, so their effects exist only in the checked-in table.",
  evidence:
    'Measured 2026-09-02 while landing akasha/temper/temper-character-skills. The table compared against is temper-character-skills/character-skills-from-pages, carrying the bytes of temper/game-characters-skills/src/generated/temper-skill.generated.ts. 203 of its 1,636 rows carry `effects`.\n\n113 skill page folders under akasha/temper/temper-catalog/temper-skills/skills/pages hold a `<slug>.temper-skill.effects.jsonl` sidecar. Comparing the sidecar rows against the table\'s effects, after normalising the generator\'s `seconds: null` to positive infinity, 0 of 113 agree and 113 differ. The difference is the field naming, not the values: accuracy has {metricId, type: "integer", value: 1314} in the sidecar against {metricId, effectType: "integer", effectValue: 1314} in the table, and advanced-species differs the same way. The sidecar rows also each carry an `id` the table row has no place for.\n\nThe remaining 90 rows carry effects in the table and have no sidecar beside their page: absorb, accelerated-growth, aegis-of-the-unseen, amphibian, authority, balanced-blade, banish-the-wicked and battle-resurrection among them.\n\nThe generator at temper-addon-generators/temper-skill emits `effects` straight from the row, so a run today would rename the field on 113 skills and drop it from 90.',
} as const satisfies Finding
