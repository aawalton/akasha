import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanDulaman = {
  id: "01a0b720-0c1a-7788-8438-3ff52343a671",
  type: "page-type/song",
  slug: "celtic-woman-dulaman",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "551999dc-5f31-427b-94ef-739f2ce82c5c",
      externalLink: "https://musicbrainz.org/work/551999dc-5f31-427b-94ef-739f2ce82c5c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dúlamán",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
} as const satisfies Song
