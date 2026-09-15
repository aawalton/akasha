import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const typesFileRunsNothing = {
  id: "01a07724-a8ae-7f5e-93f2-c483420afe89",
  type: "check-code",
  slug: "types-file-runs-nothing",
  definition: "the check refusing anything but a declaration in a module's types file",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A module's types file states the declarations a caller reads without loading the module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A type alias and an interface are let through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import clause marked `type` is let through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An export clause marked `type` is let through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other statement is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A form nobody foresaw is refused as well.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A `declare` naming a value belongs in a declaration file rather than in a types file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import is judged by the rule `calculation-imports-only-types` states already.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the form the check found on that line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Refusals are answered in line order.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Only a file whose name ends `.types.ts` is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This check's input is the types files alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change carrying no types file does not run this check.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here refuses a type stated in a file that is no types file.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
