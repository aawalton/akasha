import type { Finding } from "../finding.page-type.ts"

export const ninetyOneTemperFoldersAreInAkashaSlugForSlugAndStillSitOutsideIt = {
  id: "01a06551-7017-74a5-b1e5-ed9f0793a2ff",
  pageTypeSlug: "finding",
  slug: "ninety-one-temper-folders-are-in-akasha-slug-for-slug-and-still-sit-outside-it",
  domainSlug: "domain/akasha-migration",
  claim:
    "Of the 99 `temper-*` folders under `pages/`, 91 are already carried in akasha with every slug present and none missing. They hold 5,425 markdown pages and 6,264 files. The temper family is not work waiting to be done; it is work already done and never swept, and it is the largest such block outside the story folders.",
  evidence:
    "Measured on 2026-09-02. For each of the 224 `pages/` folders holding markdown I took the frontmatter slug of every `*.<type>.md` file and compared it against the slugs of every `*.<type>.ts` file under `akasha/`, normalising the `at-` prefix akasha adds where a slug begins with a digit.\n\n93 folders had zero old slugs missing from akasha. 91 of those are `temper-*`; the other two are page-query (89 of 89) and web-app (6 of 6). Together the 93 hold 5,520 markdown pages.\n\nThe largest are temper-skill 1,636, temper-set 707, temper-inventory-chunk 458, temper-item-category-tree 439, temper-metric-tree 299, temper-inventory-snapshot 162, temper-skill-line 139, temper-companion-skill 122, temper-guild-trader 112, temper-motif-style 107 and temper-scribed-skill 104. The remaining 80 hold under 100 each.\n\nField-level check on one pair: `pages/temper-skill/absorb-30869.temper-skill.md` and `akasha/temper/temper-catalog/temper-skills/skills/pages/absorb-30869/absorb-30869.temper-skill.ts` carry the same title, key, baseName, description, icon, esoSkillId, isMorph, learnedLevel, lineRankNeeded, morphIndex, rank, skillLineId, skillType and subcategoryId.\n\nTwo cautions for whoever sweeps. Slugs were renamed in four folders: temper-account, temper-player, temper-completion-override and temper-watcher-enrolment moved off raw uuids onto readable names, so a slug comparison alone reports them as unmigrated when they are not. And temper-inventory-chunk carries 458 sidecar files whose contents I did not compare; only the markdown was checked.",
} as const satisfies Finding
