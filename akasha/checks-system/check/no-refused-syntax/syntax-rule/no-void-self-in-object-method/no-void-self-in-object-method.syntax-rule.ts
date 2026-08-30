import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noVoidSelfInObjectMethod = {
  id: "01a05031-0197-7c3c-a886-b0297dd3adcf",
  pageTypeSlug: "syntax-rule",
  slug: "no-void-self-in-object-method",
  definition: "the rule refusing `this: void` on a method written into an object literal",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A method written into an object literal declaring `this: void` is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A function assigned to a property is left, being reached with a dot rather than a colon.",
    },
    {
      invariantKind: "departure",
      statement:
        "A method on a class is left, the object literal being the only place this shorthand is emitted with a colon call.",
    },
    {
      invariantKind: "departure",
      statement:
        "Only `void` is refused. A `this` named as some other type says what calls the method, rather than saying nothing does.",
    },
    {
      invariantKind: "departure",
      statement: "A method declaring no `this` at all is left.",
    },
    {
      invariantKind: "departure",
      statement: "A test file is judged as any other.",
    },
    {
      invariantKind: "gap",
      statement:
        "That the generated call uses a colon is assumed here rather than read from the transpiler's settings.",
    },
    {
      invariantKind: "gap",
      statement:
        "A method put onto an object after the literal is written is not seen, standing outside it.",
    },
  ],
} as const satisfies SyntaxRule
