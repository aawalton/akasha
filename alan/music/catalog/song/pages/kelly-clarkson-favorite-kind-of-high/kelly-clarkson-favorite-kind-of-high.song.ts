import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonFavoriteKindOfHigh = {
  id: "019ea4ae-0f3d-74c3-84ca-f230dba12643",
  type: "page-type/song",
  slug: "kelly-clarkson-favorite-kind-of-high",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4c687b9e-57ef-47ac-b234-d65955ce919c",
      externalLink: "https://musicbrainz.org/work/4c687b9e-57ef-47ac-b234-d65955ce919c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "favorite kind of high",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
