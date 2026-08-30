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
      statement:
        "A core system library opened by its own name is refused, because the process already holds one and a second brings a second set of its state.",
    },
    {
      invariantKind: "departure",
      statement:
        "The name one system carries is not the name another carries, so `libc.so.6` names nothing at all where musl is what runs.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call is found in the parse and never in the text, so a name written inside a string or a comment is not read as a call.",
    },
    {
      invariantKind: "departure",
      statement:
        "`dlopen` reached through an object is refused as a bare one is, because where the function came from does not change what it opens.",
    },
    {
      invariantKind: "departure",
      statement:
        "A library is named by the last part of its path, so the same name is read alike however many folders lead to it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Only the C runtime family is named, opening a library in general being an ordinary thing to do.",
    },
    {
      invariantKind: "departure",
      statement:
        "A test file is judged as any other, because a second C runtime loaded in a test misleads exactly as one loaded elsewhere.",
    },
    {
      invariantKind: "gap",
      statement: "A name built as the code runs is not seen, only one written where it is opened.",
    },
  ],
} as const satisfies SyntaxRule
