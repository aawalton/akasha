import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const browserReach = {
  id: "01a0d5a4-47e9-7295-bef2-6c5f53adcb9c",
  type: "page-type/module",
  slug: "browser-reach",
  definition: "the files a browser runs, and those only a browser runs",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Which files a browser runs is worked out from what imports what.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A browser runs a router app's root route and each route its table names but one serving data alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser runs the code under a component group's slug beside any page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser runs the code beside a page carrying a drawn file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser runs a module stating it runs in a browser.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser runs every file those import however far, but a server module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A server module is one named or foldered `.server`, as the router strips it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other file runs outside a browser, and so does every file it imports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file both reach runs in both, and only the rest run in a browser alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module stating it runs in a browser runs there alone whatever imports it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test runs where the code it tests runs, and imports nothing into either.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code a test tests is the code file beside the same page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test with no code beside it runs outside a browser.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The files weighed are those handed in, the code their tests test, and all that imports either.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A route's loader and its component share one module and one set of imports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A module only a route's loader reaches, and named no server module, runs in a browser.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here builds a program or reads a diagnostic.",
    },
  ],
} as const satisfies Module
