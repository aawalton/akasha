import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const taylorSwiftBejeweled = {
  id: "019ea416-0307-7a2e-952c-77f20481a012",
  type: "song",
  slug: "taylor-swift-bejeweled",
  title: "Bejeweled",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0a271627-b8c6-4b16-9e65-5b4b19449268",
      externalLink: "https://musicbrainz.org/work/0a271627-b8c6-4b16-9e65-5b4b19449268",
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
