import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaMigration = {
  id: "01a049e9-651d-7000-9a0a-24d00bb35526",
  pageTypeSlug: "domain",
  slug: "akasha-migration",
  definition: "how the old system becomes the new system",
  partSlugs: ["domain/akasha-accretion", "domain/akasha-ablation", "domain/akasha-milestone"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing is built for more than this repository.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Accrete And Ablate",
      act: "Accrete the new and ablate the old.",
      warrant:
        "Every complex system that works evolved incrementally from a simple system that worked.",
      aids: [
        "The new is not done while it has findings.",
        "The new is not done while the old exists.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Land In Pieces",
      act: "Split a change into landings that each stand on their own.",
      warrant: "A change too large to gather in one sitting is stale before it lands.",
      aids: [
        "Make the reader take both shapes first.",
        "Keep it whole only where half would read wrong.",
      ],
    },
  ],
} as const satisfies Domain
