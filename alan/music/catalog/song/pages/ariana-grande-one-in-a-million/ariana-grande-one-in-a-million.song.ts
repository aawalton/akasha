import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeOneInAMillion = {
  id: "019ea4e5-9118-793e-aa73-2624a8cb709f",
  type: "page-type/song",
  slug: "ariana-grande-one-in-a-million",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "655e9216-c27a-4ab0-96e3-5a3aed94764e",
      externalLink: "https://musicbrainz.org/work/655e9216-c27a-4ab0-96e3-5a3aed94764e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "One in a Million",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
