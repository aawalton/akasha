import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraNodKrai = {
  id: "019ea4a7-e0a2-7cbe-bba6-b3725475d5b3",
  type: "song",
  slug: "aurora-nod-krai",
  title: "挪德卡莱 Nod‐Krai",
  artist: "artist/aurora",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3e0da3d6-d151-4f63-806f-efca05a3648f",
      externalLink: "https://musicbrainz.org/work/3e0da3d6-d151-4f63-806f-efca05a3648f",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
} as const satisfies Song
