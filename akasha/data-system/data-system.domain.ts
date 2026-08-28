import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const dataSystem = {
  id: "01a04a4a-23e8-727d-9100-e7c941b99932",
  pageTypeSlug: "domain",
  slug: "data-system",
  definition: "what is worked out from the pages and written down",
  partSlugs: [
    "index",
  ],
  requiredReadingSlugs: [
    "index",
  ],
  design: [
    "The data system is written under `.git/data`, which git does not track.",
    "Nothing here is a source: every part of it can be written again from the pages alone.",
  ],
} as const satisfies Domain
