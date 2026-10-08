import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSolecasMiaVoj = {
  id: "01a0b72f-4cdb-7918-bfe8-cfc764f5e828",
  type: "page-type/song",
  slug: "james-taylor-solecas-mia-voj",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5aa06cd6-ef92-4d01-840a-b3f8c2f8fb0b",
      externalLink: "https://musicbrainz.org/work/5aa06cd6-ef92-4d01-840a-b3f8c2f8fb0b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Solecas mia voj'",
  artist: "artist/james-taylor",
  performed: false,
  written: "collab",
  createdAt: "2026-09-19T01:02:05.531Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
