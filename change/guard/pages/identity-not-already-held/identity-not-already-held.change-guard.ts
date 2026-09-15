import type { ChangeGuard } from "akasha/change/guard/change-guard.page-type.types.ts"

export const identityNotAlreadyHeld = {
  id: "01a0797f-d415-717a-919e-cc0760a816fd",
  type: "change-guard",
  slug: "identity-not-already-held",
  changeTargetType: "change-target-type/file-content",
  definition: "the guard refusing an answer whose written page takes an identity another page has",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The identity a page takes is read from the index the answer leaves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page the answer moves has its identity at one path alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An `id` another page has refuses the answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `slug` another page of the same page type holds refuses the answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal names the path already with the identity.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path under no page name is judged by nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index a guard cannot read refuses the answer.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "The properties judged here are `id` and `slug` rather than every unique property.",
    },
  ],
} as const satisfies ChangeGuard
