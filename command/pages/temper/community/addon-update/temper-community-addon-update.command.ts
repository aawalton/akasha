import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperCommunityAddonUpdate = {
  id: "01a0603c-c1cd-7290-b641-179d70de4bc2",
  type: "command",
  slug: "temper-community-addon-update",
  definition:
    "the command installing the published updates for the third-party game addons already here",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A download whose MD5 disagrees with the catalog's is not installed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the outdated addons are updated unless the call forces every one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An `--only` folder that is no installable addon is refused by name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One addon that fails does not stop the rest.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every addon that failed is named in the refusal rather than counted alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder the deploy pipeline owns is never touched.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reports a change without making that change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder laid down before its group threw is named updated rather than failed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder the archive carried nothing for is named failed rather than left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A folder cleared whose new one never landed is named gone rather than left as it was.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder that was never cleared is refused as the fault alone.",
    },
  ],
  name: "addon-update",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/code-root" },
    { argument: "argument/addons-dir" },
    { argument: "argument/force" },
    { argument: "argument/only", repeats: true },
  ],
} as const satisfies Command
