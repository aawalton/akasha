import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const entityClass = {
  id: "01a0c633-c2ca-709c-8d60-e4931291457c",
  type: "page-type/text-property",
  slug: "entity-class",
  propertySlug: "class",
  definition: "what this one is called in the game's own rules, as its sheet shows it",
  maxLength: 60,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A class is written as its game writes it rather than as a slug is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entity with no class in its game says none rather than saying `None`.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
