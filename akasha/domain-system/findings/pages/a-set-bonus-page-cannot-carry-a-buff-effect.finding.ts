import type { Finding } from "../finding.page-type.ts"

export const aSetBonusPageCannotCarryABuffEffect = {
  id: "01a060c4-bb40-7d52-a495-cfbfc18eccf0",
  pageTypeSlug: "finding",
  slug: "a-set-bonus-page-cannot-carry-a-buff-effect",
  domainSlug: "domain/temper",
  claim:
    "A set bonus page can state a metric effect and nothing else, so the one buff effect the set table holds did not survive the landing of the 707 set pages. Rebuilding the table from the pages today would leave mighty-chudan's third bonus with no effects where the committed table gives it the major-resolve buff. That one row is the whole difference between the two, so the pages are one field short of carrying the table.",
  evidence:
    "Measured 2026-09-02 after generateTemperSet was fixed to read the page shape. Reading all 707 temper-set pages through getPages and running the fixed generator gives an ordered id list identical to the committed temper/game-characters-equipment/src/sets/generated/temper-set.generated.ts index for index, and 706 of the 707 sets compare equal on name, esoSetId, subcategoryId, valid, bonuses and icons.\n\nThe set that differs is mighty-chudan. akasha/temper/temper-catalog/temper-gear/sets/pages/mighty-chudan/mighty-chudan.temper-set.bonuses.jsonl line 3 carries count 2, status supported and the description 'Gain Major Resolve at all times, increasing your Physical and Spell Resistance by 5948.' with no effects field. The committed table gives that same bonus effects [{buffId: 'major-resolve'}].\n\nThe page cannot say it. akasha/temper/temper-catalog/temper-gear/properties/bonus-effects.record-property.ts declares three properties, metric-id, effect-type and effect-value, all required. A buff effect in akasha/temper/temper-formula-framework/effect/effect.module.code.ts is {buffId, seconds?, slottedBehavior?} and names no metric at all, so no arrangement of the three declared fields holds it.\n\nOne row in 707 and one buff in the whole table: grep for buffId in the committed table answers 1, and for debuffId 0. Nothing was regenerated, so no build hash moved.",
} as const satisfies Finding
