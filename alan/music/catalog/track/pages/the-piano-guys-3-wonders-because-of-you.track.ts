import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersBecauseOfYou = {
  id: "01a0afa2-16db-719b-95b5-cf39929b7745",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-because-of-you",
  ownLength: 4.04755,
  ownProgress: 4.04755,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  status: "completed",
  unit: "unit/minutes",
  title: "Because of You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "becauseofyou|0jW6R8CVyVohuUJVcuweDI|242853",
  song: "song/the-piano-guys-because-of-you",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-wonders",
      discNumber: 1,
      position: 11,
      externalId: "7KDCIv5nMgL5f5u6xbUVZq",
      externalLink: "https://open.spotify.com/track/7KDCIv5nMgL5f5u6xbUVZq",
    },
  ],
  createdAt: "2026-09-17T13:50:30.619Z",
  updatedAt: "2026-09-24T20:01:46.000Z",
} as const satisfies Track
