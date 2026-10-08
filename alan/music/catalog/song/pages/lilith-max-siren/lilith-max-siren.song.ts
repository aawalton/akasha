import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxSiren = {
  id: "019ea4f6-4742-7814-934a-057ca73bd795",
  type: "page-type/song",
  slug: "lilith-max-siren",
  title: "Siren",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fc19063e-070a-4c36-83d8-a4c83e76e827",
      externalLink: "https://musicbrainz.org/recording/fc19063e-070a-4c36-83d8-a4c83e76e827",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  createdAt: "2026-06-08T02:01:04.066Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
