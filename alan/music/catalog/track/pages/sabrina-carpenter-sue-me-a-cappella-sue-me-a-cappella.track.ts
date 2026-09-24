import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSueMeACappellaSueMeACappella = {
  id: "01a0b111-2ff3-762d-8d18-9d7e118c94e9",
  type: "page-type/track",
  slug: "sabrina-carpenter-sue-me-a-cappella-sue-me-a-cappella",
  ownLength: 3.3756333333333335,
  ownProgress: 3.3756333333333335,
  partOfCollections: ["release/sabrina-carpenter-sue-me-a-cappella"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sue Me - A Cappella",
  trackType: "a-cappella",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "suemeacappella|74KM79TiuVKeVCqs8QtB0B|202538",
  song: "song/sabrina-carpenter-sue-me",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-sue-me-a-cappella",
      discNumber: 1,
      position: 1,
      externalId: "1GlBABlFOcIIlSEYcnOP3b",
      externalLink: "https://open.spotify.com/track/1GlBABlFOcIIlSEYcnOP3b",
    },
  ],
} as const satisfies Track
