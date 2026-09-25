import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemSetCatalogCapture = {
  id: "01a06127-6644-7d5a-b5dd-845d71c2890e",
  type: "page-type/module",
  slug: "item-set-catalog-capture",
  definition:
    "the game's item sets, with the pieces and category of each, read into the add-on's saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Sets are read in batches so the client keeps answering while collection runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set with no name or no pieces is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A piece's item id and its armor, equip and weapon types are read off the piece's item link.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A piece the client gives no item link for is kept with its place-holding name only.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads which pieces the player has collected.",
    },
  ],
} as const satisfies Module
