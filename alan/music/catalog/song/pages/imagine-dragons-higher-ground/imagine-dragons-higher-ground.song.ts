import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsHigherGround = {
  id: "019ea497-fc6e-746b-949b-5c1c8b892768",
  type: "page-type/song",
  slug: "imagine-dragons-higher-ground",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4b409796-03ee-4aff-b3af-7075458ec997",
      externalLink: "https://musicbrainz.org/work/4b409796-03ee-4aff-b3af-7075458ec997",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Higher Ground",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
