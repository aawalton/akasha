import type { Command } from "../../../../../command.page-type.ts"

export const temperAddonBundlePublish = {
  id: "01a0603c-c1c8-7f53-b9d9-96714b600427",
  pageTypeSlug: "command",
  type: "command",
  slug: "temper-addon-bundle-publish",
  definition:
    "the command putting the addon bundle into the cluster registry under its content hash",
  code: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "--code-root <path>", takes: "the checkout built from and written into" },
    { said: "--registry <host:port>", takes: "where the image is pushed" },
  ],
  helpNotes: [
    "the registry is reached from the workstation rather than from the cluster.",
    "a build giving no archive, or one that cannot be read, refuses the call.",
    "the build, the image assembly and the push are each bounded, and one reaching its bound refuses the call.",
    "every addon is compiled and packed by this command itself rather than by a separate call made first.",
    "the tag naming the image is written into the checkout only once the push is done.",
    "the tag lands as its own commit through the mechanical change that writes a code file, rather than being left unlanded in the tree.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The image is named by the hash of the archive inside.",
    },
    {
      invariantKind: "departure",
      statement: "A commit changing no addon publishes no new image.",
    },
    {
      invariantKind: "departure",
      statement: "A build giving no archive refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A push that fails refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The tag is written after the push rather than before that push.",
    },
    {
      invariantKind: "departure",
      statement: "The tag lands as a mechanical change rather than written by this command.",
    },
    {
      invariantKind: "departure",
      statement: "A tag already naming this image lands nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The name pushed to and the name pulled from are two names for one registry.",
    },
  ],
} as const satisfies Command
