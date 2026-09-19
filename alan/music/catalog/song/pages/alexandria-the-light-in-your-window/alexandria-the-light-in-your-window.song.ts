import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaTheLightInYourWindow = {
  id: "01a0b726-909a-78df-900a-bfc3e7231cee",
  type: "page-type/song",
  slug: "alexandria-the-light-in-your-window",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fa2b6a70-75eb-4dde-9fec-c5dc2ae27a5f",
      externalLink: "https://musicbrainz.org/recording/fa2b6a70-75eb-4dde-9fec-c5dc2ae27a5f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Light in Your Window",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
