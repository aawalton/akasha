import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const containerImage = {
  id: "01a0675b-16dc-759d-9b19-cf1118f36276",
  pageTypeSlug: "domain",
  slug: "container-image",
  definition: "a built copy of everything a program needs to run",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An image is tagged with a hash of what went into building it rather than a name or a version.",
    },
  ],
} as const satisfies Domain
