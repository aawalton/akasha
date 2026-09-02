import type { Song } from "../../song.page-type.ts"

export const auroraTheWomanIAm = {
  id: "019ea4a6-7568-7075-ab72-29f5256c8883",
  pageTypeSlug: "song",
  slug: "aurora-the-woman-i-am",
  title: "The Woman I Am",
  artistSlug: "aurora",
  externalId: "a43eed81-264f-4486-adbb-4c71b82c1148",
  externalLink: "https://musicbrainz.org/work/a43eed81-264f-4486-adbb-4c71b82c1148",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
