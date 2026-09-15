import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraPinkMoon = {
  id: "019ea4a6-2185-75ce-914a-60fbefc1c935",
  type: "page-type/song",
  slug: "aurora-pink-moon",
  title: "Pink Moon",
  artist: "artist/aurora",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "90a98928-f58a-3607-b534-ae5cb5e3e429",
      externalLink: "https://musicbrainz.org/work/90a98928-f58a-3607-b534-ae5cb5e3e429",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
} as const satisfies Song
