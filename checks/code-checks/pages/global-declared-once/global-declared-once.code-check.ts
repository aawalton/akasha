import type { CodeCheck } from "../../code-check.page-type.ts"

export const globalDeclaredOnce = {
  id: "01a061ca-2484-773a-8dc7-e6a08fe588f9",
  pageTypeSlug: "code-check",
  slug: "global-declared-once",
  definition: "the check refusing a global name a declaration file and another file both declare",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
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
      statement: "A declaration file holds the shared set and every other file holds a module.",
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
      statement: "A refusal against a module the change leaves untouched says so.",
    },
    {
      invariantKind: "departure",
      statement: "The files read are the ones the index names beside the ones the change carries.",
    },
    {
      invariantKind: "departure",
      statement: "A file spelling no `declare global` and named no declaration is read no further.",
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
} as const satisfies CodeCheck
