import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatRoleOnCall = {
  id: "01a0766c-11c7-79de-aa16-8aafc180ce58",
  type: "module",
  slug: "seat-role-on-call",
  definition: "whether a role is on call, read from that role's own page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A role is on call only where that role's page holds true under the on-call key.",
    },
    {
      invariantKind: "departure",
      statement: "Anything other than true under that key reads as not on call.",
    },
    {
      invariantKind: "departure",
      statement:
        "The role asked for is reached by its slug rather than by reading what every role carries.",
    },
    {
      invariantKind: "departure",
      statement: "A role's answer is worked out once for each call and afresh outside every call.",
    },
    {
      invariantKind: "departure",
      statement: "A slug naming no role is not on call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a seat.",
    },
  ],
} as const satisfies Module
