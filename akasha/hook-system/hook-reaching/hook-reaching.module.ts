import type { Module } from "@akasha/code-system/module"

export const hookReaching = {
  id: "01a062cc-64b0-7cb7-9482-21aa5e1f3d7c",
  pageTypeSlug: "module",
  slug: "hook-reaching",
  definition: "the file an agent hook's name reaches, worked out at the call",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hook is reached by the slug its page carries rather than by a path.",
    },
    {
      invariantKind: "departure",
      statement: "The path a name reaches is worked out afresh at every call.",
    },
    {
      invariantKind: "departure",
      statement: "The index answers which page carries a name.",
    },
    {
      invariantKind: "departure",
      statement: "The file run is the code file beside that page.",
    },
    {
      invariantKind: "departure",
      statement: "An index that will not answer sends the search into the akasha folder instead.",
    },
    {
      invariantKind: "departure",
      statement: "The search looks for the one name a hook's code file carries.",
    },
    {
      invariantKind: "departure",
      statement: "A folder git keeps its own workings in is passed over by the search.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaching no file is answered as unreached rather than as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaching more than one file is unreached too.",
    },
    {
      invariantKind: "departure",
      statement: "Why a name went unreached is carried in the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A path answered is read against the repository root.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs a hook or reads what a hook judges.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what an unreached name costs the call.",
    },
  ],
} as const satisfies Module
