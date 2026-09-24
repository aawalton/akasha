import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersBatmanEvolution = {
  id: "01a0afa2-1657-7436-84b6-88f268c336b5",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-batman-evolution",
  ownLength: 4.1591,
  ownProgress: 4.1591,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  status: "completed",
  unit: "unit/minutes",
  title: "Batman Evolution",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "batmanevolution|0jW6R8CVyVohuUJVcuweDI|249546",
  song: "song/the-piano-guys-batman-evolution",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-wonders",
      discNumber: 1,
      position: 7,
      externalId: "6ibZXyBDdozPtgmqM0mPvm",
      externalLink: "https://open.spotify.com/track/6ibZXyBDdozPtgmqM0mPvm",
    },
  ],
} as const satisfies Track
