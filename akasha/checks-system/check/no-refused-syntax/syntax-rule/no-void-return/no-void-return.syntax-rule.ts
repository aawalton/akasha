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
      statement:
        "`undefined` is what stands in its place, being the one spelling a body returning something cannot fill.",
    },
    {
      invariantKind: "departure",
      statement:
        "An async body is the case this is for: its promise lands in a `void` slot unawaited, and every failure inside it goes unheard.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every return position is judged alike — a declaration, an arrow, a method, a function type, a method signature, a call signature and a constructor type.",
    },
    {
      invariantKind: "departure",
      statement: "The line named is the annotation's own, not the function's.",
    },
    {
      invariantKind: "departure",
      statement: "`void` reached as a type argument stands, `Promise<void>` above all.",
    },
    {
      invariantKind: "departure",
      statement: "`void` used as an operator on an expression is untouched, being no type at all.",
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
