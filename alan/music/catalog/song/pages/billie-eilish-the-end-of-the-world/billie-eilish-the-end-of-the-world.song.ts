import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishTheEndOfTheWorld = {
  id: "019ea4ab-2062-719a-a0dc-f7db0b5759a2",
  type: "page-type/song",
  slug: "billie-eilish-the-end-of-the-world",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ba0396cf-832d-4c15-a09b-3deb5f3557a8",
      externalLink: "https://musicbrainz.org/work/ba0396cf-832d-4c15-a09b-3deb5f3557a8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The End of the World",
  artist: "artist/billie-eilish",
  performed: true,
} as const satisfies Song
