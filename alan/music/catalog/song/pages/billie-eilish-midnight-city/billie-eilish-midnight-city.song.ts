import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishMidnightCity = {
  id: "019ea4aa-7281-7709-862e-577dfbb760fa",
  type: "page-type/song",
  slug: "billie-eilish-midnight-city",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8ad1f700-b48a-41fe-bda4-35a1e09d6ca3",
      externalLink: "https://musicbrainz.org/work/8ad1f700-b48a-41fe-bda4-35a1e09d6ca3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Midnight City",
  artist: "artist/billie-eilish",
  performed: true,
} as const satisfies Song
