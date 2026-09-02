import type { Finding } from "../finding.page-type.ts"

export const theSkillPagesHoldEachDescriptionAsItsOwnJsonEncoding = {
  id: "01a06193-2de0-7c08-9825-fdb463c9d1b4",
  pageTypeSlug: "finding",
  slug: "the-skill-pages-hold-each-description-as-its-own-json-encoding",
  domainSlug: "domain/temper",
  claim:
    "All 1,636 temper-skill pages hold `description` as the JSON encoding of the description rather than the description. Regenerating the skills table from the pages would put a literal pair of quote characters around every skill tooltip in the game and turn 1,077 newlines into a literal backslash-n. No other field drifted, so the fault is invisible to any check that compares field names.",
  evidence:
    "Measured 2026-09-02 while landing akasha/temper/temper-character-skills. Every page under akasha/temper/temper-catalog/temper-skills/skills/pages was imported and compared against the table now at temper-character-skills/character-skills-from-pages, which carries the same bytes the checked-in temper/game-characters-skills/src/generated/temper-skill.generated.ts carried.\n\nThe relation holds with no exception: page.description === JSON.stringify(table.description) for 1,636 of 1,636 rows. Broken down, 558 pages are the table text wrapped in one pair of quote characters, 1,077 are that plus every newline escaped to two characters, and one, timely-escape, is that plus its inner quotes escaped.\n\nEvery other field agrees exactly across all 1,636: title against name, icon, esoSkillId, baseName, skillLineId, skillType, isMorph, morphIndex, lineRankNeeded, rank and subcategoryId all answer zero disagreements. The order the generator at temper-addon-generators/temper-skill would emit, no-skill first then key.localeCompare, also matches the landed table index for index.\n\nSo the pages are the drifted party and the checked-in table is right. Migrating the table unchanged is the correct call, but nothing now keeps the pages and the table equal, and the generator cannot be run to close the gap.",
} as const satisfies Finding
