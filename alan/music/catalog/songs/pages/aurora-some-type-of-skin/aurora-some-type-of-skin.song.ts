import type { Song } from "../../song.page-type.ts"

export const auroraSomeTypeOfSkin = {
  id: "019ea4a6-28b5-746a-8a1f-f850797f56db",
  pageTypeSlug: "song",
  slug: "aurora-some-type-of-skin",
  title: "Some Type of Skin",
  artistSlug: "aurora",
  externalId: "90d0ad13-a202-4487-9c23-709b08085994",
  externalLink: "https://musicbrainz.org/work/90d0ad13-a202-4487-9c23-709b08085994",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
