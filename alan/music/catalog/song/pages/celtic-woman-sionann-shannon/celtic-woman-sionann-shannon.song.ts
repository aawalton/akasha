import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSionannShannon = {
  id: "01a0b720-0760-7195-a70d-b12ff701ed66",
  type: "page-type/song",
  slug: "celtic-woman-sionann-shannon",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0ae59c83-2c28-42be-abbc-d7c498519824",
      externalLink: "https://musicbrainz.org/work/0ae59c83-2c28-42be-abbc-d7c498519824",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sionann (Shannon)",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
