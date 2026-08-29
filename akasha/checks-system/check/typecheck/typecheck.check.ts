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
    "The settings the compiler runs under are stated here, because a file stating them would be neither a page nor a page property's file.",
    "A type holds or fails across files, so the whole akasha folder is compiled and a changed file is handed what the compiler said.",
    "The folder is compiled once for a set of changes, however many files that set holds.",
    "A diagnostic against a file the change did not touch is still reported, against every changed file, because a check is handed its file and never the set.",
    "A diagnostic naming no file is the compiler failing to run, so it is thrown rather than reported.",
    "The folder is read from disk rather than from what the check is handed, because a compiler is given file names and not bodies.",
  ],
  intent: ["A type error never lands."],
} as const satisfies Check
