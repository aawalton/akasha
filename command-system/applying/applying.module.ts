import type { Module } from "@akasha/code-system/module"

export const applying = {
  id: "01a0644c-3f10-7a2e-9c31-6b0e5d4a7f21",
  pageTypeSlug: "module",
  slug: "applying",
  definition: "the patch an agent holds landed onto the tree as one commit",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A patch is rebased onto the commit at HEAD before the patch is applied.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies the rebase leaves are what land.",
    },
    {
      invariantKind: "departure",
      statement: "A conflict refuses the apply and leaves the patch as the patch was.",
    },
    {
      invariantKind: "departure",
      statement: "A patch carrying a conflict does not apply.",
    },
    {
      invariantKind: "departure",
      statement: "A body carrying the marks a merge left is a body carrying a conflict.",
    },
    {
      invariantKind: "departure",
      statement: "Every path the patch carries a conflict at is named in the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "An apply is judged by the gate as any other landing is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A body the patch leaves is formatted before the gate judges that body.",
    },
    {
      invariantKind: "departure",
      statement: "A body the formatter moved is named in the answer.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading is recorded of the body the formatter left rather than the body drafted.",
    },
    {
      invariantKind: "departure",
      statement: "A reading never ages out.",
    },
    {
      invariantKind: "departure",
      statement: "A wiped record is what leaves an apply unwarranted.",
    },
    {
      invariantKind: "departure",
      statement: "A path the patch's base and HEAD hold alike was read when that path was drafted.",
    },
    {
      invariantKind: "departure",
      statement: "A reading for a path that did not move is recorded again from the body at HEAD.",
    },
    {
      invariantKind: "departure",
      statement: "A path that moved under the patch has no reading recorded for that path.",
    },
    {
      invariantKind: "departure",
      statement: "The warrant refuses a path that moved until the agent reads what moved.",
    },
    {
      invariantKind: "departure",
      statement: "A path the base commit did not hold has no body to have been read.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is recorded before the gate runs.",
    },
    {
      invariantKind: "departure",
      statement: "An apply the gate refused leaves those readings recorded.",
    },
    {
      invariantKind: "departure",
      statement: "A body an apply lands is recorded as read by the agent that called the apply.",
    },
    {
      invariantKind: "departure",
      statement: "An agent is never left owing a read of what that agent's own apply landed.",
    },
    {
      invariantKind: "departure",
      statement: "A patch applied is taken away with the ref keeping the blobs of that patch.",
    },
    {
      invariantKind: "departure",
      statement: "A patch the gate refused is left where the patch is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is applied for a path that is no page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is applied where no patch is kept.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes the hold.",
    },
  ],
} as const satisfies Module
