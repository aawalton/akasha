import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorVuurEnAs = {
  id: "01a0b72f-5904-7a5e-8b45-fe9708b33cd7",
  type: "page-type/song",
  slug: "james-taylor-vuur-en-as",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f48ba193-f5cc-43dc-95e1-6d19d04a2d6b",
      externalLink: "https://musicbrainz.org/work/f48ba193-f5cc-43dc-95e1-6d19d04a2d6b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Vuur en as",
  artist: "artist/james-taylor",
  performed: false,
  written: "solo",
} as const satisfies Song
