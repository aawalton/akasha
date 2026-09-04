import type { Finding } from "../finding.page-type.ts"

export const bookDependenciesHaveAlternatives = {
  id: "01a06555-9f3d-7fc6-ad96-66405e67d11b",
  pageTypeSlug: "finding",
  slug: "book-dependencies-have-alternatives",
  domainSlug: "domain/all-about-alan",
  claim:
    "Alan's reading and listening run through Amazon Kindle and Audible, both D-tier, and two replacements sit identified and unused. Provo Library with Libby and Hoopla is free, aligned with his own preference for government-as-utility, and needs only a library card and two apps set up. Libro.fm is the paid alternative, aligned with independent booksellers rather than Amazon, and has not been trialled. Neither path has begun taking any of the volume.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. This folds two items under the VENDOR thread of `backlog/personal-freedom.md`: `provo-library` (line 31, was item 50) and `libro-fm` (line 32, was item 51). The second is filed there as a sibling alternative to the first for the same dependency, which is why I took them as one observation. They cite `notes/information-and-media.md`, `notes/alternatives.md` and `notes/cultivating-local-relationships.md`.\n\nThe library path is recorded as bandwidth-gated rather than blocked on anything external.\n\nWhat I did not measure: I read none of those notes, so the grades and the library's tier are the backlog's. That neither path has begun is what the items' open status implies as of 2026-07-10; I did not check whether a card or a trial has since been set up.",
} as const satisfies Finding
