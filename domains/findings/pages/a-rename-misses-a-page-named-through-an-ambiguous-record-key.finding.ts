import type { Finding } from "../finding.page-type.types.ts"

export const aRenameMissesAPageNamedThroughAnAmbiguousRecordKey = {
  id: "01a082e2-f6b5-7b4b-ac40-84fe805a8b9b",
  pageTypeSlug: "finding",
  slug: "a-rename-misses-a-page-named-through-an-ambiguous-record-key",
  domain: "change-mechanical-file-content/rename-page-slug",
  claim:
    "A rename leaves behind a page named through a record field whose key more than one property carries.",
  evidence:
    "`addressedIn` resolves a body key through `slugOfKeyIn`, which settles an ambiguous key from the page type's top-level declarations alone, so a key carried inside a record is not settled. Two fields in the repository are ambiguous this way: `frame` on `prose-frame`, also carried by `detail-frame`, and `action` on `request`, also carried by `action`. `fieldOfKey` answers for these, and reaching it asks `addressedIn` to track which record it is walking inside.",
} as const satisfies Finding
