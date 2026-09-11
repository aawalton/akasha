import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const addonRoster = {
  id: "01a06060-ec3e-72ca-8583-d3120bbc8269",
  type: "module",
  slug: "addon-roster",
  definition: "every addon the repository has, each with the packages that addon reaches",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An addon under `temper/addons` is found by reading that folder.",
    },
    {
      invariantKind: "departure",
      statement: "An addon elsewhere is found by asking the index for every `eso-addon` page.",
    },
    {
      invariantKind: "departure",
      statement: "A folder with no addon manifest of either spelling is no addon.",
    },
    {
      invariantKind: "absence",
      statement:
        "Whether a folder is a package says nothing about whether that folder is an addon.",
    },
    {
      invariantKind: "departure",
      statement: "An addon stating no name is named for the folder with that addon.",
    },
    {
      invariantKind: "departure",
      statement: "An addon is reached by canonical name or by the name of its own folder.",
    },
    {
      invariantKind: "departure",
      statement: "An addon outside `temper/addons` is reached by its parent folder's name too.",
    },
    {
      invariantKind: "departure",
      statement: "A name matching no addon answers as a folder under `temper/addons`.",
    },
  ],
} as const satisfies Module
