import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraPinkMoon = {
  id: "019ea4a6-2185-75ce-914a-60fbefc1c935",
  type: "page-type/song",
  slug: "aurora-pink-moon",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "90a98928-f58a-3607-b534-ae5cb5e3e429",
      externalLink: "https://musicbrainz.org/work/90a98928-f58a-3607-b534-ae5cb5e3e429",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Pink Moon",
  artist: "artist/aurora",
  performed: true,
  createdAt: "2026-06-08T00:33:31.525Z",
  updatedAt: "2026-09-19T16:57:09.000Z",
} as const satisfies Song
