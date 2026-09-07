import type { ChangeGuard } from "../../change-guard.page-type.ts"

export const identityNotAlreadyHeld = {
  id: "01a0797f-d415-717a-919e-cc0760a816fd",
  pageTypeSlug: "change-guard",
  slug: "identity-not-already-held",
  definition:
    "the guard refusing an answer whose written page takes an identity another page holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The identity a page takes is read from the index the answer leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A page the answer moves holds its identity at one path alone.",
    },
    {
      invariantKind: "departure",
      statement: "An `id` another page holds refuses the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A `slug` another page of the same page type holds refuses the answer.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the path already holding the identity.",
    },
    {
      invariantKind: "departure",
      statement: "A path under no page name is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "An index a guard cannot read refuses the answer.",
    },
    {
      invariantKind: "gap",
      statement:
        "The properties judged here are `id` and `slug` rather than every unique property.",
    },
  ],
} as const satisfies ChangeGuard
