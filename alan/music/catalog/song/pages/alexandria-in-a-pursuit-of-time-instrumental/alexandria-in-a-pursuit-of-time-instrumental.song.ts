import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaInAPursuitOfTimeInstrumental = {
  id: "01a0b726-8f0d-7087-a99d-3ef482c56bc6",
  type: "page-type/song",
  slug: "alexandria-in-a-pursuit-of-time-instrumental",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d409bcd3-e3aa-41bc-b9bf-d73fe9227586",
      externalLink: "https://musicbrainz.org/recording/d409bcd3-e3aa-41bc-b9bf-d73fe9227586",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In a Pursuit of Time (instrumental)",
  artist: "artist/alexandria",
  songType: "derivative",
  performed: true,
} as const satisfies Song
