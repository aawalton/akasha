import type { Module } from "../../code-system/modules/module.page-type.ts"

export const terminalSync = {
  id: "01a06811-01d3-7007-b8c1-0a170c1070e7",
  pageTypeSlug: "module",
  slug: "terminal-sync",
  definition: "the name and the color a terminal is given for the seat standing in it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A terminal reporting no process is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal that never reported a process is given one fixed name.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal is renamed only where the name it carries differs.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal is recolored only where the color it carries differs.",
    },
    {
      invariantKind: "departure",
      statement: "A color is found by the agent id the seat name resolves to.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal with no color to give has its color cleared once.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal whose seat is gone is renamed for the shell running in it.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal whose shell is not in the ps snapshot keeps the name it has.",
    },
    {
      invariantKind: "departure",
      statement: "A reset says whether the seat went or the terminal answered at last.",
    },
    {
      invariantKind: "departure",
      statement: "Every rename and recolor is said on the channel handed in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a seat page.",
    },
  ],
} as const satisfies Module
