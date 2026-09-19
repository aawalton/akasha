import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3MainTitleFromJurassicParkJurassicParkTheme = {
  id: "01a0afa2-1ea6-72a9-afa1-c1e28d11773c",
  type: "page-type/track",
  slug: "the-piano-guys-3-main-title-from-jurassic-park-jurassic-park-theme",
  ownLength: 3.9311333333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-main-title-from-jurassic-park"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5F6nH9kNbB48FusY2hFH01",
      externalLink: "https://open.spotify.com/track/5F6nH9kNbB48FusY2hFH01",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Jurassic Park Theme",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "3dRfiJ2650SZu6GbydcHNb", artistName: "John Williams" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
  ],
  trackKey: "jurassicparktheme|0jW6R8CVyVohuUJVcuweDI,3dRfiJ2650SZu6GbydcHNb|235868",
  song: "song/the-piano-guys-jurassic-park-theme",
} as const satisfies Track
