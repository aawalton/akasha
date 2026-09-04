import type { Song } from "../../song.page-type.ts"

export const billieEilishChihiro = {
  id: "019ea4a8-ef1e-7c9b-ae51-58a02451b9c2",
  pageTypeSlug: "song",
  slug: "billie-eilish-chihiro",
  title: "CHIHIRO",
  artistSlug: "billie-eilish",
  externalId: "37e62215-5eee-4fbd-996d-711be8517782",
  externalLink: "https://musicbrainz.org/work/37e62215-5eee-4fbd-996d-711be8517782",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
