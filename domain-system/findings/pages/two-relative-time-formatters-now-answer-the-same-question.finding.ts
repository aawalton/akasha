import type { Finding } from "../finding.page-type.ts"

export const twoRelativeTimeFormattersNowAnswerTheSameQuestion = {
  id: "01a0643c-2ced-7766-be6b-a776b9f2f637",
  pageTypeSlug: "finding",
  slug: "two-relative-time-formatters-now-answer-the-same-question",
  domainSlug: "domain/temper",
  claim:
    "Akasha now holds two modules that turn an instant into how long ago it was, and they answer differently. `design-primitives/format-relative-time` gives `5m`, `2h`, `3d`. `temper-web/format-time-ago` gives `Just now`, `1 minute ago`, `3 days ago`. Neither can be swapped for the other without changing what a reader sees, and nothing in either file says the other exists.",
  evidence:
    "Measured 2026-09-02 while migrating `temper/web/app/components/utils/format-relative-time.ts`. The slug `format-relative-time` was already landed at `akasha/design/primitives/format-relative-time`, and module slugs are unique across the repository, so the temper one could not keep its name.\n\nThe two are not the same function. The design one is a duration formatter with a magnitude and a unit suffix, handles future instants as `in 5m`, returns null for a non-finite input, and carries a companion `needsSecondPrecision`. The temper one is a phrase formatter, floors any future instant to `Just now`, pluralises its unit word, and stops at days rather than running to weeks, months and years.\n\nThe temper one landed as `format-time-ago` with its export renamed `formatTimeAgo`, so an importer written against the old name fails to compile rather than silently taking the other function. Three callers followed it across: the watcher build, run and sync status cards. Two more sit in sibling seats' scope — `characters/version-history-dialog.tsx` and `companions/version-history-dialog.tsx`.\n\nWhat is left open is whether temper wants two. If the phrase form is what temper's rows should read, `format-time-ago` is the right module and design's is the wrong one to reach for. If the compact form is wanted, deleting `format-time-ago` and repointing five callers is a small change — but it is a change to what the interface reads, not a tidy-up, and should be decided rather than done while passing.",
} as const satisfies Finding
