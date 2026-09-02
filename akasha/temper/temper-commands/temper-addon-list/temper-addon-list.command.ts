import type { Command } from "@akasha/command-system/command"

export const temperAddonList = {
  id: "01a0603c-c1ca-7749-a8e8-ffbbcbf15e84",
  pageTypeSlug: "command",
  slug: "temper-addon-list",
  definition: "the command naming every addon source folder the checkout holds",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--json",
      takes: "give one record per addon as JSON rather than as tab-separated rows",
    },
    { said: "--repo-root <path>", takes: "the checkout the addons are discovered in" },
  ],
  helpNotes: [
    "both the flat layout and the nested layout are discovered.",
    "the roster is read from the checkout rather than from any list written by hand.",
    "a checkout holding no addon is refused, since an empty roster and an unreadable one read alike.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The flat layout and the nested layout are discovered alike.",
    },
    {
      invariantKind: "departure",
      statement: "The roster is read from the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout holding no addon is refused rather than reported empty.",
    },
    {
      invariantKind: "departure",
      statement: "Each addon is named beside the folder that addon was found in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the game folder.",
    },
  ],
} as const satisfies Command
