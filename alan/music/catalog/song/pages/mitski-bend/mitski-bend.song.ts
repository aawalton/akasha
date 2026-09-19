import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiBend = {
  id: "019f0ea5-05e3-7bd6-9711-e093e8e87460",
  type: "page-type/song",
  slug: "mitski-bend",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b1cc5a54-f449-419b-8bb9-6097b3f7a777",
      externalLink: "https://musicbrainz.org/work/b1cc5a54-f449-419b-8bb9-6097b3f7a777",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bend",
  artist: "artist/mitski",
  performed: false,
  written: "collab",
} as const satisfies Song
