import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const fileSystem = {
  id: "01a05231-61c5-775c-a479-ffa46b4fe6bc",
  pageTypeSlug: "domain",
  slug: "file-system",
  definition: "how processes on one machine take turns over the files they write",
  partSlugs: ["module/lock-holder"],
} as const satisfies Domain
