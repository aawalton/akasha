import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraALittlePlaceCalledTheMoon = {
  id: "019ea4a7-7b09-7821-b351-66539f4a423a",
  type: "page-type/song",
  slug: "aurora-a-little-place-called-the-moon",
  rank: "B",
  tags: ["autism"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ee2af34c-f001-41e6-88e3-7c8e1c250287",
      externalLink: "https://musicbrainz.org/work/ee2af34c-f001-41e6-88e3-7c8e1c250287",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Little Place Called the Moon",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "C",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
