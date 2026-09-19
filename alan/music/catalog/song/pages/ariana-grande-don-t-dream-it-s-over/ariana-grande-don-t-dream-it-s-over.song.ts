import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeDonTDreamItSOver = {
  id: "019ea4e2-9dba-71db-a917-0f7b1503c9ce",
  type: "page-type/song",
  slug: "ariana-grande-don-t-dream-it-s-over",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "af5f9107-0141-3aae-b3df-b94aa14f02c8",
      externalLink: "https://musicbrainz.org/work/af5f9107-0141-3aae-b3df-b94aa14f02c8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t Dream It’s Over",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
