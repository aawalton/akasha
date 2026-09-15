import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulSomeKindOfMiracle = {
  id: "01a0a5ae-cce4-73af-8b5d-d914d18178ba",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-some-kind-of-miracle",
  ownLength: 3.63355,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Wa0Znke8LABriGEDOfyuZ",
      externalLink: "https://open.spotify.com/track/4Wa0Znke8LABriGEDOfyuZ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Some Kind Of Miracle",
} as const satisfies Track
