import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3EasyOnMeEasyOnMe = {
  id: "01a0afa2-00dd-7101-9b65-80db07e629f0",
  type: "page-type/track",
  slug: "the-piano-guys-3-easy-on-me-easy-on-me",
  ownLength: 2.9859,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-easy-on-me"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ndm9V7DmeI3kOOMwaCMzk",
      externalLink: "https://open.spotify.com/track/1ndm9V7DmeI3kOOMwaCMzk",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Easy On Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "easyonme|0jW6R8CVyVohuUJVcuweDI|179154",
  song: "song/the-piano-guys-easy-on-me",
} as const satisfies Track
