import type { Module } from "../modules/module.page-type.ts"

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
      statement: "A body is formatted where the body is handed in before anything judges the body.",
    },
    {
      invariantKind: "departure",
      statement:
        "The formatter is the one the repo already stands on reached inside the root it is run for.",
    },
    {
      invariantKind: "departure",
      statement: "Formatting sorts the imports as well as the spacing.",
    },
    {
      invariantKind: "departure",
      statement: "Import order is enforced.",
    },
    {
      invariantKind: "departure",
      statement: "A body that only had its spacing fixed still fails.",
    },
    {
      invariantKind: "departure",
      statement: "What comes back is taken only when the run exited clean and said something.",
    },
    {
      invariantKind: "departure",
      statement: "A body that would not parse leaves the formatter silent.",
    },
    {
      invariantKind: "departure",
      statement: "Silence is never a body.",
    },
    {
      invariantKind: "departure",
      statement: "Anything short of that answers the body handed in unchanged.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body that cannot be parsed is then refused on its own merits rather than quietly blanked.",
    },
    {
      invariantKind: "departure",
      statement: "A body of a kind the formatter does not own comes back unformatted.",
    },
    {
      invariantKind: "constraint",
      statement: "The formatter answers a heavy check mark as a square root sign.",
    },
    {
      invariantKind: "constraint",
      statement: "The formatter answers a zero-width space as the replacement character.",
    },
    {
      invariantKind: "constraint",
      statement: "The formatter makes those substitutions whatever kind the path names.",
    },
    {
      invariantKind: "departure",
      statement: "A formatting that changes the characters outside ASCII is not taken.",
    },
    {
      invariantKind: "departure",
      statement: "Those characters are compared as a sorted bag.",
    },
    {
      invariantKind: "departure",
      statement: "Reordering one of them is not changing one.",
    },
    {
      invariantKind: "departure",
      statement: "A body whose marks would change comes back unformatted rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a body moved is answered beside it.",
    },
    {
      invariantKind: "absence",
      statement: "No refusal is spelt here.",
    },
    {
      invariantKind: "absence",
      statement: "This rewrites or it does not.",
    },
    {
      invariantKind: "absence",
      statement: "What a body's trouble means is left to the checks that judge the body.",
    },
    {
      invariantKind: "absence",
      statement: "How the formatter is configured is not answered here.",
    },
    {
      invariantKind: "absence",
      statement: "The config standing in the root is picked up by the run.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing restates the config.",
    },
    {
      invariantKind: "departure",
      statement: "Which kinds the formatter owns is answered here rather than by the formatter.",
    },
    {
      invariantKind: "gap",
      statement: "Those kinds are named here rather than read off the formatter's own config.",
    },
    {
      invariantKind: "absence",
      statement: "A caller hands in a path and a body.",
    },
  ],
} as const satisfies Module
