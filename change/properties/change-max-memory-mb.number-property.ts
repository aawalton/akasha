import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const changeMaxMemoryMb = {
  id: "01a0a01f-ef63-7e96-adb3-86b54936eb30",
  type: "page-type/number-property",
  slug: "change-max-memory-mb",
  propertySlug: "max-memory-mb",
  definition: "the most memory a run of a change may hold before the kernel reclaims, in megabytes",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A change stating no megabytes here is allowed the megabytes the runner names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change past these megabytes is slowed by reclaiming rather than stopped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The megabytes a change reaches hold count against the change reaching it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan settles a raise rather than the agent the ceiling slowed.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
