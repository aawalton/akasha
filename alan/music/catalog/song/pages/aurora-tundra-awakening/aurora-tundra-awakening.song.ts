import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTundraAwakening = {
  id: "019ea4a7-1952-73f1-a9c1-02fdb2f9d611",
  type: "page-type/song",
  slug: "aurora-tundra-awakening",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cd5b0d6e-8a5e-4e32-afb8-79abb46c7fda",
      externalLink: "https://musicbrainz.org/work/cd5b0d6e-8a5e-4e32-afb8-79abb46c7fda",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tundra Awakening",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
