import type { Domain } from "../domains/domain.page-type.ts"

export const archiveOfWorlds = {
  id: "01a06582-2736-7dc0-bf64-089e264753bf",
  pageTypeSlug: "domain",
  slug: "archive-of-worlds",
  definition: "the original fiction Alan publishes for readers to find",
  pluralSlug: "archives-of-worlds",
  partSlugs: ["router-app/archive-of-worlds-web"],
} as const satisfies Domain
