import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPianoFocusGoldenHour = {
  id: "01a0afa1-c41f-78dd-a2b5-7c0a9f5f7156",
  type: "page-type/track",
  slug: "the-piano-guys-piano-focus-golden-hour",
  ownLength: 2.64285,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-piano-focus"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4bcYfAnZB7sm4Pblu2TqyX",
      externalLink: "https://open.spotify.com/track/4bcYfAnZB7sm4Pblu2TqyX",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Golden Hour",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "goldenhour|0jW6R8CVyVohuUJVcuweDI|158571",
} as const satisfies Track
