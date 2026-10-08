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
        "Built in domain/temper-addon-world-quest-port and deployed to the game: Controls, Temper Quests, Port Near Quest Objective calls TemperWorld.PortNearQuestObjective. It reads the tracker's assisted quest, asks the objective's position on its zone map, and ports to the nearest found wayshrine or owned house, saying each port and refusal in chat. Left is Alan setting the key and seeing ports land in game.",
    },
  ],
  updatedAt: "2026-10-08T14:57:11.114Z",
} as const satisfies Initiative
