import type { Command } from "@akasha/command-system/command"

export const talosImageBuild = {
  id: "01a06810-1f0b-710a-93fa-714723dbf5f9",
  pageTypeSlug: "command",
  slug: "talos-image-build",
  definition: "the command registering one node's schematic with the Talos Image Factory",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    {
      said: "<node>",
      takes: "the node to register for, said as a word rather than after `--node`",
    },
    { said: "--node <id>", takes: "the node to register for, as the node table names it" },
    {
      said: "--download <path>",
      takes: "the file to fetch the installer ISO to once it is registered",
    },
  ],
  helpNotes: [
    "the schematic is posted to the factory, which answers with the id and serves the installer built from it.",
    "the id is the content of the schematic, so the same extension list answers with the same id and a repeat costs nothing.",
    "naming no download reports the id and the installer's address and fetches nothing.",
    "the installer's address carries the cluster's Talos version, which is read off the node's own cluster.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The node is named as a word or after `--node`, and naming both is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A node the node table does not name is the caller's mistake.",
    },
    {
      invariantKind: "departure",
      statement: "A schematic id is the content of the schematic rather than a name given to it.",
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
  ],
} as const satisfies Command
