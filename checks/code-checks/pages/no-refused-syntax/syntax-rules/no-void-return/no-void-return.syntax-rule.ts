import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noVoidReturn = {
  id: "01a0502e-a144-778b-8b3c-5e4f4be4713d",
  pageTypeSlug: "syntax-rule",
  slug: "no-void-return",
  definition: "the rule refusing `void` where a function written here states its return type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "`undefined` is what stands in its place.",
    },
    {
      invariantKind: "departure",
      statement: "`undefined` is the one spelling a body returning something cannot fill.",
    },
    {
      invariantKind: "departure",
      statement: "An async body is the case this rule is for.",
    },
    {
      invariantKind: "departure",
      statement: "Every failure inside the async body goes unheard.",
    },
    {
      invariantKind: "departure",
      statement: "Only a function whose body is written here is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration carries a body written here.",
    },
    {
      invariantKind: "departure",
      statement: "A function expression carries a body written here.",
    },
    {
      invariantKind: "departure",
      statement: "An arrow carries a body written here.",
    },
    {
      invariantKind: "departure",
      statement: "A method carries a body written here.",
    },
    {
      invariantKind: "departure",
      statement: "A getter carries a body written here.",
    },
    {
      invariantKind: "departure",
      statement: "An overload signature is judged with the body the overload signature heads.",
    },
    {
      invariantKind: "departure",
      statement: "A function type describes a function written elsewhere.",
    },
    {
      invariantKind: "departure",
      statement: "A method signature describes a function written elsewhere.",
    },
    {
      invariantKind: "departure",
      statement: "A call signature describes a function written elsewhere.",
    },
    {
      invariantKind: "departure",
      statement: "A constructor type describes a function written elsewhere.",
    },
    {
      invariantKind: "departure",
      statement: "A type describing a function written elsewhere stands.",
    },
    {
      invariantKind: "departure",
      statement: "A callback a caller fills is such a type.",
    },
    {
      invariantKind: "constraint",
      statement: "A function answering `void` fits no slot spelled `undefined`.",
    },
    {
      invariantKind: "departure",
      statement: "The line named is the annotation's own rather than the function's.",
    },
    {
      invariantKind: "departure",
      statement: "`void` reached as a type argument stands.",
    },
    {
      invariantKind: "departure",
      statement: "`Promise<void>` is the case that stands most often.",
    },
    {
      invariantKind: "departure",
      statement: "`void` used as an operator on an expression is untouched.",
    },
    {
      invariantKind: "departure",
      statement: "It is no type at all.",
    },
    {
      invariantKind: "gap",
      statement: "A parameter typed `void` is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "A body filling a slot spelled `void` and dropping a promise is not seen.",
    },
  ],
} as const satisfies SyntaxRule
