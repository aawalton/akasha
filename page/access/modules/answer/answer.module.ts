import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const answer = {
  id: "01a05bd6-c528-7413-9995-26f888309a61",
  type: "page-type/module",
  slug: "answer",
  definition: "what answers a page or page-type query",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A route here answers a signed-in reader, or an anonymous reader a grant admits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader is read as present or absent, and no field of that reader is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Who a request is read as is passed in, so a site says how it knows a reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "How many pages a page type has is the count the pages answer with rather than the rows carried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing has five thousand rows at the most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question naming pages by id or by slug is answered with those pages alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pages named by the key a reader's narrow holds are refused rather than asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That ceiling is stated in the question rather than trimmed off the answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing carries a page's own values and not the rows filed beside that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question naming a beside-the-page key is answered with that key's rows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing carries a key asked by name only where the question names that key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A named key the page type does not declare is passed over rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The keys a listing asks for are named in the question rather than trimmed after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page type is read before the pages are asked, so the question can name keys.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An answer says how many pages were counted and whether the listing reached those pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question the pages refuse is answered 503 with the refusal's own words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A listing whose roster will not read is answered 501 with the reason that roster went unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The roster names every page type `@akasha/page-service` has pages for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roster entry has that page type's slug alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type's row has the property definitions that page type declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row of any other page type has no property definition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type whose properties went unread carries no definition rather than refusing the listing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type with no definition is told apart from a page type with an empty list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A roster that will not read is answered 503 with the reason that roster went unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A raise that is not the roster's is left to raise.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An unanswered question is never reported as a page type holding nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A roster entry names no repository and no glob.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a grant admits an anonymous reader is passed in rather than read here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An anonymous reader no grant admits is refused as a reader with no session is.",
    },
  ],
} as const satisfies Module
