import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const tower = {
  id: "01a05bc6-fa4a-700a-99c7-cbcfb62ed5ee",
  type: "domain",
  slug: "tower",
  definition: "a tower game's chapters, rolls and combatants as its saved story has them",
  parts: [
    "domain/core",
    "domain/engine",
    "module/combat-mapping",
    "module/page-slugs",
    "module/plan-archive",
    "module/render-chapter",
    "module/resolve-hero",
    "module/retrofit-system-cards",
    "module/roll-payload",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The sheet a combatant is stored as is wider than the combatant the combat engine takes.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter is written out from the beats between its two ends.",
    },
    {
      invariantKind: "departure",
      statement: "A saved game is read by the shapes story-tower-core states.",
    },
  ],
} as const satisfies Domain
