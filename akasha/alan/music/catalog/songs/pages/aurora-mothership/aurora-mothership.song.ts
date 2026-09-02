import type { Song } from "../../song.page-type.ts"

export const auroraMothership = {
  id: "019ea4a6-02b5-79e1-9bf9-8e71c980f261",
  pageTypeSlug: "song",
  slug: "aurora-mothership",
  title: "Mothership",
  artistSlug: "aurora",
  externalId: "7e3edeb7-4aa5-48ff-a9a3-c91b62ea9108",
  externalLink: "https://musicbrainz.org/work/7e3edeb7-4aa5-48ff-a9a3-c91b62ea9108",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
