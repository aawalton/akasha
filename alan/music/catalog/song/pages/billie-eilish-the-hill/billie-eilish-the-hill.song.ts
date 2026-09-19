import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishTheHill = {
  id: "019ea4a9-f166-7b84-9c15-63a171aec401",
  type: "page-type/song",
  slug: "billie-eilish-the-hill",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6ce0d3b1-5008-4c6b-8ccc-16a581ff48c0",
      externalLink: "https://musicbrainz.org/work/6ce0d3b1-5008-4c6b-8ccc-16a581ff48c0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Hill",
  artist: "artist/billie-eilish",
  performed: true,
} as const satisfies Song
