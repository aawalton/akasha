import type { Module } from "@akasha/code-system/module"

export const mobileAnswering = {
  id: "01a0685d-ceae-7001-ab89-d96c099a2549",
  pageTypeSlug: "module",
  slug: "mobile-answering",
  definition: "the words a mobile command was called with, read, and the answer built from them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A flag naming a value takes the word after it.",
    },
    {
      invariantKind: "departure",
      statement: "A word opening with a dash is never read as a value.",
    },
    {
      invariantKind: "departure",
      statement: "A flag no command names is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "Every word a caller got wrong is named rather than the first alone.",
    },
    {
      invariantKind: "departure",
      statement: "A bare word stands for the flag a command says it stands for.",
    },
    {
      invariantKind: "departure",
      statement: "A bare word is refused where the flag it stands for was also named.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no app acts on the app the mobile-cli holds as its default.",
    },
    {
      invariantKind: "departure",
      statement: "An app slug no page carries is refused rather than defaulted.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command driving the simulator attaches to the session already standing rather than opening one.",
    },
    {
      invariantKind: "departure",
      statement: "A fault carrying a code of its own is answered with that code.",
    },
    {
      invariantKind: "departure",
      statement: "A fault carrying no code of its own is answered as operational.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here prints.",
    },
  ],
} as const satisfies Module
