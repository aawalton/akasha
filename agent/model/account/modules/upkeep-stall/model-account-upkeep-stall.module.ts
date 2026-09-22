import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelAccountUpkeepStall = {
  id: "01a0686a-6c02-7000-aab4-ab51e35ecc88",
  type: "page-type/module",
  slug: "model-account-upkeep-stall",
  definition: "how far behind the upkeep an account has fallen",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An account is judged from the two stamps the upkeep writes beside its page and from nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A token's remaining life is judged against a floor computed from the upkeep's own margin and period.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The ceiling a usage reading's age is judged against is computed from the upkeep's own period.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An upkeep run is legitimately late by at most two of the upkeep's periods.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A usage reading is allowed one further period of slack past a missed run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The worst fault found is the verdict answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An expired token is answered ahead of a stale usage reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account with neither stamp has never been reached rather than fallen behind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An account whose subscription is withdrawn is withdrawn rather than fallen behind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Upkeep passes a withdrawn account over, so its stamps say nothing about upkeep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A withdrawn account is counted out of the accounts judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A withdrawn account is named among neither the stalled nor the current.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reason that is no words leaves the account judged on its stamps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stamp sitting beside a page as anything but a timestamp reads as unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account that could not be looked at reads as unread rather than as behind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account that reads as unread is counted out of the accounts judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An account that reads as unread is named among neither the stalled nor the current.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every ruling states the count of pages and the count judged and the count current.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every ruling states the stalled, the withdrawn and the unread apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every span is stated in hours to one decimal place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An account whose beside would not read is answered on its own rather than refusing the listing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account held with a provider the upkeep never reaches is not judged here.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every instant a verdict is judged against is handed in by the caller.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The two keys read here are spelled as the model-account page type declares those keys.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here fetches.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a secret or a token.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A page with nothing beside that page has never been reached rather than reading as unread.",
    },
  ],
} as const satisfies Module
