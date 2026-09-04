import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const worldMechanics = {
  id: "01a06558-a991-7262-a276-d39ec7040d0b",
  pageTypeSlug: "domain",
  slug: "world-mechanics",
  definition: "the things a world does the same way every time",
  partSlugs: [
    "page-type/world-mechanic",
    "page-type/world-skill",
    "page-type/world-class",
    "page-type/world-spell",
    "page-type/world-condition",
    "page-type/world-curse",
    "page-type/world-boon",
    "page-type/world-enchantment",
    "page-type/world-miracle",
    "page-type/world-species",
    "page-type/world-aspect",
    "page-type/world-title",
    "page-type/world-legacy",
    "page-type/world-quest",
    "page-type/world-item",
    "page-type/world-recipe",
    "page-type/world-song",
    "page-type/world-reputation",
    "page-type/world-religion",
    "page-type/world-carried-memory",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every kind of mechanic carries what the base carries and adds nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A kind is its own page type so one kind's slugs stand alone.",
    },
    {
      invariantKind: "departure",
      statement: "Thirty-one names stand in two kinds at once.",
    },
    {
      invariantKind: "upkeep",
      statement: "Every mechanic a world's readings name is a page of a type this domain holds.",
    },
  ],
} as const satisfies Domain
