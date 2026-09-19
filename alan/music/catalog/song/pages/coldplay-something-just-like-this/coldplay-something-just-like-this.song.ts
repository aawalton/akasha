import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplaySomethingJustLikeThis = {
  id: "01a0ba60-f5d5-7a58-b602-6495cfb28ada",
  type: "page-type/song",
  slug: "coldplay-something-just-like-this",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9c54805f-5b61-4d91-b9f2-b437c96bf05e",
      externalLink: "https://musicbrainz.org/work/9c54805f-5b61-4d91-b9f2-b437c96bf05e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Something Just Like This",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
