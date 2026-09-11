import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const addonPlacing = {
  id: "01a090b8-6baa-7001-902c-0a3fc6d7cf83",
  pageTypeSlug: "module",
  type: "module",
  slug: "addon-placing",
  definition: "an addon's folder in the game replaced with what the build output has",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An addon with no build is refused rather than placed.",
    },
    {
      invariantKind: "departure",
      statement: "Each sibling folder the manifest declares is replaced beside the addon.",
    },
    {
      invariantKind: "departure",
      statement: "A placed entry is verified against its source by sha256.",
    },
    {
      invariantKind: "departure",
      statement: "A symbolic link in a build is verified rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A folder with no build stamp was placed by something else.",
    },
    {
      invariantKind: "departure",
      statement: "Such a folder new enough for every version this fleet asks of it is left alone.",
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
} as const satisfies Module
