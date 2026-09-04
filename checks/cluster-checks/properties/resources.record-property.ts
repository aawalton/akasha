import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { LimitMemory } from "./limit-memory.text-property.ts"
import type { RequestCpu } from "./request-cpu.text-property.ts"
import type { RequestMemory } from "./request-memory.text-property.ts"

export type Resources = {
  requestMemory?: RequestMemory
  limitMemory?: LimitMemory
  requestCpu?: RequestCpu
}

export const resources = {
  id: "01a0680b-1003-7852-af3a-301ea6acbcc3",
  pageTypeSlug: "record-property",
  slug: "resources",
  propertySlug: "resources",
  definition: "the compute a pod asks for and is held to",
  properties: [
    { pagePropertySlug: "request-memory", required: false, many: false },
    { pagePropertySlug: "limit-memory", required: false, many: false },
    { pagePropertySlug: "request-cpu", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A check stating nothing here is run on whatever the cluster gives it.",
    },
  ],
} as const satisfies RecordProperty
