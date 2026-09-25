import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const codeSync = {
  id: "01a0d968-4246-79b8-b6c4-37fa57fc7199",
  type: "page-type/record-property",
  slug: "code-sync",
  propertySlug: "code-sync",
  definition: "the checkout of the repository a workload's pod keeps and serves from",
  properties: [
    { pageProperty: "text-property/code-cache-path", required: true, many: false },
    { pageProperty: "number-property/min-memory-mb", required: true, many: false },
    { pageProperty: "number-property/kill-memory-mb", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A workload stating this serves its checkout rather than an image built for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checkout is cloned from the cluster's own git service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The memory stated is the memory of the container keeping the checkout.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
