import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaMigration = {
  id: "01a049e9-651d-7000-9a0a-24d00bb35526",
  pageTypeSlug: "domain",
  slug: "akasha-migration",
  definition: "how the old system becomes the new system",
  partSlugs: ["domain/akasha-accretion", "domain/akasha-ablation", "domain/akasha-milestone"],
  requiredReadingSlugs: [],
  design: [
    {
      invariantKind: "constraint",
      statement: "Akasha is one repository, so anything built for many is left behind.",
    },
  ],
  rule: [
    {
      name: "Accrete And Ablate",
      act: "Accrete the new and ablate the old.",
      warrant:
        "Every complex system that works evolved incrementally from a simple system that worked.",
      aids: [
        "The new is not done while it has findings.",
        "The new is not done while the old exists.",
      ],
    },
  ],
} as const satisfies Domain
