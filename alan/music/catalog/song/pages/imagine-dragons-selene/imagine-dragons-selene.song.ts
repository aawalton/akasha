import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsSelene = {
  id: "019ea49b-743f-7962-aff0-75de5e7db7bc",
  type: "page-type/song",
  slug: "imagine-dragons-selene",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "15533370-5362-4e4e-a560-aaa423097a60",
      externalLink: "https://musicbrainz.org/work/15533370-5362-4e4e-a560-aaa423097a60",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Selene",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
