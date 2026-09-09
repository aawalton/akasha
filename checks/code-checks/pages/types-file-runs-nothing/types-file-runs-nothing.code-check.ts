import type { CodeCheck } from "../../code-check.page-type.ts"

export const typesFileRunsNothing = {
  id: "01a07724-a8ae-7f5e-93f2-c483420afe89",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "types-file-runs-nothing",
  definition: "the check refusing anything but a declaration in a module's types file",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A module's types file states the declarations a caller reads without loading the module.",
    },
    {
      invariantKind: "departure",
      statement: "A type alias and an interface are let through.",
    },
    {
      invariantKind: "departure",
      statement: "An import clause marked `type` is let through.",
    },
    {
      invariantKind: "departure",
      statement: "An export clause marked `type` is let through.",
    },
    {
      invariantKind: "departure",
      statement: "Every other statement is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A form nobody foresaw is refused as well.",
    },
    {
      invariantKind: "departure",
      statement:
        "A `declare` naming a value belongs in a declaration file rather than in a types file.",
    },
    {
      invariantKind: "departure",
      statement: "An import is judged by the rule `calculation-imports-only-types` states already.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the line.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the form the check found on that line.",
    },
    {
      invariantKind: "departure",
      statement: "Refusals are answered in line order.",
    },
    {
      invariantKind: "absence",
      statement: "Only a file whose name ends `.types.ts` is judged.",
    },
    {
      invariantKind: "departure",
      statement: "This check's input is the types files alone.",
    },
    {
      invariantKind: "departure",
      statement: "A change carrying no types file does not run this check.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refuses a type stated in a file that is no types file.",
    },
  ],
} as const satisfies CodeCheck
