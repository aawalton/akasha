import type { Module } from "@akasha/code/module"

export const answer = {
  id: "01a05bd6-c528-7413-9995-26f888309a61",
  pageTypeSlug: "module",
  slug: "answer",
  definition: "what a page or page-type query is answered with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A route here answers a signed-in reader alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "How many pages a page type holds is counted off the rows the answer carries rather than asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A listing carries five thousand rows at the most.",
    },
    {
      invariantKind: "departure",
      statement:
        "An answer says how many pages were counted and whether the listing reached those pages.",
    },
    {
      invariantKind: "departure",
      statement: "A question the pages refuse is answered 503 carrying the refusal's own words.",
    },
    {
      invariantKind: "departure",
      statement:
        "A listing whose roster will not read is answered 501 carrying the reason that roster went unread.",
    },
    {
      invariantKind: "departure",
      statement: "The roster names every page type `@akasha/pages-service` holds pages for.",
    },
    {
      invariantKind: "departure",
      statement: "A roster entry carries that page type's slug alone.",
    },
    {
      invariantKind: "departure",
      statement: "A page type's row carries the property definitions that page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A row of any other page type carries no property definition.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type whose properties went unread carries no definition rather than refusing the listing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type carrying no definition is told apart from a page type carrying an empty list.",
    },
    {
      invariantKind: "departure",
      statement:
        "A roster that will not read is answered 503 carrying the reason that roster went unread.",
    },
    {
      invariantKind: "departure",
      statement: "A raise that is not the roster's is left to raise.",
    },
    {
      invariantKind: "absence",
      statement: "An unanswered question is never reported as a page type holding nothing.",
    },
    {
      invariantKind: "absence",
      statement: "A roster entry names no repository and no glob.",
    },
  ],
} as const satisfies Module
