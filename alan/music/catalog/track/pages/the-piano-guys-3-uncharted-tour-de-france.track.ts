import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedTourDeFrance = {
  id: "01a0afa2-1288-748a-a20d-6a298a13a37b",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-tour-de-france",
  ownLength: 3.59375,
  ownProgress: 3.59375,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  status: "completed",
  unit: "unit/minutes",
  title: "Tour de France",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "tourdefrance|0jW6R8CVyVohuUJVcuweDI|215625",
  song: "song/the-piano-guys-tour-de-france",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-uncharted",
      discNumber: 1,
      position: 10,
      externalId: "28FzX6iJyT6c29jdP1uRZL",
      externalLink: "https://open.spotify.com/track/28FzX6iJyT6c29jdP1uRZL",
    },
  ],
} as const satisfies Track
