import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const cpuShare = {
  id: "01a0d5a4-0c8c-708b-a9db-f61bee1c7566",
  type: "page-type/number-property",
  slug: "cpu-share",
  propertySlug: "cpu-share",
  definition: "the weight a thing is given against others wanting the processor at once",
  max: 10000,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The weight is the one systemd states as `CPUWeight`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing stating no share is given the weight systemd gives every unit.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
