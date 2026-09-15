import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelAccountUpkeepStall = {
  id: "01a0686a-6c02-7000-aab4-ab51e35ecc88",
  type: "module",
  slug: "model-account-upkeep-stall",
  definition: "how far behind the upkeep an account has fallen",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An account is judged from the two stamps the upkeep writes beside its page and from nothing else.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A token's remaining life is judged against a floor computed from the upkeep's own margin and period.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The ceiling a usage reading's age is judged against is computed from the upkeep's own period.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An upkeep run is legitimately late by at most two of the upkeep's periods.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A usage reading is allowed one further period of slack past a missed run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The worst fault found is the verdict answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An expired token is answered ahead of a stale usage reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account with neither stamp has never been reached rather than fallen behind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stamp sitting beside a page as anything but a timestamp reads as unread.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account that could not be looked at reads as unread rather than as behind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account that reads as unread is counted out of the accounts judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An account that reads as unread is named among neither the stalled nor the current.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every ruling states the count of pages and the count judged and the count current.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every span is stated in hours to one decimal place.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An account whose beside would not read is answered on its own rather than refusing the listing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account held with a provider the upkeep never reaches is not judged here.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Every instant a verdict is judged against is handed in by the caller.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "The two keys read here are spelled as the model-account page type declares those keys.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here fetches.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a secret or a token.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "A page with nothing beside that page has never been reached rather than reading as unread.",
    },
  ],
} as const satisfies Module
