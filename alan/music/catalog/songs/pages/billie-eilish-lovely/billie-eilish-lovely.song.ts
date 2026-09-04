import type { Song } from "../../song.page-type.ts"

export const billieEilishLovely = {
  id: "019ea4aa-3bb4-7653-a11b-783c745aea85",
  pageTypeSlug: "song",
  slug: "billie-eilish-lovely",
  title: "Lovely",
  artistSlug: "billie-eilish",
  externalId: "80510c2c-a7a2-48f4-8f98-469f16161851",
  externalLink: "https://musicbrainz.org/work/80510c2c-a7a2-48f4-8f98-469f16161851",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
