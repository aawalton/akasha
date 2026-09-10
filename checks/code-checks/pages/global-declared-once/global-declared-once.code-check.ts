import type { CodeCheck } from "../../code-check.page-type.ts"

export const globalDeclaredOnce = {
  id: "01a061ca-2484-773a-8dc7-e6a08fe588f9",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "global-declared-once",
  definition: "the check refusing a global name a declaration file and another file both declare",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A global name is declared in one file.",
    },
    {
      invariantKind: "departure",
      statement: "A file that imports or exports nothing states its globals at its top level.",
    },
    {
      invariantKind: "departure",
      statement: "Every other file states its globals inside a `declare global` block alone.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration file has the shared set and every other file has a module.",
    },
    {
      invariantKind: "departure",
      statement: "A name declared as a value and a name declared as a type are two names.",
    },
    {
      invariantKind: "departure",
      statement: "An interface two files declare merges into a single declaration.",
    },
    {
      invariantKind: "departure",
      statement: "A namespace two files declare merges into a single declaration.",
    },
    {
      invariantKind: "departure",
      statement: "A function two files declare merges into a single declaration.",
    },
    {
      invariantKind: "departure",
      statement: "A second declaration of a merging name is not refused.",
    },
    {
      invariantKind: "departure",
      statement: "A member of an interface does not merge.",
    },
    {
      invariantKind: "departure",
      statement: "A member two files declare is refused though the two spell one type.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal is reported against the module rather than against the shared set.",
    },
    {
      invariantKind: "departure",
      statement: "A name two declaration files declare is refused.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal is reported against the file whose path sorts later.",
    },
    {
      invariantKind: "departure",
      statement:
        "A clash is refused only where the change has one of the two files declaring the name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal names the same file whether the change has that file or the other file.",
    },
    {
      invariantKind: "departure",
      statement:
        "The files read are the declaration files the index names beside the ones the change has.",
    },
    {
      invariantKind: "departure",
      statement:
        "The declaration files read are the ones the index names as carrying ambient types.",
    },
    {
      invariantKind: "departure",
      statement: "Every file the index names is read where the change has a declaration file.",
    },
    {
      invariantKind: "departure",
      statement: "Every file the index names is read where the index names no declaration files.",
    },
    {
      invariantKind: "departure",
      statement: "A change with no declaration file and no `declare global` is refused nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A file spelling no `declare global` and named no declaration is read no further.",
    },
    {
      invariantKind: "departure",
      statement: "The spelling is looked for only in the files this check takes as input.",
    },
    {
      invariantKind: "departure",
      statement: "A file with bytes rather than text is no input to this check.",
    },
    {
      invariantKind: "absence",
      statement: "Two module bodies declaring one name are not judged here.",
    },
    {
      invariantKind: "absence",
      statement: "No name is kept as permitted.",
    },
    {
      invariantKind: "gap",
      statement: "A global name two files declare never lands.",
    },
  ],
  check: { maxCpuSeconds: 10 },
} as const satisfies CodeCheck
