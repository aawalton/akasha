import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NewMoonShineTheFrozenMan = {
  id: "01a0abeb-3fb2-7743-ac1c-481501be38cd",
  type: "page-type/track",
  slug: "james-taylor-2-new-moon-shine-the-frozen-man",
  ownLength: 3.904,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-new-moon-shine"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1eh6QSEBkWZSVTt6HT7wDU",
      externalLink: "https://open.spotify.com/track/1eh6QSEBkWZSVTt6HT7wDU",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Frozen Man",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "thefrozenman|0vn7UBvSQECKJm2817Yf1P|234240",
  song: "song/james-taylor-the-frozen-man",
} as const satisfies Track
