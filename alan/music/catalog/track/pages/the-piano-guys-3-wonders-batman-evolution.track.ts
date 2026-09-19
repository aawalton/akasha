import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersBatmanEvolution = {
  id: "01a0afa2-1657-7436-84b6-88f268c336b5",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-batman-evolution",
  ownLength: 4.1591,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ibZXyBDdozPtgmqM0mPvm",
      externalLink: "https://open.spotify.com/track/6ibZXyBDdozPtgmqM0mPvm",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Batman Evolution",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "batmanevolution|0jW6R8CVyVohuUJVcuweDI|249546",
  song: "song/the-piano-guys-batman-evolution",
} as const satisfies Track
