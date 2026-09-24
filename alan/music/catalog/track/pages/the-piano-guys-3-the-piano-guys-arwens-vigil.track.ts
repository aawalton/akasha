import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysArwensVigil = {
  id: "01a0afa2-1973-7c3c-8b12-54ded1ff10d8",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-arwens-vigil",
  ownLength: 3.927983333333333,
  ownProgress: 3.927983333333333,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  status: "completed",
  unit: "unit/minutes",
  title: "Arwen's Vigil",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "arwensvigil|0jW6R8CVyVohuUJVcuweDI|235679",
  song: "song/the-piano-guys-arwens-vigil",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys",
      discNumber: 1,
      position: 7,
      externalId: "0nIO6lmFEdRPyQi4uJaHon",
      externalLink: "https://open.spotify.com/track/0nIO6lmFEdRPyQi4uJaHon",
    },
  ],
} as const satisfies Track
