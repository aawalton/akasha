import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatRoleOnCall = {
  id: "01a0766c-11c7-79de-aa16-8aafc180ce58",
  type: "page-type/module",
  slug: "seat-role-on-call",
  definition: "how code reads whether work is sent to the seats of a role",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A role is on call only where that role's page holds true under the on-call key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Anything other than true under that key reads as not on call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The role asked for is reached by its slug rather than by reading what every role carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A role's answer is worked out once for each call and afresh outside every call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug naming no role is not on call.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a seat.",
    },
  ],
} as const satisfies Module
