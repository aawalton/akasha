import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelAccountReading = {
  id: "01a0632e-9847-7000-b57a-2eb827483f2f",
  type: "module",
  slug: "model-account-reading",
  definition: "what a model-account has",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  pageBodyReaders: ["accountValuesIn"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Reading one account by slug reads one index file for that slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Reading one account by slug opens that account's page and no other account's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The whole fleet is answered by one function here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A fleet answer lists where the fleet's slugs are filed and then reads each slug's page once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account's slug is read off the name of that account's page file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fleet answer narrowed to one provider leaves out every account held elsewhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An account whose credential is one key is read as that key rather than as a pair.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key asked for where the sops file holds none is answered as none.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The values observed of an account are read from the file beside that account's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value is read under the key akasha declares that value as.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The old `retry-after` key is read as `retryAllowedAt`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A rescued pair is preferred where that pair's expiry is later than the committed expiry.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rescued pair expiring no later than the committed pair is left aside.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account no page is filed for is answered as absent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sops file that will not decrypt is answered as absent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A credential whose access-token expiry will not parse is answered as absent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A withdrawn subscription is carried as the reason text rather than as a flag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An account's state and that account's credential come from one reading of a page.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The repository root reaches every reader here as a parameter.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The reader of an account's secrets reaches this module as a parameter.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller names the account a single-account read answers about.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Every path read here sits under the root the caller hands in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here fetches.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a root from the environment.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decrypts.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No map of the fleet is remembered between reads.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No secret value is written to a log here.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "A rescued pair spelled in kebab-case is read as a pair spelled in akasha's keys.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A fleet answer opens the page of every account listed.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "An account whose page will not load is left out of a fleet answer.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A fleet credential answer decrypts the sops file beside every account listed.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "An account's scopes are read as text and are matched against no declared scope.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "No key is read through `text-at` here, because five readers of a key are one family.",
    },
  ],
} as const satisfies Module
