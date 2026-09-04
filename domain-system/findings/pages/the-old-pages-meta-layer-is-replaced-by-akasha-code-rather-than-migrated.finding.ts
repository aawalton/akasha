import type { Finding } from "../finding.page-type.ts"

export const theOldPagesMetaLayerIsReplacedByAkashaCodeRatherThanMigrated = {
  id: "01a06551-7018-7c91-a259-3aa1c862c7e0",
  pageTypeSlug: "finding",
  slug: "the-old-pages-meta-layer-is-replaced-by-akasha-code-rather-than-migrated",
  domainSlug: "domain/akasha-migration",
  claim:
    "Thirteen `pages/` folders holding 2,672 files describe the old system's own shape rather than any subject. The new system states the same things as TypeScript instead, so most of these need no migration at all. Counting them as content to move overstates the remaining work by roughly two and a half thousand files.",
  evidence:
    "Surveyed 2026-09-02. The thirteen are page-property-definition (2,073), page-type (364), page-query (89), view (59), page-property-type (51), file-kind (33), nav (32), page-body-shape (21), page-body-section (7), list (7), option-list (6), folder-shape (3) and file-purpose (2).\n\nThree are already served. page-query is complete at 89 of 89. folder-shape has 11 akasha pages against 3 old ones. page-type has 121 of 364 old slugs present among akasha's 221 page-type files.\n\nTwo can never be served. `page.page-type.ts` states `A page has no body` and `Every section is a property`, which ends the markdown body-template concept that page-body-shape and page-body-section exist to describe.\n\npage-property-type is superseded in kind rather than in content: the old system named a property's sort in a `type:` text field pointing at this registry, while akasha makes the sort be which of its 16 `*-property` page types the property is.\n\npage-property-definition does not port one-to-one. An old record is keyed by the pair of owning page type and key, and states `required` on itself. In akasha a property is its own reusable page and `required`, `many`, `max` and `default` sit on the owning page type's declaration instead, which `page-property.page-type.ts` states as `How many of a property a page carries is stated where it is declared rather than here`. Only 12 of the 2,073 slugs exist in akasha today, and 118 of them describe the thirteen dead meta types and so need nothing.\n\nThe genuinely unbuilt part of this group is small: view, nav, file-kind, file-purpose, list and option-list, 139 files between them, and view and nav may belong in code rather than as pages.",
} as const satisfies Finding
