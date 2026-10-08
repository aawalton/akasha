import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperAddonWorldQuestPort = {
  id: "01a11c00-c34a-74a6-83ef-374173c2051c",
  type: "page-type/domain",
  slug: "temper-addon-world-quest-port",
  definition:
    "a keybind porting the player to the travel point nearest the focused quest's objective",
  parts: ["module/quest-port-choose"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A travel point is a wayshrine the player has found or a house the player owns.",
    },
  ],
} as const satisfies Domain
