import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsBlur = {
  id: "019ea498-5123-7844-889b-21df96984c5b",
  type: "page-type/song",
  slug: "imagine-dragons-blur",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "571559b1-70a8-4020-8646-08d6b2f533bc",
      externalLink: "https://musicbrainz.org/work/571559b1-70a8-4020-8646-08d6b2f533bc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Blur",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
