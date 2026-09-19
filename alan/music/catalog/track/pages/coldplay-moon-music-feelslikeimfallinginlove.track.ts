import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFeelslikeimfallinginlove = {
  id: "01a0b9ee-c8d7-77d8-8935-02d8d55ff294",
  type: "page-type/track",
  slug: "coldplay-moon-music-feelslikeimfallinginlove",
  ownLength: 3.9371666666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "49S3znqBAQyPyMpEuKeyJ6",
      externalLink: "https://open.spotify.com/track/49S3znqBAQyPyMpEuKeyJ6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "feelslikeimfallinginlove",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "feelslikeimfallinginlove|4gzpq5DPGxSnKTe4SA8HAU|236230",
  song: "song/coldplay-feelslikeimfallinginlove",
} as const satisfies Track
