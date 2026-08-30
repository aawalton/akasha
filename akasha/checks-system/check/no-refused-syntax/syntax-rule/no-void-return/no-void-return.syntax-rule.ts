import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noVoidReturn = {
  id: "01a0502e-a144-778b-8b3c-5e4f4be4713d",
  pageTypeSlug: "syntax-rule",
  slug: "no-void-return",
  definition: "the rule refusing a return type written as `void`",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A return type of `void` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "`undefined` is what stands in its place.",
    },
    {
      invariantKind: "departure",
      statement: "It is the one spelling a body returning something cannot fill.",
    },
    {
      invariantKind: "departure",
      statement:
        "An async body is the case this is for: its promise lands in a `void` slot unawaited.",
    },
    {
      invariantKind: "departure",
      statement: "Every failure inside it goes unheard.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every return position is judged alike — a declaration and an arrow and a method and a function type and a method signature and a call signature and a constructor type.",
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
      statement: "`Promise<void>` stands above all.",
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
      invariantKind: "departure",
      statement: "A test file is judged as any other.",
    },
    {
      invariantKind: "gap",
      statement:
        "A parameter typed `void` is not seen. Only what a signature hands back is judged here.",
    },
  ],
} as const satisfies SyntaxRule
