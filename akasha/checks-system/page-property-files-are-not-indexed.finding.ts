import type { Finding } from "../domain-system/finding/finding.page-type.ts"

export const pagePropertyFilesAreNotIndexed = {
  id: "01a04bd1-923f-7633-9316-2f6a77f3e8ce",
  pageTypeSlug: "finding",
  slug: "page-property-files-are-not-indexed",
  domainSlug: "domain/data-system",
  claim: "The index deliberately holds no page property file, which is what stops file-has-its-page and page-property-has-its-file from being rebuilt.",
  evidence:
    "Both checks judge the correspondence between a page and the files its properties hold: that every file is claimed by a page, and that every property a page states as held in a file has one, not empty. Both therefore need to know what a page states a property's file to be, and whether that file is there. The stated value is a property of kind file and the index records no property values; the file itself is a page property's own file, which `index.domain.ts` says is not indexed. So neither end of the correspondence is reachable, and the tree is closed to a check. This is the same absence that makes audit execute every page merely to enumerate. One index entry per page property file, keyed by page and property and carrying the path, would answer all three at once — the two checks and the enumeration.",
} as const satisfies Finding
