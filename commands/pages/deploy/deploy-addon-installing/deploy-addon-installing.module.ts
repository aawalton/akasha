import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const deployAddonInstalling = {
  id: "01a090bd-a195-7917-b992-02729e839291",
  pageTypeSlug: "module",
  type: "module",
  slug: "deploy-addon-installing",
  definition: "one ESO addon compiled and put where the game reads it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An addon is named by the slug its page carries.",
    },
    {
      invariantKind: "departure",
      statement: "The folder an addon is built from is the folder its page sits in.",
    },
    {
      invariantKind: "departure",
      statement: "The name the game reads an addon by is the name that folder's manifest states.",
    },
    {
      invariantKind: "departure",
      statement: "A folder no addon manifest sits in refuses the deploy.",
    },
    {
      invariantKind: "departure",
      statement: "An addon is compiled before it is placed.",
    },
    {
      invariantKind: "departure",
      statement: "A compile that refuses leaves the game's folder as it was.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run says where the addon is built from and what it is placed as.",
    },
    {
      invariantKind: "departure",
      statement: "What the compile said is answered beside what the placing said.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is packed and nothing here leaves this machine.",
    },
  ],
} as const satisfies Module
