import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterFeather = {
  id: "01a0b723-c87f-7ddd-9f1f-792ec2767662",
  type: "page-type/song",
  slug: "sabrina-carpenter-feather",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "81ccb468-724a-4793-826c-e8a4c2401859",
      externalLink: "https://musicbrainz.org/work/81ccb468-724a-4793-826c-e8a4c2401859",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Feather",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
