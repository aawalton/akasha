import type { Finding } from "../finding.page-type.ts"

export const anEmailEntryWriteWasAlreadyDeadBeforeItsPagesMoved = {
  id: "01a06869-dab4-7717-aa53-1421b9067fc5",
  pageTypeSlug: "finding",
  slug: "an-email-entry-write-was-already-dead-before-its-pages-moved",
  domainSlug: "domain/akasha-migration",
  claim:
    "The inbox poller's write path for email entries was already unreachable before the entries migrated, because `whereFor` builds the old page-type registry from `pages/page-type/**` alone and `email-entry.page-type.md` had already gone from it.",
  evidence:
    "Measured 2026-09-03, before landing anything: `git show HEAD:pages/page-type/email-entry.page-type.md` answered `does not exist in HEAD`, while the fourteen instance pages under `pages/email-entry/` still stood. `tools/lib/inbox-tracking/email-entry.ts` reads and writes through `askComposed` and `pageLanding` in `tools/lib/page-query-client.ts`, and `whereFor` in `tools/lib/page-write-where.ts` opens `registryOf(tree).find((one) => one.slug === pageType)` and answers null when the slug is not in the registry. So both the poller's write and the `inboxes-email` readout's read were already answering nothing. Ablating the fourteen markdown entries at 0bdaf93c0f therefore took nothing live down; the entries now stand as TypeScript pages under `akasha/alan/tracking/daily/email-entries/pages`. The poller still needs its store repointed onto the new pages before it writes again, which is the page-query cutover rather than a change to the poller. Separately, `tools/email-entries-carry.uncommitted.ts` is a stale carry script that would land a second `email-entry` page type at `akasha/alan/harness/inboxes/email-entries` under a different identity; the page type already stands at `akasha/alan/tracking/daily/email-entries/email-entry.page-type.ts` and `tracking-daily.domain.ts` names it. Running that script now would manufacture the duplication intent four exists to remove.",
} as const satisfies Finding
