import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const sessionSelection = {
  id: "01a0685e-89d5-7dd9-b823-0077d74d5cf3",
  pageTypeSlug: "module",
  slug: "session-selection",
  definition: "the movements a session runs, slot by slot, with what each was picked over",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Slots are filled in the order the template states them.",
    },
    {
      invariantKind: "departure",
      statement: "A movement fills at most one slot of a session.",
    },
    {
      invariantKind: "departure",
      statement: "A movement already performed today holds the slot it fits.",
    },
    {
      invariantKind: "departure",
      statement: "The anchor and the finisher are outside the novelty budget.",
    },
    {
      invariantKind: "departure",
      statement: "Recency is not weighed for the anchor.",
    },
    {
      invariantKind: "departure",
      statement: "A slot that cannot be filled is reported with the reason it could not.",
    },
    {
      invariantKind: "departure",
      statement: "Every decision names the rules that fired and the four next best it passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The plan is what to do and the envelope is why.",
    },
  ],
} as const satisfies Module
