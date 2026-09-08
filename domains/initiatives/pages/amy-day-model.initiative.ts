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
        "Every date carrying data has a page under `alan/track/days/pages`, 250 of them. The type is still spelled `wake-day`: the rename drafts and refuses on apply, because a page rename misses any relation whose property page slug differs from the key its body writes, and a worked file's export is renamed without restating its importers. `eso-day` still holds the health samples and the listens. The boundary is derived from the sleep sessions and kept nowhere.",
    },
    {
      statement:
        "Every health sample and listen filed under an ESO day is filed under the day Alan woke into.",
      workingMemory:
        "`sample-upsert` keeps the day as a storage key rather than working it out on a read, so refiling means rewriting those keys. Alan ruled that a reading whose waking cannot be recovered ports across unchanged, and one whose waking can be recovered aligns to that boundary. `939706ec7a` mended the computation that answered the wrong day for one hour at each spring transition from 2024 to 2026, and left the keys already written wrong, which this refiling corrects.",
    },
  ],
} as const satisfies Initiative
