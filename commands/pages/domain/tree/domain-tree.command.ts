import type { Command } from "../../../command.page-type.ts"

export const domainTree = {
  id: "01a06936-1ef0-76c1-a12f-33eb7a0e5a10",
  pageTypeSlug: "command",
  type: "command",
  slug: "domain-tree",
  definition: "the domain tree, composed from the domain pages at the moment of asking",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  taking: [],
  helpNotes: [
    "it prints one JSON object on stdout and nothing else.",
    "the object carries `repo`, the `roots` of the tree, and `unreached`.",
    "each row under `roots` carries `slug`, `relPath`, `persona`, `position` and `children`.",
    "a domain hangs under the domain it names as its parent, and one naming no parent it can reach is a root.",
    "a domain no root reaches is named in `unreached`, so a broken edge is said rather than swallowed.",
    "`repo` is the akasha checkout the tree was read from, and `relPath` is each domain's path inside it, so a reader joins the two to open the file.",
    "the editor's domain tree asks this as a child process, because composing the tree reaches page bodies and loading one needs a transpiler only bun carries.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The tree is composed at the moment of asking rather than read from a store.",
    },
    {
      invariantKind: "departure",
      statement: "A domain hangs under the domain that domain names as its parent.",
    },
    {
      invariantKind: "departure",
      statement: "A domain no root reaches is named in `unreached` rather than dropped in silence.",
    },
    {
      invariantKind: "gap",
      statement:
        "An `unreached` emptied by reading no edge at all reads as an `unreached` with nothing in it.",
    },
    {
      invariantKind: "departure",
      statement: "The answer is one JSON object on stdout and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "This command takes no word.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming a word is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "This command's code file is an entry point that composes its own `Given` from the environment.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes nothing.",
    },
  ],
} as const satisfies Command
