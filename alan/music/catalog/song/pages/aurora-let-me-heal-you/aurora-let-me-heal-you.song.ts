import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraLetMeHealYou = {
  id: "01a0ba99-6ef3-7025-89df-0842e9200743",
  type: "page-type/song",
  slug: "aurora-let-me-heal-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b297d897-d65d-4ffb-9119-330ecc591520",
      externalLink: "https://musicbrainz.org/work/b297d897-d65d-4ffb-9119-330ecc591520",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let Me Heal You",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
