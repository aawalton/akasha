import type { Finding } from "../finding.page-type.ts"

export const theMigratedBookOverviewsLinkToFilesThatWent = {
  id: "01a06589-aff9-7100-a572-404ca8cf1e91",
  pageTypeSlug: "finding",
  slug: "the-migrated-book-overviews-link-to-files-that-went",
  domainSlug: "domain/authoring",
  claim:
    "The three overviews migrated into `book-record` pages carry sixty markdown links into their own books, and every one reaches nothing today. All About Alan's forty-seven reach `notes/*.md` files that were rewritten as `all-about-alan-topic` pages under other slugs and then deleted. My Strategy's eleven reach `chapters/NNN-*.md`, which are outside akasha under another name. My Faith's two reach a `CLAUDE.md` that is nowhere.",
  evidence:
    "Measured 2026-09-02 over the three overviews as they were migrated out of `dirty/`.\n\nCounted by matching the markdown link form over each record's writing files: 47 in `all-about-alan-overview`, 11 in `my-strategy-overview`, 2 in `my-faith-overview`.\n\nAll About Alan's targets are 31 distinct `notes/*.md` paths, among them `notes/aphantasia-mechanism.md`, `notes/safety.md`, `notes/values-personas-system.md`, plus the bare `notes` and `personas` folders. `/var/home/walton/repos/akasha/all-about-alan/chapters/notes/` holds one Python file and no markdown at all; the backup holds the same. The notes' content is in akasha as 250 `all-about-alan-topic` pages, written in Alan's own voice under new slugs, so no path maps one to one.\n\nMy Strategy's targets are `chapters/001-two-channels.md` through `chapters/009-...md`. The files are `pages/book-chapter/my-strategy/001-two-channels.book-chapter.md` and their like, outside akasha and awaiting migration.\n\nWhat I changed: each target had a `../../<book>/` prefix that was correct from `dirty/<book>/` and correct from nowhere else, so I took the prefix off and left the path the book itself reads from its own root. The note names are untouched, so the trace from a line to the note behind it survives even while the paths reach nothing.\n\nThis is not `head-doc-links-dangle-in-books`, which counts nine links to a `CLAUDE.md` in `~/books`. My Faith's two are of that shape; the other 58 are links to a book's own numbered or named parts.",
} as const satisfies Finding
