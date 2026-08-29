import type { Check } from "../check.page-type.ts"

export const typecheck = {
  id: "01a04bcb-dff4-761a-856e-407fb6934b44",
  pageTypeSlug: "check",
  slug: "typecheck",
  definition: "the check refusing TypeScript that does not compile",
  code: "ts",
  test: "ts",
  needs: "path",
  runsOn: ["patch", "worktree", "deploy"],
  design: [
    {
      invariantKind: "departure",
      statement:
        "The settings the compiler runs under are stated here, because a file stating them would be neither a page nor a page property's file.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A type holds or fails across files, so the whole akasha folder is compiled and a changed file is handed what the compiler said.",
    },
    {
      invariantKind: "departure",
      statement:
        "The folder is compiled once for a set of changes, however many files that set holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A diagnostic against a file the change did not touch is still reported, against every path the change holds, because the change lands whole and a refusal names a path its writer can act on.",
    },
    {
      invariantKind: "departure",
      statement: "A diagnostic against a file the change takes away is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A diagnostic naming no file is thrown, never reported.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The folder is read from disk rather than from what the check is handed, because a compiler is given file names and not bodies.",
    },
  ],
  intent: [
    {
      invariantKind: "gap",
      statement: "A type error never lands.",
    },
  ],
} as const satisfies Check
