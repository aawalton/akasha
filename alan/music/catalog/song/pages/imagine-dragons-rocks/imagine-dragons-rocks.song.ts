import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsRocks = {
  id: "019ea49b-cfa8-700f-b3dc-711525726b04",
  type: "page-type/song",
  slug: "imagine-dragons-rocks",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3678d723-e369-4812-a8e7-57e887da89c1",
      externalLink: "https://musicbrainz.org/work/3678d723-e369-4812-a8e7-57e887da89c1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rocks",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
