import type { Song } from "../../song.page-type.ts"

export const auroraBloodInTheWine = {
  id: "019ea4a5-8cc9-7a02-8ee4-ea9769322aca",
  pageTypeSlug: "song",
  slug: "aurora-blood-in-the-wine",
  title: "Blood in the Wine",
  artistSlug: "aurora",
  externalId: "64b9d85a-90ed-4758-a3bc-277421c54d75",
  externalLink: "https://musicbrainz.org/work/64b9d85a-90ed-4758-a3bc-277421c54d75",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
