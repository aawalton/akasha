import type { CodeCheck } from "../../code-check.page-type.ts"

export const typescript7 = {
  id: "01a06e16-d565-7880-8b91-34da07e9196f",
  pageTypeSlug: "code-check",
  slug: "typescript-7",
  definition: "the check refusing TypeScript that does not compile, judged by TypeScript 7",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "What this judges is what `typecheck` judges, by another compiler.",
    },
    {
      invariantKind: "departure",
      statement:
        "The files judged are the change and every file that imports the change however far.",
    },
    {
      invariantKind: "departure",
      statement: "The program is built over the files judged and the declarations alone.",
    },
    {
      invariantKind: "departure",
      statement: "A body is read from what the check is handed rather than from the disk.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the change takes away is answered as absent rather than read from the disk.",
    },
    {
      invariantKind: "constraint",
      statement: "This compiler draws in no ambient types the settings do not name.",
    },
    {
      invariantKind: "departure",
      statement: "The settings name every ambient type the packages folder holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "The config the program is built from is served to the compiler rather than written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing of what this run worked out is kept for the next.",
    },
    {
      invariantKind: "gap",
      statement: "This is beside `typecheck` while the two are compared rather than in its place.",
    },
  ],
} as const satisfies CodeCheck
