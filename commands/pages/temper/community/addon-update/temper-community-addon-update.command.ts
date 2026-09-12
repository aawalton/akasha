import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperCommunityAddonUpdate = {
  id: "01a0603c-c1cd-7290-b641-179d70de4bc2",
  type: "command",
  slug: "temper-community-addon-update",
  definition:
    "the command installing the published updates for the third-party game addons already here",
  code: "ts",
  taking: [
    { said: "--only <dir>", takes: "restrict the run to one addon folder, said once per folder" },
    {
      said: "--force",
      takes: "download and install every matched addon rather than only the outdated ones",
    },
    { said: "--addons-dir <path>", takes: "the game's addon directory read and written" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A download whose MD5 disagrees with the catalog's is not installed.",
    },
    {
      invariantKind: "departure",
      statement: "Only the outdated addons are updated unless the call forces every one.",
    },
    {
      invariantKind: "departure",
      statement: "An `--only` folder that is no installable addon is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "One addon that fails does not stop the rest.",
    },
    {
      invariantKind: "departure",
      statement: "Every addon that failed is named in the refusal rather than counted alone.",
    },
    {
      invariantKind: "departure",
      statement: "A folder the deploy pipeline owns is never touched.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reports a change without making that change.",
    },
  ],
  name: "addon-update",
  arguments: [{ argument: "argument/json" }, { argument: "argument/code-root" }],
} as const satisfies Command
