import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noImportCycle = {
  id: "01a05002-dac4-7a35-80c3-fbc46969dbab",
  type: "page-type/check-code",
  slug: "no-import-cycle",
  definition: "the check refusing a module under akasha that imports its way back around to itself",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cycle belongs to the whole folder and to no single file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file outside the change is read where the change reaches that file by import.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a cycle with a file the change has is refused.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A cycle the change closes has an import that change adds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change adding no import is judged without any file being read around it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An added import is searched forward for the file that import is written in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cycle already there when the change arrived is the audit's rather than this.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import the compiler erases is no edge.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A list of names is type-only when every name in the list is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import binding no name is an edge.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a top-level import or export is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every file in a cycle is refused by its own path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A specifier landing on no file the folder has is passed over.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A specifier inside akasha has its extension.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A deferred `import()` is not counted.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A loop closed through a deferred import alone is not refused though the code still loops.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
