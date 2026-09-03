import type { Finding } from "../finding.page-type.ts"

export const theTemperMigrationMintedFreshIdentitiesOverTwelveThousandV7Ones = {
  id: "01a06577-247a-7a8b-8e1d-957b8da0d23d",
  pageTypeSlug: "finding",
  slug: "the-temper-migration-minted-fresh-identities-over-twelve-thousand-v7-ones",
  domainSlug: "domain/akasha-migration",
  claim:
    "All 12,326 temper pages inside akasha carry an id minted tonight rather than the one their markdown page held, though each old id was already a uuid version 7 and so gave no ground to be replaced. The pages holding the old ids are ablated, so the repository no longer states what any of the 12,326 pages used to be keyed by.",
  evidence:
    "Of the 12,326 ids held by `.ts` pages under `akasha/temper`, 0 appear among the 52,188 ids the pre-tonight tree at `/var/home/walton/repos/akasha-backup-2026-09-02` holds. The same measure over `akasha/persona-system/persona-days` finds 2,079 of 2,079 carried across, so the measure detects a carry where there is one. Sampling nine temper families by slug — skill, set, item-category-tree, metric-tree, companion-skill, guild-trader, motif-style, scribed-skill and skill-line — matched 1,043 pages to their markdown twins and found the id changed on all 1,043 and kept on none. All 500 temper-skill ids sampled in the backup are version 7, and the replacements keep none of the old last eight hex: a-soul-ablaze went 019e6f53-9e7c-7b80-a32b-a02cf760a80d to 01a05fd0-4339-72a6-8198-de1a40e770f7. The page page-type states that a page's id is unchanged when its path changes and unchanged when its slug changes, and licenses a replacement only for one that is no uuid version 7. The persona-day page-type states the same of its own: what Alan's history is keyed by outlives every rewrite. The old ids remain in the backup and in this repository's history and the slugs match one to one, so restoring them is mechanical. This also bounds the initiative's working memory, which says no migration has carried a page id across: persona-day carried every one.",
} as const satisfies Finding
