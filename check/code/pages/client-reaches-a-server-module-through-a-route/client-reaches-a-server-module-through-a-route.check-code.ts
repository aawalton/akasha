import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const clientReachesAServerModuleThroughARoute = {
  id: "01a0826b-f1ac-77a7-8379-299804f515d2",
  type: "check-code",
  slug: "client-reaches-a-server-module-through-a-route",
  definition:
    "the check refusing a router app module the browser bundle holds that reaches a server module",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The router apps judged are the pages the index files under `router-app`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An app's folder is the folder its page sits in rather than the folder its configuration names.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A file outside the app directory is bundled where a route module reaches that file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every code file in an app's package is judged rather than the app directory's files alone.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The app directory a configuration names is read by nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The names an app's fixed files have are read from the properties the index declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A route module is the root route or the server entry or the app layout or a module the table names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The route table's body is read for the modules the index files no route page for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A string in the route table ending in a module extension names a route module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A route module reaches a server module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Anything else the browser bundle holds reaches no server module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path whose name ends `.server` before its extension is server-only.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path with a folder named `.server` is server-only.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A specifier is judged by its own text rather than by the file that specifier resolves to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A value import and a value re-export and a dynamic import each reach a server module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import carrying only a type reaches no server module at runtime.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test file is judged by nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The route table itself is judged by nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A server-only file is judged by nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The refusal names the line the import sits on and the specifier that import names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every code file of an app is judged again where that app's route table or its page changed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An app whose route table reads as nothing refuses rather than judging its routes leaks.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A module outside a router app's package reaching a server module is seen by nothing here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "An index naming no router app judges clean.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
