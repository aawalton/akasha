import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHeartOfGold = {
  id: "01a0b72f-1ef6-7aba-92e6-5250f8552556",
  type: "page-type/song",
  slug: "james-taylor-heart-of-gold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "022a6d34-edcb-37bc-bd89-5d87f24e2b8a",
      externalLink: "https://musicbrainz.org/work/022a6d34-edcb-37bc-bd89-5d87f24e2b8a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Heart of Gold",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
} as const satisfies Song
