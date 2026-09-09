import type { CodeCheck } from "../../code-check.page-type.ts"

export const clientReachesAServerModuleThroughARoute = {
  id: "01a0826b-f1ac-77a7-8379-299804f515d2",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "client-reaches-a-server-module-through-a-route",
  definition:
    "the check refusing a router app module the browser bundle holds that reaches a server module",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The router apps judged are the pages the index files under `router-app`.",
    },
    {
      invariantKind: "departure",
      statement:
        "An app's folder is the folder its page sits in rather than the folder its configuration names.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A file outside the app directory is bundled where a route module reaches that file.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every code file in an app's package is judged rather than the app directory's files alone.",
    },
    {
      invariantKind: "absence",
      statement: "The app directory a configuration names is read by nothing here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The names an app's fixed files have are read from the properties the index declares.",
    },
    {
      invariantKind: "departure",
      statement:
        "A route module is the root route, the server entry, the app layout, or one the table names.",
    },
    {
      invariantKind: "departure",
      statement:
        "The route table's body is read for the modules the index files no route page for.",
    },
    {
      invariantKind: "departure",
      statement: "A string in the route table ending in a module extension names a route module.",
    },
    {
      invariantKind: "departure",
      statement: "A route module reaches a server module.",
    },
    {
      invariantKind: "departure",
      statement: "Anything else the browser bundle holds reaches no server module.",
    },
    {
      invariantKind: "departure",
      statement: "A path whose name ends `.server` before its extension is server-only.",
    },
    {
      invariantKind: "departure",
      statement: "A path with a folder named `.server` is server-only.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier is judged by the text it holds rather than by the file it resolves to.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value import, a value re-export and a dynamic import each reach a server module.",
    },
    {
      invariantKind: "departure",
      statement: "An import carrying only a type reaches no server module at runtime.",
    },
    {
      invariantKind: "departure",
      statement: "A test file is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "The route table itself is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A server-only file is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The refusal names the line the import sits on and the specifier that import names.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every code file of an app is judged again where that app's route table or its page changed.",
    },
    {
      invariantKind: "departure",
      statement:
        "An app whose route table reads as nothing refuses rather than judging its routes leaks.",
    },
    {
      invariantKind: "gap",
      statement: "A file no page claims is judged only where the change has that file.",
    },
    {
      invariantKind: "gap",
      statement:
        "A module outside a router app's package reaching a server module is seen by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "An index naming no router app judges clean.",
    },
  ],
} as const satisfies CodeCheck
