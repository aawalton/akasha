import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperAddonGenerateLoadOrder = {
  id: "01a0603c-c1c9-7ee8-bee7-dc59bf99a048",
  type: "page-type/command",
  slug: "temper-addon-generate-load-order",
  definition:
    "the command writing an addon's load-order manifest and build stamp into its build output",
  code: "ts",
  test: "ts",

  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no addon is refused rather than answered with a default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Writing a load order for an addon nobody named would overwrite build output nobody asked about.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The manifest is written from the addon's own declaration.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The catalog addon takes its api version from the pages system.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That version is the lowest any active catalog domain last ran for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checkout written into is named on the call.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing written here is carried by a commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that wrote before it threw says in its refusal what that run had written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
  ],
  name: "generate-load-order",
  arguments: [{ argument: "argument/code-root" }, { argument: "argument/addon", required: true }],
} as const satisfies Command
