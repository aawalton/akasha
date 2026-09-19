import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSueMeACappellaSueMeACappella = {
  id: "01a0b111-2ff3-762d-8d18-9d7e118c94e9",
  type: "page-type/track",
  slug: "sabrina-carpenter-sue-me-a-cappella-sue-me-a-cappella",
  ownLength: 3.3756333333333335,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-sue-me-a-cappella"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1GlBABlFOcIIlSEYcnOP3b",
      externalLink: "https://open.spotify.com/track/1GlBABlFOcIIlSEYcnOP3b",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Sue Me - A Cappella",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "suemeacappella|74KM79TiuVKeVCqs8QtB0B|202538",
  song: "song/sabrina-carpenter-sue-me",
} as const satisfies Track
