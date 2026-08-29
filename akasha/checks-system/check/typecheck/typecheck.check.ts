import type { Check } from "../check.page-type.ts"

export const typecheck = {
  id: "01a04bcb-dff4-761a-856e-407fb6934b44",
  pageTypeSlug: "check",
  slug: "typecheck",
  definition: "the check refusing TypeScript that does not compile",
  code: "ts",
  test: "ts",
  runsOn: ["patch", "worktree", "deploy"],
  design: [
    {
      invariantKind: "departure",
      statement: "The settings the compiler runs under are stated here.",
    },
    {
      invariantKind: "constraint",
      statement: "A type holds or fails across files, so the whole akasha folder is compiled.",
    },
    {
      invariantKind: "departure",
      statement:
        "The folder is compiled once for a set of changes, however many files that set holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A diagnostic against a file the change did not touch is reported once, against that file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the change takes away is not there for the compiler, so nothing is reported against it and a file still importing it is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A diagnostic naming no file is thrown, never reported.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Every TypeScript file under the akasha folder is read from what the check is handed, so the folder compiles as the change would leave it.",
    },
  ],
  intent: [
    {
      invariantKind: "gap",
      statement: "A type error never lands.",
    },
  ],
} as const satisfies Check
