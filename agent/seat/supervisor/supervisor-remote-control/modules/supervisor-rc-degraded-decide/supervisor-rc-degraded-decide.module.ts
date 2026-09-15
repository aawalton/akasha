import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorRcDegradedDecide = {
  id: "01a0686d-9d5e-7002-ae93-c2861807113f",
  type: "page-type/module",
  slug: "supervisor-rc-degraded-decide",
  definition: "whether a seat whose remote control has gone quiet is alerted about on this tick",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A tick that read no edge count decides nothing and leaves the streak as that streak was.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A degraded reading alerts only once the degraded streak has reached the debounce streak.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat already latched as alerted is not alerted again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A child younger than the boot settle is given the settle before anything is said about that child.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A child past the settle and under the boot ceiling reads as booting dark rather than as degraded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A latch clears only once a healthy streak meets the recovery streak and the re-alert cooldown is up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat resuming quietly for maintenance is not alerted about.",
    },
  ],
} as const satisfies Module
