import type { Module } from "@akasha/code-system/module"

export const permissionDeniedRebind = {
  id: "01a0643b-c945-7a70-b5f1-62d8e7b25aa3",
  pageTypeSlug: "module",
  slug: "permission-denied-rebind",
  definition: "the account a request moves to after one account is refused permission",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A 403 the permission classifier matches moves the request to another account.",
    },
    {
      invariantKind: "departure",
      statement: "A rebind carries the credential read for the account moved to.",
    },
    {
      invariantKind: "departure",
      statement: "A matched denial disables the account that was refused.",
    },
    {
      invariantKind: "departure",
      statement: "A matched denial disables that account before another account is chosen.",
    },
    {
      invariantKind: "departure",
      statement: "The reason the classifier read is the reason the account is disabled for.",
    },
    {
      invariantKind: "departure",
      statement: "The accounts already tried are kept from the choice.",
    },
    {
      invariantKind: "departure",
      statement: "A 403 the classifier does not match is answered rather than rebound.",
    },
    {
      invariantKind: "departure",
      statement: "An unmatched 403 disables no account.",
    },
    {
      invariantKind: "departure",
      statement: "An unmatched 403 on a trail of one account goes to the seam handed in.",
    },
    {
      invariantKind: "departure",
      statement: "An unmatched 403 on a longer trail names every account the request reached.",
    },
    {
      invariantKind: "departure",
      statement: "An answer carries the body text upstream sent.",
    },
    {
      invariantKind: "departure",
      statement: "An answer carries the status text upstream sent.",
    },
    {
      invariantKind: "departure",
      statement: "An answer carries the headers upstream sent.",
    },
    {
      invariantKind: "departure",
      statement: "No account left to choose is answered rather than rebound.",
    },
    {
      invariantKind: "departure",
      statement: "No account left to choose is written about as `no-viable-account`.",
    },
    {
      invariantKind: "departure",
      statement: "An account already tried coming back is written about as `looped`.",
    },
    {
      invariantKind: "departure",
      statement: "An account with no fresh token is answered rather than rebound.",
    },
    {
      invariantKind: "departure",
      statement: "An account with no fresh token is named in the line written about that account.",
    },
    {
      invariantKind: "departure",
      statement: "The account stays disabled where no account is left to move to.",
    },
    {
      invariantKind: "departure",
      statement: "The response body is read to text the once through `peek-response`.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in the choice of the next account.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in the read answering a fresh credential.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in the act disabling an account.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here sends a request.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here waits.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to the error seam.",
    },
    {
      invariantKind: "departure",
      statement: "Every 403 answered here is answered 403.",
    },
    {
      invariantKind: "gap",
      statement:
        "`tools/lib/model-gateway/permission-denied-rebind.ts` reads 403 rather than the response's status.",
    },
    {
      invariantKind: "gap",
      statement: "Every line written here goes to the console rather than to a seam.",
    },
    {
      invariantKind: "gap",
      statement: "An account disabled here is re-enabled by nothing the rebind reaches.",
    },
  ],
} as const satisfies Module
