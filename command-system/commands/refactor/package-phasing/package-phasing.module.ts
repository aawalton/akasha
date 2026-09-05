import type { Module } from "@akasha/code-system/module"

export const packagePhasing = {
  id: "01a07245-8d2b-7f3a-8c13-c97c55d53541",
  pageTypeSlug: "module",
  slug: "package-phasing",
  definition: "the phase a package rename is in, read from the manifests",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A phase is read from the manifests rather than from a cursor.",
    },
    {
      invariantKind: "departure",
      statement: "An alias names the old name among the root manifest's dependencies.",
    },
    {
      invariantKind: "departure",
      statement: "That alias points the old name at the package the rename renamed.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest calling the old name means expand.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest carrying each name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The new name carried with the old name aliased at the root means migrate.",
    },
    {
      invariantKind: "departure",
      statement: "The new name carried with no alias left means the rename is done.",
    },
    {
      invariantKind: "departure",
      statement: "Migrate takes one batch of files to one commit.",
    },
    {
      invariantKind: "departure",
      statement: "A batch is the files naming the old name, no wider than the width asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A phase names the change kind that phase lands under.",
    },
    {
      invariantKind: "departure",
      statement: "Expand lands as a `change-mechanical` change.",
    },
    {
      invariantKind: "departure",
      statement: "Migrate lands each batch as a `change-mechanical` change.",
    },
    {
      invariantKind: "departure",
      statement: "Contract lands as a `change-checked` change.",
    },
    {
      invariantKind: "departure",
      statement: "Contract judges every path the rename touched rather than the paths it changes.",
    },
    {
      invariantKind: "departure",
      statement: "A path the rename respelled is judged once, by contract, over the final body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file or reads the disk.",
    },
  ],
} as const satisfies Module
