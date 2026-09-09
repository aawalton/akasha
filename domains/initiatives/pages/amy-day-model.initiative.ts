import type { Initiative } from "../initiative.page-type.ts"

export const amyDayModel = {
  id: "01a0822f-86b1-7075-9318-ba9ec1888f24",
  pageTypeSlug: "initiative",
  slug: "amy-day-model",
  domain: "domain/track",
  persona: "amy",
  constraints: [
    "Stop and talk to Alan where a change to the day model is not easy, fast and safe.",
  ],
  intents: [
    {
      statement:
        "Everything measured about one of Alan's days sits on one `day` page under `alan/track/days/pages`.",
      workingMemory:
        "The type is `day` and every page is slugged `day-YYYY-MM-DD` under `alan/track/days/pages`. `eso-day` is no longer a page type: its 253 row files sit beside the day page of the same date, byte for byte, and the six-in-the-morning ESO boundary remains only as the rule saying which date a reading is filed under. `email-entry` is no longer a page type either: the one number its 20 pages held is `lowestEmailInboxCount` on the day page of the same date.",
    },
    {
      statement:
        "Every points figure stored on a day page was counted over the window the day model derives.",
      workingMemory:
        "The live readers take it now: `session-points-compute.module.code.ts:103,107`, `task-completions.module.code.ts:120` and `topic-words.module.code.ts:64,202` call `openedWindowOn`. What is left is history: 87 day pages carry `taskPoints`, 86 `healthPoints`, 77 `sleepPoints`, 78 `nutritionPoints`, 75 `breathingPoints`, each counted over the ESO window and each feeding a level the day page shows. Only `topic-words` and `active-calories` still run, so recomputing the rest needs a driver first.",
    },
  ],
} as const satisfies Initiative
