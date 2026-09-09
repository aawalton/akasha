import type { Module } from "@akasha/code/module"

export const seatRoleOnCall = {
  id: "01a0766c-11c7-79de-aa16-8aafc180ce58",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-role-on-call",
  definition: "which roles are on call, read from what the role pages carry",
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
      statement: "A role naming no slug is left out rather than added under an empty name.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every role is answered by one read of the index rather than by a read for each role.",
    },
    {
      invariantKind: "departure",
      statement: "The set is worked out once for each call and afresh outside every call.",
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
