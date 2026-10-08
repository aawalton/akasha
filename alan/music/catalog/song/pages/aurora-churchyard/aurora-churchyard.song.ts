import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraChurchyard = {
  id: "019ea4a6-fd83-761e-b4fd-3ccc20a7ceb0",
  type: "page-type/song",
  slug: "aurora-churchyard",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c6758a17-228b-4cdf-bab4-958abf674be3",
      externalLink: "https://musicbrainz.org/work/c6758a17-228b-4cdf-bab4-958abf674be3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Churchyard",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:34:27.843Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
