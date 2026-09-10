import type { CodeCheck } from "../../code-check.page-type.ts"

export const handWrittenGlobalIsNoMethod = {
  id: "01a0823c-3bff-7d55-9301-1297ad069ef4",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "hand-written-global-is-no-method",
  definition:
    "the check refusing a hand-written global the generated declarations carry only as a method",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A declaration is generated where its page states the command writing it again.",
    },
    {
      invariantKind: "departure",
      statement: "Every other declaration is written by hand.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which declarations are generated is read from their pages rather than from a path.",
    },
    {
      invariantKind: "departure",
      statement: "A method is a member of an interface a generated declaration has.",
    },
    {
      invariantKind: "departure",
      statement: "A member typed as a function is a method as a method signature is.",
    },
    {
      invariantKind: "departure",
      statement: "A global is a declared function or a declared name whose type is callable.",
    },
    {
      invariantKind: "departure",
      statement: "A hand-written global naming a method and no generated global is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A name the generated declarations also carry as a global is let through.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the line the declaration sits on.",
    },
    {
      invariantKind: "departure",
      statement: "Every declaration the index has is judged rather than the ones a change has.",
    },
    {
      invariantKind: "constraint",
      statement: "A declaration a compiler believes fails at nothing until the game runs.",
    },
    {
      invariantKind: "departure",
      statement: "A generated declaration file that is not there refuses the run.",
    },
    {
      invariantKind: "departure",
      statement: "A hand-written declaration file that is not there is judged as nothing.",
    },
    {
      invariantKind: "absence",
      statement: "No file is let off by name.",
    },
  ],
  check: { maxCpuSeconds: 10 },
} as const satisfies CodeCheck
