import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsThunder = {
  id: "019ea49d-2eb5-7388-ab74-ad3d380fbca7",
  type: "page-type/song",
  slug: "imagine-dragons-thunder",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f0c6bc60-2838-4797-8700-9068a58bf02f",
      externalLink: "https://musicbrainz.org/work/f0c6bc60-2838-4797-8700-9068a58bf02f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Thunder",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:23:45.077Z",
  updatedAt: "2026-09-19T16:40:46.000Z",
} as const satisfies Song
