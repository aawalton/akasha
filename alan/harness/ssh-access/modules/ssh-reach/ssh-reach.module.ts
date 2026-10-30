import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sshReach = {
  id: "01a05c2f-0f03-7c3a-84db-8888d5bebc83",
  type: "page-type/module",
  slug: "ssh-reach",
  definition: "how code runs a script on another machine through SSH",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The script is handed over standard input rather than written into the command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host key is not checked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An exit that is not zero is an operational error rather than a thrown fault.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That error carries whole what the host printed before the exit that was not zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader letting go before the output ends kills the command.",
    },
  ],
  createdAt: "2026-09-01T08:56:23.043Z",
  updatedAt: "2026-10-30T16:11:18.333Z",
} as const satisfies Module
