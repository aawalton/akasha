import type { Initiative } from "../initiative.page-type.ts"

export const amyDayModel = {
  id: "01a0822f-86b1-7075-9318-ba9ec1888f24",
  pageTypeSlug: "initiative",
  slug: "amy-day-model",
  domainSlug: "domain/track",
  personaSlug: "amy",
  constraints: [
    "Stop and talk to Alan where a change to the day model is not easy, fast and safe.",
  ],
  intents: [
    {
      statement:
        "Everything measured about one of Alan's days sits on one `day` page under `alan/track/days/pages`.",
      workingMemory:
        "Nothing is collapsed yet. `wake-day` carries the day Alan lives and `eso-day` carries the health samples and the listens. The boundary is worked out from the sleep sessions as that boundary is read and kept nowhere, so the one type keeps deriving it, and a day whose waking cannot be found begins where its ESO day begins.",
    },
    {
      statement:
        "Every health sample and listen filed under an ESO day is filed under the day Alan woke into.",
      workingMemory:
        "`sample-upsert` keeps the day as a storage key rather than working it out on a read, so refiling means rewriting those keys. `939706ec7a` mended the computation that answered the wrong day for one hour at each spring transition from 2024 to 2026, and left the keys already written wrong, which this refiling corrects.",
    },
  ],
} as const satisfies Initiative
