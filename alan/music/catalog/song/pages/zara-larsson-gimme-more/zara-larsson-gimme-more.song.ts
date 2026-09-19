import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonGimmeMore = {
  id: "019ea4a0-ca12-71ec-a7a0-d3fbdc7eda6b",
  type: "page-type/song",
  slug: "zara-larsson-gimme-more",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a7576a67-ecae-3a32-89cb-ff183c927653",
      externalLink: "https://musicbrainz.org/work/a7576a67-ecae-3a32-89cb-ff183c927653",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Gimme More",
  artist: "artist/zara-larsson",
  performed: true,
} as const satisfies Song
