import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsTakeItEasy = {
  id: "019ea49c-b3d6-76a1-b3b8-fd17130880e8",
  type: "page-type/song",
  slug: "imagine-dragons-take-it-easy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c737a5c3-82bb-44a6-9c42-ca2eaa06de8d",
      externalLink: "https://musicbrainz.org/work/c737a5c3-82bb-44a6-9c42-ca2eaa06de8d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Take It Easy",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
