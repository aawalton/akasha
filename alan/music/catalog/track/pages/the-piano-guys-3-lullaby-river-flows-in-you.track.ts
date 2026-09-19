import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyRiverFlowsInYou = {
  id: "01a0afa1-de11-7a0c-8f9a-088bcdac57d6",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-river-flows-in-you",
  ownLength: 3.1565,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-lullaby"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5DwyaU9lBwhOleAgB42Yyk",
      externalLink: "https://open.spotify.com/track/5DwyaU9lBwhOleAgB42Yyk",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "River Flows In You",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "2GCX5sWxp6ZdPZZcrMMky2", artistName: "Eli Nelson" },
  ],
  trackKey: "riverflowsinyou|0jW6R8CVyVohuUJVcuweDI,2GCX5sWxp6ZdPZZcrMMky2|189390",
  song: "song/the-piano-guys-river-flows-in-you",
} as const satisfies Track
