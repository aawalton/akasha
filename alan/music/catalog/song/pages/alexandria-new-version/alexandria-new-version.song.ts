import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaNewVersion = {
  id: "01a0b726-8f70-7588-95f7-89bdcdce53ba",
  type: "page-type/song",
  slug: "alexandria-new-version",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "12365264-dc1b-424f-b0ac-dab7741051e9",
      externalLink: "https://musicbrainz.org/recording/12365264-dc1b-424f-b0ac-dab7741051e9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Блюз Бой (new version)",
  artist: "artist/alexandria",
  songType: "derivative",
  performed: true,
} as const satisfies Song
