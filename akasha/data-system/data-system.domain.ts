import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const dataSystem = {
  id: "01a04a4a-23e8-727d-9100-e7c941b99932",
  pageTypeSlug: "domain",
  slug: "data-system",
  definition: "how what the pages imply is derived and written down",
  partSlugs: ["domain/index"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The data system is written under `.git/data`, which git does not track.",
    },
    {
      invariantKind: "departure",
      statement: "Every part of the data system can be written again from the pages alone.",
    },
  ],
} as const satisfies Domain
