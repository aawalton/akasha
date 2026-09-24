import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AsItWasCrescendo = {
  id: "01a0afa1-ff47-7c69-8bcd-cbb5dc0ab47b",
  type: "page-type/track",
  slug: "the-piano-guys-3-as-it-was-crescendo",
  ownLength: 3.2361,
  ownProgress: 3.2361,
  partOfCollections: ["release/the-piano-guys-3-as-it-was"],
  status: "completed",
  unit: "unit/minutes",
  title: "Crescendo",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "crescendo|0jW6R8CVyVohuUJVcuweDI|194166",
  song: "song/the-piano-guys-crescendo",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-as-it-was",
      discNumber: 1,
      position: 2,
      externalId: "3T6g8ClHPujXB8EUABssls",
      externalLink: "https://open.spotify.com/track/3T6g8ClHPujXB8EUABssls",
    },
  ],
} as const satisfies Track
