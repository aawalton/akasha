import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noSopsOnDevStdin = {
  id: "01a05030-b05f-71d0-a3cd-58a70fd8efa0",
  pageTypeSlug: "syntax-rule",
  type: "syntax-rule",
  slug: "no-sops-on-dev-stdin",
  definition: "the rule refusing a sops call handed `/dev/stdin`, which it cannot open and seek",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call is known for sops by a marker among its own string arguments.",
    },
    {
      invariantKind: "departure",
      statement: "`--filename-override` marks a call as sops's.",
    },
    {
      invariantKind: "departure",
      statement: "`--filename-override` is a flag no other tool here takes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A string reached through an array literal counts as a string written straight into the call.",
    },
    {
      invariantKind: "departure",
      statement: "`/dev/stdin` alone is left.",
    },
    {
      invariantKind: "departure",
      statement: "sops alone is left.",
    },
    {
      invariantKind: "departure",
      statement: "This rule asks for a call naming sops and a real file.",
    },
    {
      invariantKind: "departure",
      statement: "The call's own name is not asked.",
    },
    {
      invariantKind: "gap",
      statement: "A path built by joining or interpolating is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "Only a whole literal sitting in the call is read.",
    },
  ],
} as const satisfies SyntaxRule
