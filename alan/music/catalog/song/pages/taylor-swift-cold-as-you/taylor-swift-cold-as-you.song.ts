import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftColdAsYou = {
  id: "019ea416-086a-77cd-a969-19fad2ae771b",
  type: "song",
  slug: "taylor-swift-cold-as-you",
  title: "Cold as You",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4fa4e07c-89a3-49da-92de-a4a82fef5ad1",
      externalLink: "https://musicbrainz.org/work/4fa4e07c-89a3-49da-92de-a4a82fef5ad1",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
