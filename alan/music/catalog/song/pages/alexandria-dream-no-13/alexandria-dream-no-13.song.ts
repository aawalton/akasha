import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaDreamNo13 = {
  id: "01a0b726-8de5-73f5-9a97-dd8c1e54067a",
  type: "page-type/song",
  slug: "alexandria-dream-no-13",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bb09b2ed-0e8e-450c-9691-beb2284b5219",
      externalLink: "https://musicbrainz.org/recording/bb09b2ed-0e8e-450c-9691-beb2284b5219",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dream № 13",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
