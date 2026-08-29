import type { Module } from "./module/module.page-type.ts"

export const codeFormat = {
  id: "01a04edc-5281-769c-8ba8-522d8f569095",
  pageTypeSlug: "module",
  slug: "code-format",
  definition:
    "putting a body through the formatter this repo stands on, and taking back only what can be trusted",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A body is formatted where it is handed in, before anything judges it, so what a check counts and what a check runs is what actually lands.",
    },
    {
      invariantKind: "departure",
      statement:
        "The formatter is the one the repo already stands on, reached inside the root it is run for, so a body lands by the same rule a working tree is held to.",
    },
    {
      invariantKind: "departure",
      statement:
        "Formatting sorts the imports as well as the spacing, because import order is enforced here and a body that only had its spacing fixed still fails.",
    },
    {
      invariantKind: "departure",
      statement:
        "What comes back is taken only when the run exited clean and said something. A body that would not parse leaves the formatter silent, and silence is never a body.",
    },
    {
      invariantKind: "departure",
      statement:
        "Anything short of that answers the body handed in, unchanged. A body that cannot be parsed is then refused on its own merits rather than quietly blanked.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body the formatter does not handle comes back as it went in, so a path of any kind may be handed here without asking first whether it is code.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a body moved is answered beside it, so a caller can say out loud which files landed other than as they were handed in.",
    },
    {
      invariantKind: "absence",
      statement:
        "No refusal is spelt here. This rewrites or it does not, and what a body's trouble means is left to the checks that judge it.",
    },
    {
      invariantKind: "absence",
      statement:
        "How the formatter is configured is not answered here. The config standing in the root is picked up by the run, and nothing restates it.",
    },
    {
      invariantKind: "absence",
      statement:
        "Which paths are worth formatting is not answered here. A caller hands in a path and a body, and the formatter itself decides what it touches.",
    },
  ],
} as const satisfies Module
