import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const terminalBash = {
  id: "01a0680a-fa30-73ea-803a-5ff0bd947f73",
  type: "page-type/module",
  slug: "terminal-bash",
  definition: "the whole of the bash a terminal reads in, composed as a text",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The text is composed whole rather than patched onto the bash a terminal already has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name that was once an alias is unaliased before that name is defined as a function.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account gets one launcher named for the alias index that account has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The launchers are in the order of the alias indexes rather than of the slugs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every launcher reloads the whole set before that launcher dispatches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A comment above a block states the block's purpose.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page or the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The `gp` alias reaches the checkout's own akasha, as every launcher does.",
    },
  ],
  createdAt: "2026-09-03T16:12:25.008Z",
  updatedAt: "2026-10-30T16:23:39.230Z",
} as const satisfies Module
