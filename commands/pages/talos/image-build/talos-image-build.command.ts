import type { Command } from "akasha/commands/command.page-type.types.ts"

export const talosImageBuild = {
  id: "01a06810-1f0b-710a-93fa-714723dbf5f9",
  type: "command",
  slug: "talos-image-build",
  definition: "the command registering one node's schematic with the Talos Image Factory",
  code: "ts",
  test: "ts",
  taking: [
    {
      said: "--download <path>",
      takes: "the file to fetch the installer ISO to once it is registered",
    },
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing is fetched where no download is named.",
    },
    {
      invariantKind: "departure",
      statement: "The node is named as a word or after `--node`.",
    },
    {
      invariantKind: "departure",
      statement: "A node named as a word and after `--node` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A node the node table does not name is the caller's mistake.",
    },
    {
      invariantKind: "departure",
      statement:
        "A schematic id is the content of the schematic rather than a name given to the schematic.",
    },
    {
      invariantKind: "departure",
      statement: "The Talos version in the installer's address is the node's cluster's own.",
    },
    {
      invariantKind: "departure",
      statement: "A path named for the download is read against the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "A fetch that answered other than plainly is operational rather than the data.",
    },
    {
      invariantKind: "departure",
      statement: "The id and the address are reported though the download did not land.",
    },
    {
      invariantKind: "departure",
      statement: "The schematic is named as soon as the factory holds it.",
    },
    {
      invariantKind: "departure",
      statement: "The download is named as soon as the bytes reach the disk.",
    },
    {
      invariantKind: "departure",
      statement: "A build that threw part way names those in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The registering and the writing this runs are handed in.",
    },
    {
      invariantKind: "departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
  ],
  name: "image-build",
  arguments: [{ argument: "argument/node", required: true, saidAs: "flag-or-word" }],
} as const satisfies Command
