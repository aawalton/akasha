import type { Module } from "@akasha/code-system/module"

export const claudeAccountReading = {
  id: "01a0632e-9847-7000-b57a-2eb827483f2f",
  pageTypeSlug: "module",
  slug: "claude-account-reading",
  definition: "what a claude-account holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Reading one account by slug reads one index file for that slug.",
    },
    {
      invariantKind: "departure",
      statement:
        "Reading one account by slug opens that account's page and no other account's page.",
    },
    {
      invariantKind: "departure",
      statement: "The whole fleet is listed by one function here.",
    },
    {
      invariantKind: "departure",
      statement: "A fleet answer is that listing followed by a single-account read for each slug.",
    },
    {
      invariantKind: "departure",
      statement: "An account's slug is read off the name of that account's page file.",
    },
    {
      invariantKind: "departure",
      statement: "The claude-account page type is reached by its id rather than by a spelled slug.",
    },
    {
      invariantKind: "departure",
      statement: "What is observed of an account is read from the file beside that account's page.",
    },
    {
      invariantKind: "departure",
      statement: "A value is read under the key akasha declares that value as.",
    },
    {
      invariantKind: "departure",
      statement: "The old `retry-after` key is read as `retryAllowedAt`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rescued pair is preferred where that pair's expiry is later than the committed expiry.",
    },
    {
      invariantKind: "departure",
      statement: "A rescued pair expiring no later than the committed pair is left aside.",
    },
    {
      invariantKind: "departure",
      statement: "An account no page is filed for is answered as absent.",
    },
    {
      invariantKind: "departure",
      statement: "A sops file that will not decrypt is answered as absent.",
    },
    {
      invariantKind: "departure",
      statement: "A credential whose access-token expiry will not parse is answered as absent.",
    },
    {
      invariantKind: "departure",
      statement: "A withdrawn subscription is carried as the reason text rather than as a flag.",
    },
    {
      invariantKind: "departure",
      statement:
        "An account's state and that account's credential come from one reading of a page.",
    },
    {
      invariantKind: "constraint",
      statement: "The repository root reaches every reader here as a parameter.",
    },
    {
      invariantKind: "constraint",
      statement: "The reader of an account's secrets reaches this module as a parameter.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller names the account a single-account read answers about.",
    },
    {
      invariantKind: "constraint",
      statement: "Every path read here sits under the root the caller hands in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here fetches.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a root from the environment.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decrypts.",
    },
    {
      invariantKind: "absence",
      statement: "No map of the fleet is remembered between reads.",
    },
    {
      invariantKind: "absence",
      statement: "No secret value is written to a log here.",
    },
    {
      invariantKind: "stopgap",
      statement: "A rescued pair spelled in kebab-case is read as one spelled in akasha's keys.",
    },
    {
      invariantKind: "gap",
      statement: "A fleet answer opens the page of every account listed.",
    },
    {
      invariantKind: "gap",
      statement: "An account whose page will not load is left out of a fleet answer.",
    },
    {
      invariantKind: "gap",
      statement: "A fleet credential answer decrypts the sops file beside every account listed.",
    },
    {
      invariantKind: "gap",
      statement: "An account's scopes are read as text and are matched against no declared scope.",
    },
  ],
} as const satisfies Module
