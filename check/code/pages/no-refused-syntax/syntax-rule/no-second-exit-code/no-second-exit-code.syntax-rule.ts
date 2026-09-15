import type { SyntaxRule } from "akasha/check/code/pages/no-refused-syntax/syntax-rule/syntax-rule.page-type.types.ts"

export const noSecondExitCode = {
  id: "01a09404-576c-788f-b915-f4998c66542e",
  type: "syntax-rule",
  slug: "no-second-exit-code",
  definition:
    "the rule refusing an exit code spelled as a number away from the page declaring the five",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One page declares what each exit code is, and every other file imports it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A code is judged where the answer carries refusals, whether an object spells it or a call hands it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal whose code is a number rather than a name is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A number that is no exit code is left alone there too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A module building a command's answer spells the number its test reads.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call handing a refusal builder a number where its code goes is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The builders judged are the command-answering exports taking an exit code as an argument.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A code is looked for in the last argument, since each builder takes it in a place of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An answer whose list of refusals is empty says nothing went wrong, and is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A list of refusals no literal spells is read as carrying them.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A builder of that name taking no code is not seen, since no number is ever handed it.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A number inside an expression is not judged, only a number written on its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name is refused only where the number beside it is the one that name means.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One of those names holding another number is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declaration inside a function is refused as one at the top of a file is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An exported declaration is refused as a private one is.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A name read from another page rather than from a number is not seen.",
    },
  ],
} as const satisfies SyntaxRule
