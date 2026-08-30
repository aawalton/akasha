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
        "A cycle belongs to the whole folder and to no single file. This runs at audit alone.",
    },
    {
      invariantKind: "departure",
      statement: "An import the compiler erases is no edge.",
    },
    {
      invariantKind: "departure",
      statement: "A list of names is type-only when every name in it is.",
    },
    {
      invariantKind: "departure",
      statement: "An import binding no name is an edge.",
    },
    {
      invariantKind: "departure",
      statement: "Only a top-level import or export is read.",
    },
    {
      invariantKind: "departure",
      statement: "Every file standing in a cycle is refused by its own path.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier landing on no file the folder holds is passed over.",
    },
    {
      invariantKind: "constraint",
      statement: "A specifier inside akasha carries its extension.",
    },
    {
      invariantKind: "absence",
      statement: "A deferred `import()` is not counted.",
    },
    {
      invariantKind: "absence",
      statement: "A loop closed through one alone is not refused though it may still be one.",
    },
  ],
} as const satisfies Check
