import type { Finding } from "../finding.page-type.ts"

export const theOldPageFoldersFallIntoEighteenFamiliesOnlyThreeOfWhichAkashaServes = {
  id: "01a06551-7018-73b7-8f0e-014d1ecf3b83",
  pageTypeSlug: "finding",
  slug: "the-old-page-folders-fall-into-eighteen-families-only-three-of-which-akasha-serves",
  domainSlug: "domain/akasha-migration",
  claim:
    "The 261 `pages/` folders holding 65,063 files group into 18 families that share a page shape and a subject, and can be assigned to 18 agents without any two needing to agree. Three families are already served by akasha page types. Two more are not migration work at all. The other thirteen need page types built before any content moves.",
  evidence:
    "Surveyed 2026-09-02, folders and files counted directly. Family, folders, files.\n\nAlready served: temper-catalog 97 folders 6,264 files, every slug present in akasha. Plus page-query and web-app, folded into other families here.\n\nNot migration work: pages-meta 13 folders 2,672 files, replaced by akasha's own TypeScript. superseded-and-live-state 6 folders 586 files.\n\nNeeding page types first, largest first: wandering-inn-mechanics 19 folders 21,274 files, whose stubs are already carried as world readings but whose 126,962 reference rows are not. story-prose 8 folders 19,082 files, chapter text averaging 13KB and running to 435KB. library-collections 12 folders 4,377 files. persona 11 folders 2,313 files. domains-and-agents 12 folders 2,046 files, of which pages/domain alone is 687 with 18 in akasha. place-deals 3 folders 1,632 files. body-fitness 10 folders 1,388 files. relationships 5 folders 820 files. cars 3 folders 644 files. alan-self 7 folders 587 files. money-rules 15 folders 454 files. games-apps 15 folders 403 files. infra-ops 20 folders 359 files. watched-media 5 folders 161 files.\n\n14 folders hold nothing: agent-hook, daily-tracking, eso-daily-tracking, file-arrangement-rule, finding, gate, inference-hook, ops-command and the six old-graph ones. finding is empty because its 760 pages are all in akasha already.\n\nThe families were drawn so that no two share a page type. The one seam is money-rules, where the category rules hang off monarch-category, so those fifteen folders must go to one agent rather than two.",
} as const satisfies Finding
