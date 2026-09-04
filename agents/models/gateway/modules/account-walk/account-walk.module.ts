import type { Module } from "@akasha/code-system/module"

export const accountWalk = {
  id: "01a0643b-c948-7e10-80ea-1bf6e0c348e2",
  pageTypeSlug: "module",
  slug: "account-walk",
  definition: "one request carried from account to account until an answer comes back",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pool holding no account is answered empty with the trail `-`.",
    },
    {
      invariantKind: "departure",
      statement: "A pool holding no account is forwarded nowhere.",
    },
    {
      invariantKind: "departure",
      statement:
        "An account with no fresh token is forwarded carrying whatever token the client sent.",
    },
    {
      invariantKind: "departure",
      statement: "A fallthrough with no fresh token names the account that was chosen.",
    },
    {
      invariantKind: "departure",
      statement: "Every attempt carries the token read for the account being tried.",
    },
    {
      invariantKind: "departure",
      statement: "Every attempt goes through `retry` so a dropped connection is tried again.",
    },
    {
      invariantKind: "departure",
      statement: "A forward that throws is answered 502.",
    },
    {
      invariantKind: "departure",
      statement: "A forward that throws is written about on the error seam.",
    },
    {
      invariantKind: "departure",
      statement: "An account is added to the trail before that account is tried.",
    },
    {
      invariantKind: "departure",
      statement: "A 429 is handed to `server-error-retry` before any other handler.",
    },
    {
      invariantKind: "departure",
      statement: "A 500 is handed to `server-error-retry` before any other handler.",
    },
    {
      invariantKind: "departure",
      statement: "A 502 is handed to `server-error-retry` before any other handler.",
    },
    {
      invariantKind: "departure",
      statement: "A 503 is handed to `server-error-retry` before any other handler.",
    },
    {
      invariantKind: "departure",
      statement: "A 529 is handed to `server-error-retry` before any other handler.",
    },
    {
      invariantKind: "departure",
      statement: "A server error lasting through its retries is served as the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A 403 is handed to `permission-denied-rebind`.",
    },
    {
      invariantKind: "departure",
      statement: "A 400 is handed to `forced-tool-choice` once for a whole request.",
    },
    {
      invariantKind: "departure",
      statement: "A tool choice rewritten is replayed at the same account.",
    },
    {
      invariantKind: "departure",
      statement: "A 404 on an extended-context body replays the base sibling at the same account.",
    },
    {
      invariantKind: "departure",
      statement: "A base sibling is replayed once for a whole request.",
    },
    {
      invariantKind: "departure",
      statement: "A body downshifted to its base sibling is read again for the fable model.",
    },
    {
      invariantKind: "departure",
      statement: "The body of a 404 being replayed is cancelled rather than left open.",
    },
    {
      invariantKind: "departure",
      statement: "A 404 with no base sibling to try is handed to `model-unavailable-rebind`.",
    },
    {
      invariantKind: "departure",
      statement: "A 401 is handed to `auth-failed-retry` once for each account.",
    },
    {
      invariantKind: "departure",
      statement: "A 401 answered a newer credential is replayed at the same account.",
    },
    {
      invariantKind: "departure",
      statement: "A status under 400 that is no 429 is served.",
    },
    {
      invariantKind: "departure",
      statement: "A status at or above 400 that no handler took is written to the error seam.",
    },
    {
      invariantKind: "departure",
      statement: "An answer on a trail of one account names that account alone.",
    },
    {
      invariantKind: "departure",
      statement: "An answer on a longer trail names every account the request reached.",
    },
    {
      invariantKind: "departure",
      statement: "Every 429 is written about with its error type and its capacity class.",
    },
    {
      invariantKind: "departure",
      statement: "A 429 on a fast-mode request strips the speed and the beta before any mark.",
    },
    {
      invariantKind: "departure",
      statement: "A fast-mode strip is made once for a whole request.",
    },
    {
      invariantKind: "departure",
      statement: "A fast-mode strip replays the same account.",
    },
    {
      invariantKind: "departure",
      statement: "A 429 the capacity classifier calls not-capacity is served rather than rebound.",
    },
    {
      invariantKind: "departure",
      statement: "A 429 on a fable request rebinds without marking the account at its limit.",
    },
    {
      invariantKind: "departure",
      statement: "A 429 on any other request marks the account at its limit before rebinding.",
    },
    {
      invariantKind: "departure",
      statement: "The `retry-after` header of a 429 reaches the act marking the account.",
    },
    {
      invariantKind: "departure",
      statement: "Every 429 asks for the account's usage to be read again.",
    },
    {
      invariantKind: "departure",
      statement: "The usage read is asked for without waiting on the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A usage read that rejects is written about rather than left unhandled.",
    },
    {
      invariantKind: "departure",
      statement: "The accounts already tried are kept from every later choice.",
    },
    {
      invariantKind: "departure",
      statement: "A choice answering an account already tried is answered empty as `looped`.",
    },
    {
      invariantKind: "departure",
      statement: "A choice answering no account is answered empty as `no-viable-account`.",
    },
    {
      invariantKind: "departure",
      statement: "An account chosen with no fresh token is answered empty as `no-fresh-token`.",
    },
    {
      invariantKind: "departure",
      statement: "An empty answer names the trail of accounts the request reached.",
    },
    {
      invariantKind: "departure",
      statement: "A 429 body is read to text the once through `peek-response`.",
    },
    {
      invariantKind: "departure",
      statement: "The map of reasons to accounts lives as long as one request's run.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in the choice of an account.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in the read answering a fresh credential.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in the forward every attempt is sent through.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in each act that changes what an account is allowed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here loads a module to decide which handler a status reaches.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here waits between attempts at two accounts.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a transport row.",
    },
    {
      invariantKind: "absence",
      statement: "No answer here is built from a body this module invented.",
    },
    {
      invariantKind: "gap",
      statement:
        "`tools/lib/model-gateway/pick-pipeline.ts` leaves the usage read's rejection unhandled.",
    },
    {
      invariantKind: "gap",
      statement: "Every line written here goes to the console rather than to a seam.",
    },
    {
      invariantKind: "gap",
      statement: "A 502 answered for a transport error carries no body saying what failed.",
    },
    {
      invariantKind: "gap",
      statement: "A request replayed at the same account is added to the trail a second time.",
    },
    {
      invariantKind: "gap",
      statement: "The loop is bounded by the accounts filed rather than by a ceiling of its own.",
    },
    {
      invariantKind: "gap",
      statement: "A body already sent upstream is sent again without asking whether that is safe.",
    },
    {
      invariantKind: "gap",
      statement: "A request rebuilt for a fast-mode replay carries no body of its own.",
    },
  ],
} as const satisfies Module
