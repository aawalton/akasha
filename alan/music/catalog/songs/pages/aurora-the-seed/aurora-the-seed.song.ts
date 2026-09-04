import type { Song } from "../../song.page-type.ts"

export const auroraTheSeed = {
  id: "019ea4a4-7255-734d-aef6-52b129ac0d11",
  pageTypeSlug: "song",
  slug: "aurora-the-seed",
  title: "The Seed",
  artistSlug: "aurora",
  externalId: "43f7f67b-3e08-4a98-a26e-2026b10d3fa0",
  externalLink: "https://musicbrainz.org/work/43f7f67b-3e08-4a98-a26e-2026b10d3fa0",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
