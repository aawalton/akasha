import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaDemonInLoveInstrumental = {
  id: "01a0b726-8dbf-7d32-9824-0e9f05a8eaad",
  type: "page-type/song",
  slug: "alexandria-demon-in-love-instrumental",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "81ee6816-ed5a-433b-8ba5-e4fda2ea2874",
      externalLink: "https://musicbrainz.org/recording/81ee6816-ed5a-433b-8ba5-e4fda2ea2874",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Demon in Love (instrumental)",
  artist: "artist/alexandria",
  songType: "derivative",
  performed: true,
} as const satisfies Song
