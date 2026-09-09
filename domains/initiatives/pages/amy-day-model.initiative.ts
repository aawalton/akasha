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
        "The type is `day` and every page is slugged `day-YYYY-MM-DD` under `alan/track/days/pages`, 250 of them, one for each date with data. Nothing in the day model is named for a waking now. A day begins when its first sleep block starting or running past six the previous evening began, derived on every read, and a day finding no such sleep opens at six the previous evening. What is left is `eso-day`, which still has the health samples and the listens.",
    },
    {
      statement:
        "Every health sample and listen filed under an ESO day is filed under the day Alan woke into.",
      workingMemory:
        "The day folder is a shard rather than a claim: `sample-selecting` sweeps a day either side of the range asked for and filters on each sample's own instant, so refiling changes no answer. The boundary now moves whenever Alan retitles a Rest block as Sleep, so a day key written onto a row is wrong from that moment. Amy has recommended dropping the refiling and deriving the day a sample falls in, and Alan has not yet ruled.",
    },
  ],
} as const satisfies Initiative
