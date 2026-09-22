import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsPinTypeConstants = {
  id: "01a06269-290f-76e6-aa2e-b6deb157cb57",
  type: "page-type/module",
  slug: "destinations-pin-type-constants",
  definition: "the pin kinds the destinations half names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Every pin kind named here is written into the saved variables under that same name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pin kind is named in mixed case, and a registered string id is named in upper case.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No pin kind named here is renamed, since a rename clears that pin filter on every character.",
    },
  ],
} as const satisfies Module
