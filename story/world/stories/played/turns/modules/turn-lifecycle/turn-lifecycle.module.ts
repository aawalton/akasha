import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnLifecycle = {
  id: "01a0dec2-87a0-7072-b427-5155e34684b0",
  type: "page-type/module",
  slug: "turn-lifecycle",
  definition: "the statuses a played turn or written chapter moves through",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is made only once the turn before it reaches player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's slug is the one before it with its last number one higher, as padded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice of a turn names its path and its status, and nothing of its content.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "A notice also names each lore page its seat read that has changed since, by path alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice names no lore page withheld from its seat.",
    },
  ],
} as const satisfies Module
