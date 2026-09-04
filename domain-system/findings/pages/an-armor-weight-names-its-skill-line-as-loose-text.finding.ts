import type { Finding } from "../finding.page-type.ts"

export const anArmorWeightNamesItsSkillLineAsLooseText = {
  id: "01a060c4-bb42-78c9-9075-fb47f226a118",
  pageTypeSlug: "finding",
  slug: "an-armor-weight-names-its-skill-line-as-loose-text",
  domainSlug: "domain/temper",
  claim:
    "The @akasha/temper-skill-lines dependency that game-characters-equipment declares and imports nowhere is not a half-finished repoint. Two of its tables carry a skill line id as loose text, one as a hand-written union of five names and the other as bare string, so the dependency records an intent the code never took up. Dropping the line would erase the only trace that these ids answer to the skill line table.",
  evidence:
    "Measured 2026-09-02. temper/game-characters-equipment/package.json declares @akasha/temper-skill-lines at workspace:*, and no file under src imports it; a grep for the specifier across the package answers nothing.\n\nA grep for skillLine across the same package answers two tables. temper/game-characters-equipment/src/armor/armor-weights-data.ts line 18 types skillLineId as a hand-written union, 'no-skill-line' | 'armor-heavy-armor' | 'armor-light-armor' | 'armor-medium-armor' | 'weapon-one-hand-and-shield', duplicating five ids the skill line table already holds. temper/game-characters-equipment/src/weapons/weapon-types-data.ts line 15 types the same field as bare string, and the generated weapon type rows fill it with weapon-one-hand, weapon-two-handed, weapon-bow, weapon-destruction-staff, weapon-restoration-staff and one empty string.\n\nThe empty string is worth its own look. temper/game-characters-equipment/src/weapons/generated/temper-weapon-type.generated.ts gives the no-type sentinel skillLineId '', while the armor weight sentinel is given 'no-skill-line'. Two sentinels for the same absence, and neither is checked against the table.",
} as const satisfies Finding
