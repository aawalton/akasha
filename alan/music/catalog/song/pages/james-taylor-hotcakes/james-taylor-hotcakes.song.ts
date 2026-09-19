import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHotcakes = {
  id: "01a0b72f-2f5f-74c1-b69c-0bdd61b33858",
  type: "page-type/song",
  slug: "james-taylor-hotcakes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d032d58e-e2ab-4fa8-99ac-6b617264eee7",
      externalLink: "https://musicbrainz.org/work/d032d58e-e2ab-4fa8-99ac-6b617264eee7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hotcakes",
  artist: "artist/james-taylor",
  performed: false,
  written: "solo",
} as const satisfies Song
