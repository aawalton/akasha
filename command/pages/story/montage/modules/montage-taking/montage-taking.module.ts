import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const montageTaking = {
  id: "01a17ef5-e63b-740c-bbaa-3db13e33d903",
  type: "page-type/module",
  slug: "montage-taking",
  definition: "what a call to run a montage is handed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading and an upkeep reading are JSON keyed by the names the check reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no sessions, no end and no crossing is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session passes at least one minute, and a montage runs at least one session.",
    },
  ],
  createdAt: "2026-10-27T20:03:26.902Z",
  updatedAt: "2026-10-27T20:03:26.902Z",
} as const satisfies Module
