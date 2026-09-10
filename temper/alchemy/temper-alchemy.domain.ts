import type { Domain } from "../../domains/domain.page-type.types.ts"

export const temperAlchemy = {
  id: "01a06076-1b69-7174-a838-dc7b0b111961",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-alchemy",
  definition: "the potions and poisons a character brews from reagents",
  parts: [
    "module/poison-effect",
    "module/poison-source",
    "module/potion-traits",
    "module/reagent",
    "module/potion-source",
    "module/potions-crown",
    "module/potions-dropped",
    "module/potions-crafted",
    "module/potions-crafted-health",
    "module/potions-crafted-magicka",
    "module/potions-crafted-stamina",
    "module/potions-crafted-other",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A potion is reached by its kebab id rather than by the game's item number.",
    },
    {
      invariantKind: "departure",
      statement: "The potion and reagent tables here are written out from the temper pages.",
    },
  ],
} as const satisfies Domain
