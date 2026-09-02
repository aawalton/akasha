import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const temper = {
  id: "01a05db7-8d7c-762b-a343-9535d258e0b5",
  pageTypeSlug: "domain",
  slug: "temper",
  definition: "a companion suite for The Elder Scrolls Online",
  pluralSlug: "tempers",
  partSlugs: [
    "domain/temper-catalog",
    "domain/temper-character",
    "domain/temper-holdings",
    "domain/temper-progress",
    "page-type/temper-thing",
    "workspace-package/temper-dungeons",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Where a thing falls among its siblings is stated by `display-order` and by no other property.",
    },
    {
      invariantKind: "departure",
      statement: "A page type temper carries is worked out from what its pages state.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property more than one page type carries is declared by a page type above them.",
    },
  ],
} as const satisfies Domain
