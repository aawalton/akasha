import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPianoFocusCarmensLibertango = {
  id: "01a0afa1-c43f-77c7-af51-3ef7e8fa8010",
  type: "page-type/track",
  slug: "the-piano-guys-piano-focus-carmens-libertango",
  ownLength: 2.7695833333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-piano-focus"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1RU6q7tbSBR3eppziMdkG8",
      externalLink: "https://open.spotify.com/track/1RU6q7tbSBR3eppziMdkG8",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Carmen's Libertango",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "carmenslibertango|0jW6R8CVyVohuUJVcuweDI|166175",
  song: "song/the-piano-guys-carmens-libertango",
} as const satisfies Track
