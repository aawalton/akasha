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
        "A keybind ports Alan to the wayshrine nearest the next objective of the quest he is on.",
      workingMemory:
        "The game answers where a quest objective is through RequestJournalQuestConditionAssistance, whose answer comes back as EVENT_QUEST_POSITION_REQUEST_COMPLETE with map x and y. GetFastTravelNodeInfo gives each wayshrine's map x and y and whether it is known. FastTravelToNode ports, and Temper already calls it in craft-utilities, sets-core-api-nav and pithka-labels. Nothing is built yet.",
    },
  ],
} as const satisfies Initiative
