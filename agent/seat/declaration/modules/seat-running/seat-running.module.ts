import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatRunning = {
  id: "01a069d0-78a2-7758-8c1f-002d4bc214c2",
  type: "page-type/module",
  slug: "seat-running",
  definition: "how code writes a seat's page from the attributes an agent chooses",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The command reads the arguments and writes the answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function the command calls reads no argument and writes no answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stating that is refused is answered with the refusal's words rather than ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer has the bytes the command writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The command and this file's own entry point share one shell over the stating.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The stating function reaches no stream and no exit code.",
    },
  ],
} as const satisfies Module
