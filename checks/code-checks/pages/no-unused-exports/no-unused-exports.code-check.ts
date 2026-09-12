import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const noUnusedExports = {
  id: "01a09577-1c6e-70ac-9225-958238aed3c2",
  type: "code-check",
  slug: "no-unused-exports",
  definition: "the check refusing a file exporting a value no other file names",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnWorktree: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value is reached where another file names that value in an import.",
    },
    {
      invariantKind: "departure",
      statement: "A value named nowhere but inside the file exporting it is reached by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names one export rather than the file the export sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A file no file imports has every value it exports refused.",
    },
    {
      invariantKind: "departure",
      statement: "An import taking every name a file exports leaves that file unrefused.",
    },
    {
      invariantKind: "departure",
      statement: "A file exporting every name of another file is judged by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A page's own export is passed over, a page being loaded rather than imported.",
    },
    {
      invariantKind: "departure",
      statement: "The files importing one file are read from the index rather than looked for.",
    },
    {
      invariantKind: "gap",
      statement: "A type a file exports is judged by nothing.",
    },
    {
      invariantKind: "gap",
      statement: "A value exported as the default is judged by nothing.",
    },
    {
      invariantKind: "gap",
      statement: "A specifier naming a package rather than a path reads as reaching no file.",
    },
    {
      invariantKind: "gap",
      statement: "A value a test alone names reads as reached.",
    },
    {
      invariantKind: "gap",
      statement: "A file a page names as the code that page runs is judged as any other file.",
    },
    {
      invariantKind: "gap",
      statement:
        "A change taking away the last import of a value is judged at audit rather than at change.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is judged while this page states `experimental`.",
    },
    {
      invariantKind: "departure",
      statement: "`experimental` comes off this page where Alan has settled what counts as unused.",
    },
    {
      invariantKind: "upkeep",
      statement: "No value this check would refuse is taken away before Alan has settled that.",
    },
  ],
  check: { maxCpuSeconds: 30 },
  audit: { maxCpuSeconds: 120 },
  experimental: true,
} as const satisfies CodeCheck
