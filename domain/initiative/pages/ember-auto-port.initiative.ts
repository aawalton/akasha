import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberAutoPort = {
  id: "01a11bfa-1bdc-7672-8cb4-e31b37e3a025",
  type: "page-type/initiative",
  slug: "ember-auto-port",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    {
      statement:
        "A keybind ports Alan to the wayshrine or owned house nearest his focused quest's next objective.",
      workingMemory:
        "RequestJournalQuestConditionAssistance answers through EVENT_QUEST_POSITION_REQUEST_COMPLETE with map x and y. GetFastTravelNodeInfo gives every node's x and y; a house is a node of POI_TYPE_HOUSE, and GetFastTravelNodeHouseId names it. FastTravelToNode ports to a known wayshrine. RequestJumpToHouse(houseId, true) ports outside a house. Alan approved the design; the build is under way.",
    },
  ],
} as const satisfies Initiative
