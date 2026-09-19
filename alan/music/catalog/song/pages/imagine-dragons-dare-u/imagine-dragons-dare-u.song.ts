import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsDareU = {
  id: "019ea499-0625-7bf9-8b29-c1fe6425b236",
  type: "page-type/song",
  slug: "imagine-dragons-dare-u",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "74bfdec9-f2fc-4afa-9327-a718b801f469",
      externalLink: "https://musicbrainz.org/work/74bfdec9-f2fc-4afa-9327-a718b801f469",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dare U",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
