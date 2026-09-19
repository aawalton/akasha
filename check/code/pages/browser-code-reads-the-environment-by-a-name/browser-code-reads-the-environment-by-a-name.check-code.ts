import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const browserCodeReadsTheEnvironmentByAName = {
  id: "01a08dbe-1652-7000-bba4-cd7488c7a8ec",
  type: "page-type/check-code",
  slug: "browser-code-reads-the-environment-by-a-name",
  definition:
    "the check refusing a bundled router app module reaching the environment by a key or a Next name",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A define replaces the text `process.env.NAME` and leaves `process.env[held]` alone.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "`process.env` is an empty object in a browser.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The router apps judged are the pages the index files under `router-app`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An app's folder is the folder its page sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every code file in an app's package is judged rather than the app directory's files alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path whose name ends `.server` before its extension is judged by nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path with a folder named `.server` is judged by nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test file is judged by nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The files an app's build and its listener hold are read from the properties the index declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those files are judged by nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A route module is the root route or a module the app's route table names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A route module exporting its loader and its action alone is judged by nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type a route module exports is no export the browser is handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reaching `process.env` by anything but a name written out in full refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Importing a module that itself reaches `process.env` by a key refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That second reach is followed one import deep rather than through a whole closure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A specifier is followed where it lands on a path the index files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A specifier under a package name lands on the path left once that name is dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import carrying only a type reaches nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body whose text has no `process.env[` in it reaches `process.env` by no key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names the line and what to write in place of the key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name marked for Next, read from `process.env` in a bundled module, refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That refusal names the line and the `import.meta.env` name to read in place of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Next name read inside a route module's exported loader or action is judged by nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is judged over a whole module, because no define replaces a key anywhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is judged where the read sits, because a define reaches the name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every code file of an app is judged again where that app's route table or its page changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An app whose route table reads as nothing refuses rather than judging its routes clean.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A loader-only route reading a name only a define supplies by a key is seen by nothing here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A Next name reached through an import is seen by nothing here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A read in an imported module is replaced by a define or shaken out, and which is unread here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A file outside every router app's package is judged by nothing here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An index naming no router app judges clean.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 45 },
} as const satisfies CheckCode
