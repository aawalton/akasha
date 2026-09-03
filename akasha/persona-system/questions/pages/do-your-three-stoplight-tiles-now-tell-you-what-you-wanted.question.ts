import type { Question } from "../question.page-type.ts"

export const doYourThreeStoplightTilesNowTellYouWhatYouWanted = {
  id: "019fec05-33ec-74a4-bded-27726c4c174c",
  pageTypeSlug: "question",
  slug: "do-your-three-stoplight-tiles-now-tell-you-what-you-wanted",
  ask: "Do your three stoplight tiles now tell you what you wanted?",
  askedBy: "dalla",
  askedIn: "019fd311-3ed2-7de0-871e-97c5fe437887",
  status: "dismissed",
  offered: [
    "Yes, leave them as they are",
    "Plants and Activity should be a ratio, not raw grams and calories",
    "No, something else is off",
  ],
  closedAt: "2026-08-10T14:14:02.789Z",
  context: "txt",
} as const satisfies Question
