import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const locationDepth = {
  id: "01a0c643-baaf-7470-8d8e-d86e077c2c54",
  type: "page-type/number-property",
  slug: "location-depth",
  propertySlug: "depth",
  definition: "how far into its game a place sits, counted the way that game counts",
  nullable: false,
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A game counting its places in one line orders them by this.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place inside another takes the depth of the place it is inside.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
