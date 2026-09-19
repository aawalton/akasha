import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraHelvegen = {
  id: "019ea4a3-6386-7de1-89dd-67489891d536",
  type: "page-type/song",
  slug: "aurora-helvegen",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "13b0d677-6033-4608-bf23-a707ed514d6b",
      externalLink: "https://musicbrainz.org/work/13b0d677-6033-4608-bf23-a707ed514d6b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Helvegen",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
