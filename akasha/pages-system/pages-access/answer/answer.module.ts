import type { Module } from "@akasha/code-system/module"

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
      statement: "The pages of one page type are asked of `@akasha/pages-system-service`.",
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
      statement: "An answer says how many pages were counted and whether the listing reached them.",
    },
    {
      invariantKind: "departure",
      statement: "A question the pages refuse is answered 503 carrying what the refusal said.",
    },
    {
      invariantKind: "departure",
      statement: "A roster that will not read is answered 501 carrying what went unread.",
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
      invariantKind: "gap",
      statement: "The roster route refuses at 501.",
    },
    {
      invariantKind: "absence",
      statement:
        "`@akasha/pages-system-service` names no repository and no glob for a page type's pages.",
    },
  ],
} as const satisfies Module
