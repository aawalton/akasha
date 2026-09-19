import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftCarolina = {
  id: "019ea416-0c7f-7ef8-a5d2-1bc527aa7081",
  type: "page-type/song",
  slug: "taylor-swift-carolina",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7b854adc-cb55-487a-b3ea-da2125d06d09",
      externalLink: "https://musicbrainz.org/work/7b854adc-cb55-487a-b3ea-da2125d06d09",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Carolina",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
