import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperAddonCopyMetadata = {
  id: "01a0603c-c1c9-7aeb-a484-f4b4517ed141",
  type: "command",
  slug: "temper-addon-copy-metadata",
  definition:
    "the command copying an addon's manifest, markup, assets and siblings into its build output",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no addon is refused rather than answered with a default.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Copying for an addon nobody named would overwrite build output nobody asked about.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The load order is written before anything is copied.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An absent markup file is written empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declared sibling folder that is missing refuses the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The checkout written into is named on the call.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing written here is carried by a commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that wrote before it threw says in its refusal what that run had written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
  ],
  name: "copy-metadata",
  arguments: [{ argument: "argument/code-root" }, { argument: "argument/addon", required: true }],
} as const satisfies Command
