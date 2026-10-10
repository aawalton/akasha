import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperAddonWorldQuestPort = {
  id: "01a11c00-c34a-74a6-83ef-374173c2051c",
  type: "page-type/domain",
  slug: "temper-addon-world-quest-port",
  definition:
    "the keybinds porting the player to the travel point nearest a quest or treasure spot",
  parts: [
    "module/quest-port-choose",
    "module/treasure-port-choose",
    "module/quest-port",
    "module/treasure-port",
    "module/quest-port-travel",
    "module/quest-port-capture",
    "module/quest-port-journal",
    "module/quest-port-assist-trace",
    "module/quest-port-key-owners",
    "module/quest-port-trace",
    "module/quest-port-reading",
    "module/quest-port-key-reading",
    "module/quest-port-treasure-reading",
    "module/quest-port-breadcrumb-probe",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A travel point is a wayshrine the player has found or a house the player owns.",
    },
  ],
  createdAt: "2026-10-08T14:52:54.474Z",
  updatedAt: "2026-10-10T13:55:00.117Z",
} as const satisfies Domain
