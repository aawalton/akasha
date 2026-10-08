import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeOrdinaryThings = {
  id: "019ea4e5-149e-748e-86eb-696414f15f5b",
  type: "page-type/song",
  slug: "ariana-grande-ordinary-things",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4d916c35-06ef-437d-962b-12ca051bb9f8",
      externalLink: "https://musicbrainz.org/work/4d916c35-06ef-437d-962b-12ca051bb9f8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "ordinary things",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:42:16.990Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
