import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversImARoadRunner = {
  id: "01a0abeb-33d6-7aec-b9c2-7d32b178126a",
  type: "page-type/track",
  slug: "james-taylor-2-covers-im-a-road-runner",
  ownLength: 3.2931,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-covers"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1WhUsyBScyAZBLL9FHVKfG",
      externalLink: "https://open.spotify.com/track/1WhUsyBScyAZBLL9FHVKfG",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "(I'm A) Road Runner",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "imaroadrunner|0vn7UBvSQECKJm2817Yf1P|197586",
  song: "song/james-taylor-im-a-road-runner",
} as const satisfies Track
