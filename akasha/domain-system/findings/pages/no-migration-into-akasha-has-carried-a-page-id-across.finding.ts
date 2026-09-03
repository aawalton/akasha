import type { Finding } from "../finding.page-type.ts"

export const noMigrationIntoAkashaHasCarriedAPageIdAcross = {
  id: "01a06551-7017-7a1a-93dd-b52b8ea587bb",
  pageTypeSlug: "finding",
  slug: "no-migration-into-akasha-has-carried-a-page-id-across",
  domainSlug: "domain/akasha-migration",
  claim:
    "Every migration that has landed so far minted fresh identities rather than carrying the old page's identity across. Not one id is shared between an old page and the akasha page that replaces it. Anything matching migrated content to its origin must match on slug and fields, because matching on id will report that nothing has ever been migrated.",
  evidence:
    "Measured on 2026-09-02, over four folders whose slugs are fully covered in akasha.\n\ntemper-skill: 1,636 old markdown pages, 1,636 akasha pages, every slug present on both sides and 0 slugs on one side alone. Comparing the frontmatter `id` of the 1,636 old files against the `id` of the 1,636 akasha files gives 1,636 distinct ids each side and 0 in common.\n\nThe same comparison on temper-set (707 and 707), temper-dungeon (58 and 58) and page-query (89 old, 104 new) each gives 0 shared ids.\n\nOne pair read end to end: `pages/temper-skill/absorb-30869.temper-skill.md` carries `id: 019e6f53-9e80-70a4-a7d0-5c11407177a4`; `akasha/temper/temper-catalog/temper-skills/skills/pages/absorb-30869/absorb-30869.temper-skill.ts` carries `id: 01a05fd0-433b-76e3-8c85-eb473bebdee9`. Every other field matches, down to the escaped quotes inside the description — title, key, baseName, description, icon, esoSkillId, isMorph, learnedLevel, lineRankNeeded, morphIndex, rank, skillLineId, skillType, subcategoryId. Only the identity was replaced.\n\nThis sits against `page.page-type.ts`, which states that a page's identity is unchanged when its path changes and unchanged when its slug changes. Whether the invariant is meant to reach across the old system's boundary is a question for Alan; what matters now is the consequence.\n\nThe consequence is for the agent building per-file removal. An id is the one field guaranteed not to match, so an id comparison would clear no file for deletion and would look like a correct negative result rather than a broken instrument.",
} as const satisfies Finding
