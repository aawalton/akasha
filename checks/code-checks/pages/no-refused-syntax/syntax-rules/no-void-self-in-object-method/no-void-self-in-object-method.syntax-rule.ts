import type { SyntaxRule } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.types.ts"

export const noVoidSelfInObjectMethod = {
  id: "01a05031-0197-7c3c-a886-b0297dd3adcf",
  type: "syntax-rule",
  slug: "no-void-self-in-object-method",
  definition: "the rule refusing `this: void` on a method written into an object literal",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A function assigned to a property is left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A function assigned to a property is reached with a dot rather than a colon.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A method on a class is left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The object literal is the only place this shorthand is emitted with a colon call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only `void` is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A method declaring no `this` parameter is left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "That the generated call uses a colon is assumed rather than read from the transpiler's settings.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A method put onto an object after the literal is written is not seen.",
    },
  ],
} as const satisfies SyntaxRule
