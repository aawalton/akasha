import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noLibcByName = {
  id: "01a05030-729c-7c85-8f48-e6357917f933",
  pageTypeSlug: "syntax-rule",
  type: "syntax-rule",
  slug: "no-libc-by-name",
  definition:
    "the rule refusing a core system library opened by name rather than the one already mapped",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The name one system has is not the name another has.",
    },
    {
      invariantKind: "departure",
      statement: "`libc.so.6` names no library of any kind where musl runs.",
    },

    {
      invariantKind: "departure",
      statement: "`dlopen` reached through an object is refused as a bare call is.",
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
      invariantKind: "gap",
      statement: "A name built as the code runs is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "A name written where the library is opened is seen.",
    },
  ],
} as const satisfies SyntaxRule
