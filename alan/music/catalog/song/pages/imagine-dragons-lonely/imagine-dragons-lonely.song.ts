import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsLonely = {
  id: "019ea498-bc30-7b20-a54d-098b7ba8709c",
  type: "page-type/song",
  slug: "imagine-dragons-lonely",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6d07307c-9b08-4e67-a97c-01464a56ed75",
      externalLink: "https://musicbrainz.org/work/6d07307c-9b08-4e67-a97c-01464a56ed75",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lonely",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:18:53.616Z",
  updatedAt: "2026-09-19T16:40:46.000Z",
} as const satisfies Song
