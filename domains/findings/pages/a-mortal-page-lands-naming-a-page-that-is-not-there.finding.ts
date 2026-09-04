import type { Finding } from "../finding.page-type.ts"

export const aMortalPageLandsNamingAPageThatIsNotThere = {
  id: "01a0623a-0e18-7000-8b4c-6d21f3a95e07",
  pageTypeSlug: "finding",
  slug: "a-mortal-page-lands-naming-a-page-that-is-not-there",
  domainSlug: "domain/akasha-check",
  claim:
    "`relation-resolves` exempts every mortal page from the refusal for naming a page that is not there, so a finding or an initiative lands naming a domain nothing carries. Four landed today. What caught all four was the index's own refusal list, surfaced by a single assertion inside a whole-tree rebuild test. That test is gone, rightly, because no test may run past five seconds. Nothing refuses the next one at landing.",
  evidence:
    "`relation-resolves.code-check.ts` states `A mortal page is never refused for a name reaching no page.` Both `finding` and `initiative` state `mortal: true`.\n\nFour instances landed on 2026-09-02. Commit `27de904971` repointed four findings naming `domain/ops-worktree`, `domain/ops-global`, `domain/ops-cli` and `domain/ops-exercise`, none of which the index carries; the old system holds them as `pages/domain/*.domain.md`. All four had passed 39 checks when they landed at 02:49 and 03:07. Commit `adef6d13e1` landed `eppie-migrate-music-to-akasha.initiative.ts` naming `domain/performance-arts`, since repointed to `domain/music`. Commit `843f0c91f4` landed two stoplight widgets naming an `ios-component` that is not there.\n\nEvery one was caught by `expect(said.refused).toEqual([])` at `indexing.module.test.ts:289`, reading the list `rebuiltFrom` gathers from `index-relation.index.code.ts:32`. That assertion was the only reader of the list.\n\nCommit `2a38414a5c` removed that test at 06:39:57. It copied the 515MB akasha folder and ran between 11254ms and 118112ms across the runs measured. No test may run past 5000ms, so removing it was correct rather than a loss.\n\n`akasha index` reports the same refusals, so what is gone is the enforcement rather than the detection. A dangling relation on a mortal page is now visible to whoever runs that command and reads its output, instead of being refused as the change lands.\n\nThe call taken: nothing was changed. Narrowing the exemption is a check change, and a check binds every writer, so it waits on Alan.",
} as const satisfies Finding
