import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const permissionDeniedRebind = {
  id: "01a0643b-c945-7a70-b5f1-62d8e7b25aa3",
  type: "module",
  slug: "permission-denied-rebind",
  definition: "the account a request moves to after one account is refused permission",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A 403 the permission classifier matches moves the request to another account.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rebind has the credential read for the account moved to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A matched denial disables the account that was refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A matched denial disables that account before another account is chosen.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reason the classifier read is the reason the account is disabled for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The accounts already tried are kept from the choice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A 403 the classifier does not match is answered rather than rebound.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unmatched 403 disables no account.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unmatched 403 on a trail of one account goes to the seam handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unmatched 403 on a longer trail names every account the request reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer has the body text upstream sent.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "No account left to choose is answered rather than rebound.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "An account already tried coming back is written about as `looped`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account with no fresh token is answered rather than rebound.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account with no fresh token is named in the line written about that account.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The account stays disabled where no account is left to move to.",
    },

    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller hands in the choice of the next account.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller hands in the read answering a fresh credential.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller hands in the act disabling an account.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here sends a request.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here waits.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes to the error seam.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every 403 answered here is answered 403.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "`tools/lib/model-gateway/permission-denied-rebind.ts` reads 403 rather than the response's status.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Every line written here goes to the console rather than to a seam.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "An account disabled here is re-enabled by nothing the rebind reaches.",
    },
  ],
} as const satisfies Module
