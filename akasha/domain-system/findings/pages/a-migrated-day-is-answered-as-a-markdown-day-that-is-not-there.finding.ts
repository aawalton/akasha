import type { Finding } from "../finding.page-type.ts"

export const aMigratedDayIsAnsweredAsAMarkdownDayThatIsNotThere = {
  id: "01a060be-c946-7001-9182-8721c36ffe58",
  pageTypeSlug: "finding",
  slug: "a-migrated-day-is-answered-as-a-markdown-day-that-is-not-there",
  domainSlug: "domain/akasha-migration",
  claim:
    "`whereFor` in tools/lib/page-write-where.ts:40-53 finds none of Alan's 133 moved days, because `typeSuffixOf` answers the empty text for a `.ts` name and the fallback reads markdown frontmatter a `.ts` page has none of. It then builds a path for a day that is not on disk, under akasha/ and ending `.md`. It answers a Where rather than null, so every caller takes it for the day.",
  evidence:
    "Measured 2026-09-02 by running, against the checkout as it now is: `pages/daily-tracking/` holds nothing and akasha/alan/daily-tracking/daily-trackings/ holds 133 day pages. `whereFor(roots, 'daily-tracking', 'day-2026-03-05')` answers relPath `akasha/alan/daily-tracking/day-2026-03-05.daily-tracking.md`. That file is not on disk; the day is one folder deeper and ends `.ts`.\n\nWhy it misses is worth writing down, because the scan is not at fault. `pagesOf` returns the moved days and the page type declares both places in its `files:`. The test at :40 asks `typeSuffixOf(last) !== type.slug`, and `typeSuffixOf('day-2026-03-05.daily-tracking.ts')` answers the empty text, so it is false for every `.ts` page before the name is compared. The second test reads the body for a frontmatter `slug:`, which a TypeScript page does not carry. Both halves of the question are the markdown half.\n\nWhat it reaches is not fully settled. The call at tools/lib/editor-arrangement.ts:174 reads the answered path, finds nothing, answers false, and its caller writes the page again — a second day, markdown, inside akasha/. Alan's own tracking is kept off this road by `dayPlaceOf` in tools/lib/tracking/day-place.ts, which routes a moved day to `landAkashaDayPage`. Every other caller naming a day by type and name reaches it, and there are fourteen.\n\nThe call taken: filed rather than repaired. The file is followed by six daemons including surplus-fall-notifier, and saving it restarts them; that daemon sent a real push earlier in this session.",
} as const satisfies Finding
