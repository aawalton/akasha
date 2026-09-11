import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const browserCodeReadsTheEnvironmentByAName = {
  id: "01a08dbe-1652-7000-bba4-cd7488c7a8ec",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "browser-code-reads-the-environment-by-a-name",
  definition:
    "the check refusing a bundled router app module reaching the environment by a key or a Next name",
  runsOnChange: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "A define replaces the text `process.env.NAME` and leaves `process.env[held]` alone.",
    },
    {
      invariantKind: "constraint",
      statement: "`process.env` is an empty object in a browser.",
    },
    {
      invariantKind: "departure",
      statement: "The router apps judged are the pages the index files under `router-app`.",
    },
    {
      invariantKind: "departure",
      statement: "An app's folder is the folder its page sits in.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every code file in an app's package is judged rather than the app directory's files alone.",
    },
    {
      invariantKind: "departure",
      statement: "A path whose name ends `.server` before its extension is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A path with a folder named `.server` is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A test file is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The files an app's build and its listener hold are read from the properties the index declares.",
    },
    {
      invariantKind: "departure",
      statement: "Those files are judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A route module is the root route or a module the app's route table names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A route module exporting its loader and its action alone is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A type a route module exports is no export the browser is handed.",
    },
    {
      invariantKind: "departure",
      statement: "Reaching `process.env` by anything but a name written out in full refuses.",
    },
    {
      invariantKind: "departure",
      statement: "Importing a module that itself reaches `process.env` by a key refuses.",
    },
    {
      invariantKind: "departure",
      statement:
        "That second reach is followed one import deep rather than through a whole closure.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is followed where it lands on a path the index files.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier under a package name lands on the path left once that name is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "An import carrying only a type reaches nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A body whose text has no `process.env[` in it reaches `process.env` by no key.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the line and what to write in place of the key.",
    },
    {
      invariantKind: "departure",
      statement: "A name marked for Next, read from `process.env` in a bundled module, refuses.",
    },
    {
      invariantKind: "departure",
      statement:
        "That refusal names the line and the `import.meta.env` name to read in place of it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A Next name read inside a route module's exported loader or action is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A key is judged over a whole module, because no define replaces a key anywhere.",
    },
    {
      invariantKind: "departure",
      statement: "A name is judged where the read sits, because a define reaches the name.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every code file of an app is judged again where that app's route table or its page changed.",
    },
    {
      invariantKind: "departure",
      statement:
        "An app whose route table reads as nothing refuses rather than judging its routes clean.",
    },
    {
      invariantKind: "absence",
      statement:
        "A loader-only route reading a name only a define supplies by a key is seen by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "A Next name reached through an import is seen by nothing here.",
    },
    {
      invariantKind: "absence",
      statement:
        "A read in an imported module is replaced by a define or shaken out, and which is unread here.",
    },
    {
      invariantKind: "absence",
      statement: "A file outside every router app's package is judged by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "An index naming no router app judges clean.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CodeCheck
