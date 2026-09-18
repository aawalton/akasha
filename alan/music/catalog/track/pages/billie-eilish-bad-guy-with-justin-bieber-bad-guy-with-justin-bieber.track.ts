import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishBadGuyWithJustinBieberBadGuyWithJustinBieber = {
  id: "01a0b638-ea33-7b13-b1a4-51e228a3458c",
  type: "page-type/track",
  slug: "billie-eilish-bad-guy-with-justin-bieber-bad-guy-with-justin-bieber",
  ownLength: 3.247316666666667,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-bad-guy-with-justin-bieber"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3yNZ5r3LKfdmjoS3gkhUCT",
      externalLink: "https://open.spotify.com/track/3yNZ5r3LKfdmjoS3gkhUCT",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "bad guy (with Justin Bieber)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" },
    { externalId: "1uNFoZAHBGtllmzznpCI3s", artistName: "Justin Bieber" },
  ],
  trackKey: "badguywithjustinbieber|1uNFoZAHBGtllmzznpCI3s,6qqNVTkY8uBg9cP3Jd7DAH|194839",
} as const satisfies Track
