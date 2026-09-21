import type { TemperAddon } from "akasha/temper/addon/temper-addon.page-type.types.ts"

export const temperLibSlashCommander = {
  id: "01a06066-8400-790c-a2ed-5c212c9cdab7",
  type: "page-type/temper-addon",
  slug: "temper-lib-slash-commander",
  definition: "a slash command another addon registers, and the chat completion offering it",

  addonManifest: "json",
  bundleEntry: "module/slash-commander-entry",
  parts: [
    "module/slash-command",
    "module/slash-commander-casts",
    "module/slash-commander-chat-hooks",
    "module/slash-commander-descriptions",
    "module/slash-commander-display-text",
    "module/slash-commander-entry",
    "module/slash-commander-messages",
    "module/slash-commander-providers",
    "module/slash-commander-surface",
    "module/slash-commander-types",
    "type-declaration/slash-commander-declarations",
    "type-declaration/slash-commander-entry-declarations",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A command has as many aliases as a caller adds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command has subcommands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subcommand has subcommands of its own.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A command may not become an ancestor of itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's own slash commands are offered for completion beside the added ones.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A completion is colored by which of the four kinds the command is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A description is a string or a call answering a string.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's chat entry is hooked rather than replaced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game reaches the library through one global name.",
    },
  ],
} as const satisfies TemperAddon
