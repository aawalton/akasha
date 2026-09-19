import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungSunOnTheMoon = {
  id: "01a0abeb-4135-7597-9bc5-d10b3bb0e47e",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-sun-on-the-moon",
  ownLength: 4.16,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5f92CdAUMKkxn1Bo7CBs53",
      externalLink: "https://open.spotify.com/track/5f92CdAUMKkxn1Bo7CBs53",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Sun On the Moon",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "sunonthemoon|0vn7UBvSQECKJm2817Yf1P|249600",
  song: "song/james-taylor-sun-on-the-moon",
} as const satisfies Track
