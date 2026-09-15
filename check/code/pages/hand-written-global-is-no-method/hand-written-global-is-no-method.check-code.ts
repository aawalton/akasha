import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const handWrittenGlobalIsNoMethod = {
  id: "01a0823c-3bff-7d55-9301-1297ad069ef4",
  type: "page-type/check-code",
  slug: "hand-written-global-is-no-method",
  definition:
    "the check refusing a hand-written global the generated declarations carry only as a method",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A declaration is generated where its page states the command writing that declaration again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other declaration is written by hand.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which declarations are generated is read from their pages rather than from a path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A method is a member of an interface a generated declaration has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A member typed as a function is a method as a method signature is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A global is a declared function or a declared name whose type is callable.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hand-written global naming a method and no generated global is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name the generated declarations also carry as a global is let through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal names the line the declaration sits on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every declaration the index has is judged rather than the ones a change has.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A declaration a compiler believes fails at nothing until the game runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A generated declaration file that is not there refuses the run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hand-written declaration file that is not there is judged as nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No file is let off by name.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
