import type { Command } from "@akasha/command-system/command"

export const temperCommunityAddonInstall = {
  id: "01a0603c-c1cd-7635-b045-738c4497daa8",
  pageTypeSlug: "command",
  slug: "temper-community-addon-install",
  definition: "the command installing a third-party game addon from the community site by name",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<name>", takes: "the community addon's name, or one of the folder names it installs" },
    { said: "--force", takes: "install again even where the target folders are already present" },
    { said: "--addons-dir <path>", takes: "the game's addon directory installed into" },
    { said: "--repo-root <path>", takes: "the checkout the deploy-owned roster is read from" },
    { said: "--json", takes: "give the outcome as JSON rather than as a tab-separated line" },
  ],
  helpNotes: [
    "the addon is downloaded, verified and extracted, and a step that fails refuses the call.",
    "an entry installing a folder the deploy pipeline owns is refused rather than allowed to overwrite it.",
    "a target folder already present is left alone unless `--force` is said.",
    "the addon is unmanaged once installed, so nothing here keeps it up to date.",
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
  ],
} as const satisfies Command
