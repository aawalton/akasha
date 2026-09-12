import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperCommunityAddonInstall = {
  id: "01a0603c-c1cd-7635-b045-738c4497daa8",
  type: "command",
  slug: "temper-community-addon-install",
  definition: "the command installing a third-party game addon from the community site by name",
  code: "ts",
  taking: [
    { said: "<name>", takes: "the community addon's name, or one of the folder names it installs" },
    { said: "--force", takes: "install again even where the target folders are already present" },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "A name reaching no entry in the community catalog is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "An entry installing a folder the deploy pipeline owns is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An entry declaring no install folder refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A target folder already present is left alone unless the call says `--force`.",
    },
    {
      invariantKind: "departure",
      statement: "A download is verified before extraction.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here keeps an addon it installed up to date.",
    },
  ],
  name: "addon-install",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/code-root" },
    { argument: "argument/addons-dir" },
  ],
} as const satisfies Command
