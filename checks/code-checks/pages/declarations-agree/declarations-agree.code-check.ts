import type { CodeCheck } from "../../code-check.page-type.ts"

export const declarationsAgree = {
  id: "01a060fc-c4cc-7eea-ace9-b003d0ff4df5",
  pageTypeSlug: "code-check",
  slug: "declarations-agree",
  definition: "the check refusing a declaration file another declaration file contradicts",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A declaration holds or fails against every other declaration.",
    },
    {
      invariantKind: "departure",
      statement: "Every declaration file akasha holds is compiled as one program.",
    },
    {
      invariantKind: "departure",
      statement: "The declaration set is compiled with the library check on.",
    },
    {
      invariantKind: "departure",
      statement: "The compiler settings are otherwise the ones akasha compiles everything with.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration file the change leaves untouched is judged all the same.",
    },
    {
      invariantKind: "departure",
      statement: "A diagnostic is reported against the file the diagnostic is written in.",
    },
    {
      invariantKind: "departure",
      statement: "A diagnostic naming declarations outside akasha alone is not refused.",
    },
    {
      invariantKind: "departure",
      statement: "A diagnostic naming no other declaration is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "The files compiled are the ones the index names rather than the ones a walk finds.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration file the change adds is compiled before the index names that file.",
    },
    {
      invariantKind: "departure",
      statement: "An index naming none while the change carries one is thrown rather than passed.",
    },
    {
      invariantKind: "absence",
      statement: "No name is kept as permitted.",
    },
    {
      invariantKind: "absence",
      statement: "A change carrying no declaration file is not judged.",
    },
    {
      invariantKind: "gap",
      statement: "A declaration shadowing a standard library name is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "Two declaration files disagreeing never land.",
    },
  ],
} as const satisfies CodeCheck
