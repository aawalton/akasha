import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noLibcByName = {
  id: "01a05030-729c-7c85-8f48-e6357917f933",
  pageTypeSlug: "syntax-rule",
  slug: "no-libc-by-name",
  definition:
    "the rule refusing a core system library opened by name rather than the one already mapped",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A core system library opened by its own name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The name one system carries is not the name another carries.",
    },
    {
      invariantKind: "departure",
      statement: "`libc.so.6` names nothing at all where musl is what runs.",
    },
    {
      invariantKind: "departure",
      statement: "A call is found in the parse and never in the text.",
    },
    {
      invariantKind: "departure",
      statement: "`dlopen` reached through an object is refused as a bare one is.",
    },
    {
      invariantKind: "departure",
      statement: "A library is named by the last part of its path.",
    },
    {
      invariantKind: "departure",
      statement: "Only the C runtime family is named.",
    },
    {
      invariantKind: "departure",
      statement: "Opening a library in general is an ordinary thing to do.",
    },
    {
      invariantKind: "departure",
      statement: "A test file is judged as any other.",
    },
    {
      invariantKind: "gap",
      statement: "A name built as the code runs is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "One written where it is opened is seen.",
    },
  ],
} as const satisfies SyntaxRule
