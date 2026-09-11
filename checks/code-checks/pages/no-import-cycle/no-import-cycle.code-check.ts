import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const noImportCycle = {
  id: "01a05002-dac4-7a35-80c3-fbc46969dbab",
  type: "code-check",
  slug: "no-import-cycle",
  definition: "the check refusing a module under akasha that imports its way back around to itself",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnWorktree: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cycle belongs to the whole folder and to no single file.",
    },
    {
      invariantKind: "departure",
      statement: "A file outside the change is read where the change reaches that file by import.",
    },
    {
      invariantKind: "departure",
      statement: "Only a cycle with a file the change has is refused.",
    },
    {
      invariantKind: "constraint",
      statement: "A cycle the change closes has an import that change adds.",
    },
    {
      invariantKind: "departure",
      statement: "A change adding no import is judged without any file being read around it.",
    },
    {
      invariantKind: "departure",
      statement: "An added import is searched forward for the file that import is written in.",
    },
    {
      invariantKind: "departure",
      statement: "A cycle already there when the change arrived is the audit's rather than this.",
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
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CodeCheck
