import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftKingOfMyHeart = {
  id: "019ea416-2a28-7165-99be-eeb6370d702f",
  type: "page-type/song",
  slug: "taylor-swift-king-of-my-heart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d3822229-b860-4827-84cb-e65482106b33",
      externalLink: "https://musicbrainz.org/work/d3822229-b860-4827-84cb-e65482106b33",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "King of My Heart",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
