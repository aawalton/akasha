import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const turnInterruptsAt = {
  id: "01a17ee6-ec65-70ee-94be-c94db6c72d17",
  type: "page-type/instant-property",
  slug: "turn-interrupts-at",
  propertySlug: "interrupts-at",
  definition: "the first instant in a played turn's span at which the world breaks in",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The world builder states this, and nothing of what breaks in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A montage runs no session whose span reaches this instant.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-27T19:47:05.445Z",
  updatedAt: "2026-10-27T19:47:05.445Z",
} as const satisfies InstantProperty
