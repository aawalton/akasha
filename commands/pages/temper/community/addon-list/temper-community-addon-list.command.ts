import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperCommunityAddonList = {
  id: "01a0603c-c1cd-7bf8-b51c-c43b2e4bb128",
  type: "command",
  slug: "temper-community-addon-list",
  definition:
    "the command naming each installed third-party game addon beside its newest published version",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "--outdated", takes: "name only the addons an update is published for" },
    { said: "--addons-dir <path>", takes: "the game's addon directory read" },
    { said: "--code-root <path>", takes: "the checkout the deploy-owned roster is read from" },
    { said: "--json", takes: "give the listing as JSON rather than as tab-separated rows" },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "The installed version is read from the folder on this disk.",
    },
    {
      invariantKind: "departure",
      statement: "The newest version is read from the community site.",
    },
    {
      invariantKind: "departure",
      statement: "A network that will not answer refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A folder the deploy pipeline owns is left out.",
    },
  ],
  name: "addon-list",
} as const satisfies Command
