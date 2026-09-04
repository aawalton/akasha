import type { Song } from "../../song.page-type.ts"

export const taylorSwiftMadWoman = {
  id: "019ea416-1f14-7a76-8617-99dab6a0b8ac",
  pageTypeSlug: "song",
  slug: "taylor-swift-mad-woman",
  title: "mad woman",
  artistSlug: "taylor-swift",
  externalId: "5b7221b2-303e-468d-a1f0-32fbb0b04bac",
  externalLink: "https://musicbrainz.org/work/5b7221b2-303e-468d-a1f0-32fbb0b04bac",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
