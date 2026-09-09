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
        "Points and calories on a day page are counted over the window the day model derives.",
      workingMemory:
        "45 of 250 days hold different session-row counts under `getEsoDayWindow` than under `spannedWindow`, so points and calories on one day page are counted over different days. `session-points-compute.module.code.ts:103,107`, `task-completions.module.code.ts:120` and `topic-words.module.code.ts:64` take the first; `active-calories.module.code.ts:30` takes the second. Held back because mending it recomputes points already stored on day pages, which Alan watches.",
    },
  ],
} as const satisfies Initiative
