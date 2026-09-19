import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraLosingIce = {
  id: "019ea4a4-79d7-733b-8966-7a45ab199163",
  type: "page-type/song",
  slug: "aurora-losing-ice",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "46e6c53c-9ff5-461b-ac0b-b645a6cfe2f5",
      externalLink: "https://musicbrainz.org/work/46e6c53c-9ff5-461b-ac0b-b645a6cfe2f5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Losing Ice",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
