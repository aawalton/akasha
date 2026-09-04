import type { NumberProperty } from "@akasha/pages-system/number-property"

export type SubagentSpawnDepth = number

export const subagentSpawnDepth = {
  id: "01a0687a-3d9a-7e37-838e-669798f54b55",
  pageTypeSlug: "number-property",
  slug: "subagent-spawn-depth",
  propertySlug: "subagent-spawn-depth",
  definition: "how many levels of subagent a seat's work nests",
  max: null,
} as const satisfies NumberProperty
