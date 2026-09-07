import type { Domain } from "../../../domains/domain.page-type.ts"

export const changeGuardFile = {
  id: "01a07c8a-6826-7f7b-bbb9-1dc580e4513f",
  pageTypeSlug: "domain",
  slug: "change-guard-file",
  definition: "the guards judging a file rather than what that file holds",
  pluralSlug: "change-guard-file",
  partSlugs: ["change-guard/body-not-written-over", "change-guard/claimed-file-not-left-behind"],
} as const satisfies Domain
