import type { Song } from "../../song.page-type.ts"

export const taylorSwiftOurSong = {
  id: "019ea416-3522-7e4a-85a6-66e09cf03d4c",
  pageTypeSlug: "song",
  slug: "taylor-swift-our-song",
  title: "Our Song",
  artistSlug: "taylor-swift",
  externalId: "5caad38c-af56-4d4e-addb-9f5be2971093",
  externalLink: "https://musicbrainz.org/work/5caad38c-af56-4d4e-addb-9f5be2971093",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
