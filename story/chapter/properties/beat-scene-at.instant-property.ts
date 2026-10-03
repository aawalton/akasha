import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const beatSceneAt = {
  id: "01a1023a-d04b-79fc-9172-0da36579faf1",
  type: "page-type/instant-property",
  slug: "beat-scene-at",
  propertySlug: "at",
  definition: "the in-game date and clock time a beat happens at",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat's time is never before the time of any beat before it in its story.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
