import type { Song } from "../../song.page-type.ts"

export const taylorSwiftColdAsYou = {
  id: "019ea416-086a-77cd-a969-19fad2ae771b",
  pageTypeSlug: "song",
  slug: "taylor-swift-cold-as-you",
  title: "Cold as You",
  artistSlug: "taylor-swift",
  externalId: "4fa4e07c-89a3-49da-92de-a4a82fef5ad1",
  externalLink: "https://musicbrainz.org/work/4fa4e07c-89a3-49da-92de-a4a82fef5ad1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
