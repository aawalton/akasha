import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBejeweled = {
  id: "019ea416-0307-7a2e-952c-77f20481a012",
  type: "page-type/song",
  slug: "taylor-swift-bejeweled",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0a271627-b8c6-4b16-9e65-5b4b19449268",
      externalLink: "https://musicbrainz.org/work/0a271627-b8c6-4b16-9e65-5b4b19449268",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bejeweled",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:06.535Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
