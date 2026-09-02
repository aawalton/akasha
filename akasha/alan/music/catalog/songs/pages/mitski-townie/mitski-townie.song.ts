import type { Song } from "../../song.page-type.ts"

export const mitskiTownie = {
  id: "019f0e9c-7a4c-7e9f-b3af-53707fdb2b1b",
  pageTypeSlug: "song",
  slug: "mitski-townie",
  title: "Townie",
  artistSlug: "mitski",
  externalId: "0ae30448-ac59-4298-ad9f-b128c6ece265",
  externalLink: "https://musicbrainz.org/work/0ae30448-ac59-4298-ad9f-b128c6ece265",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
