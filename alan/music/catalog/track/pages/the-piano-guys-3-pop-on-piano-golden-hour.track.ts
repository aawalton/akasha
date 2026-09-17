import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3PopOnPianoGoldenHour = {
  id: "01a0afa1-ce85-7020-8733-97ad67466ddd",
  type: "page-type/track",
  slug: "the-piano-guys-3-pop-on-piano-golden-hour",
  ownLength: 2.64285,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-pop-on-piano"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1pLvJUJJ5HzdrHcRtfgDip",
      externalLink: "https://open.spotify.com/track/1pLvJUJJ5HzdrHcRtfgDip",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Golden Hour",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "goldenhour|0jW6R8CVyVohuUJVcuweDI|158571",
} as const satisfies Track
