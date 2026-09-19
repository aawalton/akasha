import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayLadderToTheSun = {
  id: "01a0ba60-faf6-732c-bbd6-819de5bd4ebc",
  type: "page-type/song",
  slug: "coldplay-ladder-to-the-sun",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d09a3c56-72d7-422a-b20d-6af34d3bfc6b",
      externalLink: "https://musicbrainz.org/work/d09a3c56-72d7-422a-b20d-6af34d3bfc6b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ladder to the Sun",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
} as const satisfies Song
