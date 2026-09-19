import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaTheLightWinsTheNight = {
  id: "01a0b726-90b5-71fc-a5b8-5a8e292c156d",
  type: "page-type/song",
  slug: "alexandria-the-light-wins-the-night",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "edf069b6-f59f-4cd3-a698-2a02430ce101",
      externalLink: "https://musicbrainz.org/recording/edf069b6-f59f-4cd3-a698-2a02430ce101",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Light Wins the Night",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
