import type { SyntaxRule } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.types.ts"

export const noVoidReturn = {
  id: "01a0502e-a144-778b-8b3c-5e4f4be4713d",
  type: "syntax-rule",
  slug: "no-void-return",
  definition: "the rule refusing `void` where a function written here states its return type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "`undefined` takes its place.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`undefined` is the single spelling a body returning something cannot fill.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An async body is the case this rule is for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every failure inside the async body goes unheard.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a function whose body is written here is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declaration has a body written here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A function expression has a body written here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An arrow has a body written here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A method has a body written here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A getter has a body written here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An overload signature is judged with the body the overload signature heads.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A function type describes a function written elsewhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A method signature describes a function written elsewhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call signature describes a function written elsewhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A constructor type describes a function written elsewhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ambient declaration describes a function written elsewhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every declaration a declaration file carries is ambient.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A type describing a function written elsewhere is left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A callback a caller fills is such a type.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A function answering `void` fits no slot spelled `undefined`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The line named is the annotation's own rather than the function's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`void` reached as a type argument is left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`Promise<void>` is the case left most often.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`void` used as an operator on an expression is untouched.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`void` used as an operator on an expression is no type at all.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A body filling a slot spelled `void` and dropping a promise is left.",
    },
  ],
} as const satisfies SyntaxRule
