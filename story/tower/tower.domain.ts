import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const tower = {
  id: "01a05bc6-fa4a-700a-99c7-cbcfb62ed5ee",
  pageTypeSlug: "domain",
  slug: "tower",
  definition: "a tower game's chapters, rolls and combatants as its saved story holds them",
  partSlugs: [
    "domain/core",
    "domain/engine",
    "module/page-slugs",
    "module/combat-mapping",
    "module/roll-payload",
    "module/plan-archive",
    "module/render-chapter",
    "module/resolve-hero",
    "module/retrofit-system-cards",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "What is stored of a combatant is wider than what the combat engine takes.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter is written out from the beats standing between its two ends.",
    },
    {
      invariantKind: "departure",
      statement: "A saved game is read by the shapes story-tower-core states.",
    },
  ],
} as const satisfies Domain
