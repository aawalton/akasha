import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const trainingDigest = {
  id: "01a0685d-cca7-7e9b-9360-cb751e046389",
  pageTypeSlug: "module",
  slug: "training-digest",
  definition: "everything a coach reads before writing today's session, gathered as one answer",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The day the digest is of is the day counted from the reset rather than from midnight.",
    },
    {
      invariantKind: "departure",
      statement: "A focus named by the caller stands over the one the rotation schedules.",
    },
    {
      invariantKind: "departure",
      statement:
        "A day the rotation rests names no focus, and a digest of no focus holds no movement.",
    },
    {
      invariantKind: "departure",
      statement:
        "The movements the digest holds come from the sessions most recently trained at that focus.",
    },
    {
      invariantKind: "departure",
      statement:
        "The kit, the mobility and the constraints are read whether a focus is settled or not.",
    },
    {
      invariantKind: "departure",
      statement:
        "One part going unread refuses the whole digest rather than leaving that part empty.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides how the digest reads.",
    },
  ],
} as const satisfies Module
