import type { Module } from "@akasha/code-system/module"

export const serverErrorRetry = {
  id: "01a0643b-c947-7454-86f4-50dab4df4448",
  pageTypeSlug: "module",
  slug: "server-error-retry",
  definition: "the attempts a request makes again at one account while upstream keeps failing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A 429 is a status a retry may be made against.",
    },
    {
      invariantKind: "departure",
      statement: "A 500 is a status a retry may be made against.",
    },
    {
      invariantKind: "departure",
      statement: "A 502 is a status a retry may be made against.",
    },
    {
      invariantKind: "departure",
      statement: "A 503 is a status a retry may be made against.",
    },
    {
      invariantKind: "departure",
      statement: "A 529 is a status a retry may be made against.",
    },
    {
      invariantKind: "departure",
      statement: "A status this module names nowhere is retried nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A response the server-error classifier does not match is retried nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A response the classifier does not match resolves carrying its own body.",
    },
    {
      invariantKind: "departure",
      statement: "Every retry goes to the account the failing attempt was made at.",
    },
    {
      invariantKind: "departure",
      statement: "Every retry carries the token of the account being retried.",
    },
    {
      invariantKind: "departure",
      statement: "Every retry carries the body of the request that failed.",
    },
    {
      invariantKind: "departure",
      statement: "A retry waits the schedule at the attempt's index.",
    },
    {
      invariantKind: "departure",
      statement: "A `retry-after` header sets the wait rather than the schedule.",
    },
    {
      invariantKind: "departure",
      statement: "A request makes one retry for each entry the schedule holds.",
    },
    {
      invariantKind: "departure",
      statement: "An empty schedule makes no retry.",
    },
    {
      invariantKind: "departure",
      statement: "A retry that clears the error resolves with the retried response.",
    },
    {
      invariantKind: "departure",
      statement: "A retried status outside the retriable set resolves without being classified.",
    },
    {
      invariantKind: "departure",
      statement: "A retried status the classifier does not match resolves at once.",
    },
    {
      invariantKind: "departure",
      statement: "An error lasting through the schedule is answered persistent.",
    },
    {
      invariantKind: "departure",
      statement: "A persistent error carries the body of the last attempt.",
    },
    {
      invariantKind: "departure",
      statement: "A persistent error carries the status of the last attempt.",
    },
    {
      invariantKind: "departure",
      statement: "A persistent error is written about on the error seam.",
    },
    {
      invariantKind: "departure",
      statement: "Every retry is written about before that retry is made.",
    },
    {
      invariantKind: "departure",
      statement: "Every retry goes through `retry` so a dropped connection is tried again.",
    },
    {
      invariantKind: "departure",
      statement: "Each response body is read to text the once through `peek-response`.",
    },
    {
      invariantKind: "departure",
      statement: "The `retry-after` header is read off each attempt afresh.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in the forward every retry is sent through.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller may hand in the schedule so a test needs no real wait.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller may hand in the sleep so a test needs no real wait.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here chooses an account.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here disables an account.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "gap",
      statement: "The schedule is read off `server-error` where the caller names no schedule.",
    },
    {
      invariantKind: "gap",
      statement: "The sleep is a real timer where the caller names no sleep.",
    },
    {
      invariantKind: "gap",
      statement: "Every line written here goes to the console rather than to a seam.",
    },
    {
      invariantKind: "gap",
      statement: "A body already sent upstream is sent again without asking whether that is safe.",
    },
  ],
} as const satisfies Module
