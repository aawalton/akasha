import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHereThereAndEverywhere = {
  id: "01a0b72f-2bdf-782a-bf55-89df50399b05",
  type: "page-type/song",
  slug: "james-taylor-here-there-and-everywhere",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "afcc33f4-7877-3096-a025-179a1c3adce8",
      externalLink: "https://musicbrainz.org/work/afcc33f4-7877-3096-a025-179a1c3adce8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Here, There and Everywhere",
  artist: "artist/james-taylor",
  performed: true,
  createdAt: "2026-09-19T01:01:57.087Z",
  updatedAt: "2026-09-19T16:23:44.000Z",
} as const satisfies Song
