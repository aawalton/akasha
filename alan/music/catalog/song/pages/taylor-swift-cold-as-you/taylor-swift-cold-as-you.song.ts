import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftColdAsYou = {
  id: "019ea416-086a-77cd-a969-19fad2ae771b",
  type: "page-type/song",
  slug: "taylor-swift-cold-as-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4fa4e07c-89a3-49da-92de-a4a82fef5ad1",
      externalLink: "https://musicbrainz.org/work/4fa4e07c-89a3-49da-92de-a4a82fef5ad1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cold as You",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:07.914Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
