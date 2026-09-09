import type { CodeCheck } from "../../code-check.page-type.ts"

export const noImportCycle = {
  id: "01a05002-dac4-7a35-80c3-fbc46969dbab",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "no-import-cycle",
  definition: "the check refusing a module under akasha that imports its way back around to itself",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cycle belongs to the whole folder and to no single file.",
    },
    {
      invariantKind: "departure",
      statement: "A file outside the change is read where an importer reaches that file.",
    },
    {
      invariantKind: "departure",
      statement: "Only a cycle with a file the change has is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An import the compiler erases is no edge.",
    },
    {
      invariantKind: "departure",
      statement: "A list of names is type-only when every name in the list is.",
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
      statement: "Every file in a cycle is refused by its own path.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier landing on no file the folder has is passed over.",
    },
    {
      invariantKind: "constraint",
      statement: "A specifier inside akasha has its extension.",
    },
    {
      invariantKind: "absence",
      statement: "A deferred `import()` is not counted.",
    },
    {
      invariantKind: "absence",
      statement:
        "A loop closed through a deferred import alone is not refused though the code still loops.",
    },
  ],
} as const satisfies CodeCheck
