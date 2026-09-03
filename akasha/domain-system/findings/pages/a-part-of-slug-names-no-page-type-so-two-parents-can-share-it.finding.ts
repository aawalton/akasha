import type { Finding } from "../finding.page-type.ts"

export const aPartOfSlugNamesNoPageTypeSoTwoParentsCanShareIt = {
  id: "01a06748-3c02-7000-9b5e-41f7a0c8d233",
  pageTypeSlug: "finding",
  slug: "a-part-of-slug-names-no-page-type-so-two-parents-can-share-it",
  domainSlug: "domain/akasha-migration",
  claim:
    "`part-of-slugs` carries a bare slug with no page type in front of it, and a slug is unique only within a page type. Where two page types both hold a page of the same slug, what a page is part of is ambiguous in the data, and a check that only asks whether the parent exists will pass a page hung under the wrong one.",
  evidence:
    'Found in the screen family, which is the one part of the library that has real depth: 147 episodes under 8 seasons under 2 shows under 1 franchise. `sword-art-online` is a franchise slug AND a show slug. So `partOfSlugs: ["sword-art-online"]` on the show page reads two ways, and the reading that is right — the franchise — is right only because the markdown it came from named a uuid. Nothing on the landed page says which. ' +
    "It is correct today. All 160 parent references across the family resolve, and resolve to a parent of the right kind, checked against an index of 24,850 collection slugs across 23 collection page types. The hazard is that the data cannot say so itself. " +
    "This is a hazard rather than a defect, and it belongs to `part-of-slugs` rather than to any page that states one. `part-of-slugs` targets `page-type/collection`, which is 23 page types rather than one, so uniqueness of the slug is exactly what is not guaranteed. Every other relation in this system either targets one page type or carries the type in the slug, as `unit-slug` states `words` against a single `unit` type and `page-type-slug` states `page-type/page`. " +
    "The choice was mine and I would make it again: one relation carrying work, instalment and shelf alike is what let nineteen old page types become one shape instead of nineteen. But a relation reaching across 23 types wants the type said, the way `part-slugs` already says `page-type/book` and `module/change`, and that is the change to weigh. " +
    "What is owed before anyone acts: a count of how many slugs are held by more than one collection page type across the whole library. One is known. Nobody has looked for the rest, and the number decides whether this is a rename of a few pages or a change to the relation.",
} as const satisfies Finding
