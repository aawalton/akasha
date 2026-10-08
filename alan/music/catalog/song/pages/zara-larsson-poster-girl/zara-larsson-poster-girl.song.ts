import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonPosterGirl = {
  id: "019ea49e-c604-77ae-9c2a-be3be5d633bd",
  type: "page-type/song",
  slug: "zara-larsson-poster-girl",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2f6db0ab-03dc-49b8-b770-4dd8a31463fb",
      externalLink: "https://musicbrainz.org/work/2f6db0ab-03dc-49b8-b770-4dd8a31463fb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Poster Girl",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:25:29.348Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
