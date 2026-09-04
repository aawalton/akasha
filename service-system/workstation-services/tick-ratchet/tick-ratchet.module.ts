import type { Module } from "@akasha/code-system/module"

export const tickRatchet = {
  id: "01a06885-0bab-7001-9235-a701e25dd098",
  pageTypeSlug: "module",
  slug: "tick-ratchet",
  definition: "the run of throws a standing service is allowed before it has to end",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tick that works takes the run of throws back to nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A run of throws that reaches the threshold spends the ratchet.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run of throws is counted in whole ticks from one, and any other threshold is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "What the ratchet says on the way out names the service, the run and the threshold.",
    },
    {
      invariantKind: "absence",
      statement:
        "A loop that catches its own throw and logs it leaves the unit reading healthy, so ending is the only thing the unit can see.",
    },
  ],
} as const satisfies Module
