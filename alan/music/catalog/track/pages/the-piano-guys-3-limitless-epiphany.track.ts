import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessEpiphany = {
  id: "01a0afa2-0ef8-74b1-9405-2df4de946b26",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-epiphany",
  ownLength: 4.699983333333333,
  ownProgress: 4.699983333333333,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  status: "completed",
  unit: "unit/minutes",
  title: "Epiphany",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "epiphany|0jW6R8CVyVohuUJVcuweDI|281999",
  song: "song/the-piano-guys-epiphany",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-limitless",
      discNumber: 1,
      position: 9,
      externalId: "06XspRiZpjqVdXVdJNVxzB",
      externalLink: "https://open.spotify.com/track/06XspRiZpjqVdXVdJNVxzB",
    },
  ],
} as const satisfies Track
