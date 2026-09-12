import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperAddonCopyMetadata = {
  id: "01a0603c-c1c9-7aeb-a484-f4b4517ed141",
  type: "command",
  slug: "temper-addon-copy-metadata",
  definition:
    "the command copying an addon's manifest, markup, assets and siblings into its build output",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "--addon <name>", takes: "the addon whose metadata is copied" },
    { said: "--code-root <path>", takes: "the checkout read and written" },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "A call naming no addon is refused rather than answered with a default.",
    },
    {
      invariantKind: "departure",
      statement: "The load order is written before anything is copied.",
    },
    {
      invariantKind: "departure",
      statement: "An absent markup file is written empty.",
    },
    {
      invariantKind: "departure",
      statement: "A declared sibling folder that is missing refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout written into is named on the call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing written here is carried by a commit.",
    },
  ],
  name: "copy-metadata",
} as const satisfies Command
