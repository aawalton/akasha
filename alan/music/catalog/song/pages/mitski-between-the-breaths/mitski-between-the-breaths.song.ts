import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiBetweenTheBreaths = {
  id: "019f0e9e-43c4-77d9-85ca-4b4968505bcc",
  type: "page-type/song",
  slug: "mitski-between-the-breaths",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "318e44e6-3f6c-4e58-a674-ebedc3edd831",
      externalLink: "https://musicbrainz.org/work/318e44e6-3f6c-4e58-a674-ebedc3edd831",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Between the Breaths",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-28T14:24:40.900Z",
  updatedAt: "2026-09-19T17:05:22.000Z",
} as const satisfies Song
