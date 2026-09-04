import type { Module } from "@akasha/code-system/module"

export const supervisorRcDegradedDecide = {
  id: "01a0686d-9d5e-7002-ae93-c2861807113f",
  pageTypeSlug: "module",
  slug: "supervisor-rc-degraded-decide",
  definition: "whether a seat whose remote control has gone quiet is alerted about on this tick",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tick that read no edge count decides nothing and leaves the streak as it was.",
    },
    {
      invariantKind: "departure",
      statement:
        "A degraded reading alerts only once the degraded streak has reached the debounce streak.",
    },
    {
      invariantKind: "departure",
      statement: "A seat already latched as alerted is not alerted again.",
    },
    {
      invariantKind: "departure",
      statement:
        "A child younger than the boot settle is given the settle before anything is said about it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A child past the settle and under the boot ceiling reads as booting dark rather than as degraded.",
    },
    {
      invariantKind: "departure",
      statement:
        "A latch clears only once the healthy streak reaches the recovery streak and the re-alert cooldown has passed.",
    },
    {
      invariantKind: "departure",
      statement: "A seat resuming quietly for maintenance is not alerted about.",
    },
  ],
} as const satisfies Module
