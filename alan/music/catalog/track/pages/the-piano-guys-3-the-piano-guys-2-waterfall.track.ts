import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2Waterfall = {
  id: "01a0afa2-20ca-7935-b1c7-80d68c45f73d",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-waterfall",
  ownLength: 3.066666666666667,
  ownProgress: 3.066666666666667,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Waterfall",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "waterfall|0jW6R8CVyVohuUJVcuweDI|184000",
  song: "song/the-piano-guys-waterfall",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys-2",
      discNumber: 1,
      position: 8,
      externalId: "1XZR9unh2oXTn5aWG60ipY",
      externalLink: "https://open.spotify.com/track/1XZR9unh2oXTn5aWG60ipY",
    },
  ],
} as const satisfies Track
