import type { Domain } from "../../../../domains/domain.page-type.ts"

export const bootstrapLayers = {
  id: "01a0675b-16d6-7813-8ade-362de2107d1b",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "bootstrap-layers",
  definition: "the ordered stages an empty cluster is brought up in",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The toolchain layer reuses exactly two of `prep.workflow`'s steps.",
    },
    {
      invariantKind: "departure",
      statement: "The private CI image `ci-images` builds does not exist before L3.",
    },
  ],
} as const satisfies Domain
