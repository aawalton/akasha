import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const subagentSpawnDepth = {
  id: "01a0687a-3d9a-7e37-838e-669798f54b55",
  type: "page-type/number-property",
  slug: "subagent-spawn-depth",
  propertySlug: "subagent-spawn-depth",
  definition: "the limit on steps from a seat to a subagent under the seat",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
