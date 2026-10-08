import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterBecauseILikedABoy = {
  id: "01a0b723-cc38-7942-8ef0-d43a00fcef81",
  type: "page-type/song",
  slug: "sabrina-carpenter-because-i-liked-a-boy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b6496152-6510-4321-846f-8b80a9bf959a",
      externalLink: "https://musicbrainz.org/work/b6496152-6510-4321-846f-8b80a9bf959a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "because i liked a boy",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T00:49:31.704Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
