import type { Domain } from "../../../domains/domain.page-type.ts"

export const changeGuardFileContent = {
  id: "01a07c8a-74f5-71f7-8813-92988ed80b89",
  pageTypeSlug: "domain",
  slug: "change-guard-file-content",
  definition: "the guards judging what a file holds rather than where that file sits",
  pluralSlug: "change-guard-file-content",
  partSlugs: [
    "change-guard/import-not-left-hanging",
    "change-guard/import-reaches-a-file",
    "change-guard/relation-not-left-hanging",
    "change-guard/relation-reaches-a-page",
    "change-guard/identity-not-already-held",
    "change-guard/field-key-not-carried-twice",
    "change-guard/plural-slug-not-already-held",
    "change-guard/page-type-carries-no-pages",
  ],
} as const satisfies Domain
