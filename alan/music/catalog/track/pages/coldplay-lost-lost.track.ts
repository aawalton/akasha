import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLostLost = {
  id: "01a0b9ee-fb29-79e7-9faa-bc3918a89410",
  type: "page-type/track",
  slug: "coldplay-lost-lost",
  ownLength: 3.91755,
  ownProgress: 3.91755,
  partOfCollections: ["release/coldplay-lost"],
  status: "completed",
  unit: "unit/minutes",
  title: "Lost!",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "lost|4gzpq5DPGxSnKTe4SA8HAU|235053",
  song: "song/coldplay-lost",
  carriedBy: [
    {
      release: "release/coldplay-lost",
      discNumber: 1,
      position: 1,
      externalId: "55Qm6iVvo1OMeoXc8elnmj",
      externalLink: "https://open.spotify.com/track/55Qm6iVvo1OMeoXc8elnmj",
    },
  ],
} as const satisfies Track
