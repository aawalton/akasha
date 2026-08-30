import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noSopsOnDevStdin = {
  id: "01a05030-b05f-71d0-a3cd-58a70fd8efa0",
  pageTypeSlug: "syntax-rule",
  slug: "no-sops-on-dev-stdin",
  definition: "the rule refusing a sops call handed `/dev/stdin`, which it cannot open and seek",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A call handing `/dev/stdin` to sops is refused, sops opening and seeking what it is given and a pipe answering neither.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call is known for sops by a marker among its own string arguments, so one naming the binary through a variable is caught as a literal one is.",
    },
    {
      invariantKind: "departure",
      statement:
        "`--filename-override` marks a call as sops's, being a flag no other tool here takes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A string reached through an array literal counts as one written straight into the call, arguments being commonly gathered in a list.",
    },
    {
      invariantKind: "departure",
      statement:
        "`/dev/stdin` alone is left, because reading a pipe is ordinary and only sops seeking one is the fault.",
    },
    {
      invariantKind: "departure",
      statement: "sops alone is left, a call naming it and a real file being what this asks for.",
    },
    {
      invariantKind: "departure",
      statement:
        "What the call is named is not asked, so a sops invocation reached through anything at all is judged by the arguments it carries.",
    },
    {
      invariantKind: "gap",
      statement:
        "A path built by joining or interpolating is not seen, only a whole literal standing in the call being read.",
    },
  ],
} as const satisfies SyntaxRule
