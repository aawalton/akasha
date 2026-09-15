import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const piping = {
  id: "01a05f4d-3577-7280-96a6-982e5bab7445",
  type: "module",
  slug: "piping",
  definition: "what a command is handed on standard input",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The input is reached only where the call names no file for a body.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal is nothing piped in.",
    },
    {
      invariantKind: "departure",
      statement: "An input with no byte is nothing piped in.",
    },
    {
      invariantKind: "departure",
      statement: "A read of the input waits a stated while and never without end.",
    },
    {
      invariantKind: "departure",
      statement: "The while begins again at every byte that arrives.",
    },
    {
      invariantKind: "departure",
      statement: "An input that had nothing before the while ran out is nothing piped in.",
    },
    {
      invariantKind: "departure",
      statement:
        "An input that went quiet part way through a body is refused rather than taken as that body.",
    },
    {
      invariantKind: "departure",
      statement: "An input that went quiet part way is told from an input that would not open.",
    },
    {
      invariantKind: "absence",
      statement: "A body piped in where every path names a file is left unread.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not text is carried through as the bytes the body is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body holding a line that begins with `<<<<<<<`, `=======` or `>>>>>>>` is marked.",
    },
    {
      invariantKind: "absence",
      statement: "This module reaches the disk only at the input itself.",
    },
    {
      invariantKind: "absence",
      statement: "The wording a caller is told to say instead is handed in by that caller.",
    },
    {
      invariantKind: "gap",
      statement:
        "An input no second descriptor can be opened on is answered as an input that would not open.",
    },
  ],
} as const satisfies Module
