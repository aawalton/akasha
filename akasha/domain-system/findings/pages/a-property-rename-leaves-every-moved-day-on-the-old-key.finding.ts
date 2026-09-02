import type { Finding } from "../finding.page-type.ts"

export const aPropertyRenameLeavesEveryMovedDayOnTheOldKey = {
  id: "01a060be-c946-7002-b8f9-e39673cecc00",
  pageTypeSlug: "finding",
  slug: "a-property-rename-leaves-every-moved-day-on-the-old-key",
  domainSlug: "domain/akasha-migration",
  claim:
    "`carriersOf` in tools/lib/rename-property.ts:222-223 reads every scanned page for a markdown frontmatter block and skips the file where there is none. A TypeScript page never has one, so renaming a `daily-tracking` property gathers no day at all now that all 133 have moved, rewrites nothing, and reports a count that reads as complete.",
  evidence:
    "Measured 2026-09-02 by running, in an isolated checkout holding a day page that declares `safetyLevel`. `carriersOf(roots, types, tree, cache, 'daily-tracking', 'safety-level')` answered 18 carriers, all 18 markdown, 0 TypeScript, and the day page was not among them. On the checkout as it now is, `pages/daily-tracking/` holds nothing, so the same call gathers no day whatsoever.\n\nThe scan is not what drops them. `pagesOf` at :208 returns the moved days and `claimant` names their type. They are dropped one line on: `blockOf(text)` answers `why` = \"it opens with no `---` frontmatter block, so it declares nothing\", and `:223` reads `if (why !== null || !fm.fields.has(key)) continue`. A body that declares nothing and a body that is not markdown are answered the same way, so a page carrying the key in TypeScript cannot be told from a page carrying nothing.\n\nThis is the shape running through the whole class, and it is the same one that let a store answer no rows for 133 files on disk: a reader that cannot handle a file kind answers as though the file held nothing rather than saying it cannot read it. Nothing downstream can tell the two apart, so the rename reports success over an empty set.\n\nThe call taken: filed rather than repaired. Making it right needs `carriersOf` to read a TypeScript page's declared keys, which is `valueAt` in the pages system rather than a frontmatter parser, and that changes what the rename means rather than correcting a gate. That belongs with whoever owns the rename.",
} as const satisfies Finding
