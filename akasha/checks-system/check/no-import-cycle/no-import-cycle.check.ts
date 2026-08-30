import type { Check } from "../check.page-type.ts"

export const noImportCycle = {
  id: "01a05002-dac4-7a35-80c3-fbc46969dbab",
  pageTypeSlug: "check",
  slug: "no-import-cycle",
  definition: "the check refusing a module under akasha that imports its way back around to itself",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A cycle belongs to the whole folder and to no single file, so this runs at audit alone, where every file the index names is in hand.",
    },
    {
      invariantKind: "departure",
      statement:
        "An import the compiler erases is no edge, because types that name each other cost nothing when the code runs.",
    },
    {
      invariantKind: "departure",
      statement:
        "A list of names is type-only when every name in it is, so one value among them makes the edge count.",
    },
    {
      invariantKind: "departure",
      statement:
        "An import binding no name is an edge, because it still makes the module it names run.",
    },
    {
      invariantKind: "departure",
      statement:
        "Only a top-level import or export is read, so an import written inside a string stands for nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every file standing in a cycle is refused by its own path, so the answer names all of them and not one chosen among them.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier landing on no file the folder holds is passed over, because what is not there closes nothing.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A specifier inside akasha carries its extension, so where it lands is read from what it says and never guessed.",
    },
    {
      invariantKind: "absence",
      statement:
        "A deferred `import()` is not counted, so a loop closed through one alone is not refused though it may still be one.",
    },
  ],
} as const satisfies Check
