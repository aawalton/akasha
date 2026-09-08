import type { Command } from "@akasha/command-system/command"

export const temperAddonInstall = {
  id: "01a0603c-c1ca-72aa-be95-4b73f756de0e",
  pageTypeSlug: "command",
  slug: "temper-addon-install",
  definition:
    "the command replacing an addon's folder in the game with what the build output holds",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--addon <name>", takes: "the addon installed" },
    { said: "--code-root <path>", takes: "the checkout installed from" },
  ],
  helpNotes: [
    "the addon is built first, and a name carrying no build under `temper/addons/dist` is refused.",
    "each sibling folder the addon's manifest declares is replaced beside it.",
    "every installed entry is verified against its source by sha256 once written, symbolic links among them.",
    "the saved-variables migrations the new build needs are run after the files are in place.",
    "a folder carrying no build stamp was installed by something else, and it is left alone where it satisfies every version floor this fleet declares.",
    "such a folder is refused rather than deleted where it does not satisfy them, or where its version cannot be read at all.",
    "the extra Lua files a manifest names are written by the game, so they are carried across the replacement rather than overwritten.",
    "nothing is packed and nothing leaves this machine.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An install names one addon.",
    },
    {
      invariantKind: "departure",
      statement: "A name this repository holds no addon under is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An addon carrying no build is refused rather than installed.",
    },
    {
      invariantKind: "departure",
      statement: "Each sibling folder the manifest declares is replaced beside the addon.",
    },
    {
      invariantKind: "departure",
      statement: "An installed entry is verified against its source by sha256.",
    },
    {
      invariantKind: "departure",
      statement: "A symbolic link in a build is verified rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The count of entries verified is reported.",
    },
    {
      invariantKind: "departure",
      statement: "A folder carrying no build stamp was installed by something else.",
    },
    {
      invariantKind: "departure",
      statement: "Such a folder satisfying every declared version floor is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "Such a folder is refused rather than deleted on missing evidence.",
    },
    {
      invariantKind: "departure",
      statement: "The extra Lua files a manifest names are carried across the replacement.",
    },
    {
      invariantKind: "departure",
      statement: "The saved-variables migrations run after the files are in place.",
    },
    {
      invariantKind: "departure",
      statement: "A replacement that breaks off part way is refused rather than thrown on.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here leaves this machine.",
    },
  ],
} as const satisfies Command
