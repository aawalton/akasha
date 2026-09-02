import type { EsoAddon } from "../../code-system/eso-addon/eso-addon.page-type.ts"

export const temperLibSlashCommander = {
  id: "01a06066-8400-790c-a2ed-5c212c9cdab7",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-slash-commander",
  definition: "a slash command another addon registers, and the chat completion offering it",
  manifest: "json",
  addonManifest: "json",
  partSlugs: [
    "module/slash-commander-surface",
    "module/slash-command",
    "module/slash-commander-providers",
    "module/slash-commander-chat-hooks",
    "module/slash-commander-descriptions",
    "module/slash-commander-messages",
    "module/slash-commander-display-text",
    "module/slash-commander-casts",
    "module/slash-commander-types",
    "module/slash-commander-declarations",
    "module/slash-commander-entry",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command carries as many aliases as a caller adds.",
    },
    {
      invariantKind: "departure",
      statement: "A command holds subcommands.",
    },
    {
      invariantKind: "departure",
      statement: "A subcommand holds subcommands of its own.",
    },
    {
      invariantKind: "constraint",
      statement: "A command may not become an ancestor of itself.",
    },
    {
      invariantKind: "departure",
      statement: "The game's own slash commands are offered for completion beside the added ones.",
    },
    {
      invariantKind: "departure",
      statement: "A completion is colored by which of the four kinds the command is.",
    },
    {
      invariantKind: "departure",
      statement: "A description is a string or a call answering a string.",
    },
    {
      invariantKind: "constraint",
      statement: "The game's chat entry is hooked rather than replaced.",
    },
    {
      invariantKind: "departure",
      statement: "The game reaches the library through one global name.",
    },
  ],
} as const satisfies EsoAddon
