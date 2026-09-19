import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonLayAllYourLoveOnMe = {
  id: "01a0ba90-8c9d-7156-a38a-980ce0e9888b",
  type: "page-type/song",
  slug: "zara-larsson-lay-all-your-love-on-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fc4e60b9-3e7f-3ce4-8e39-08635f98d287",
      externalLink: "https://musicbrainz.org/work/fc4e60b9-3e7f-3ce4-8e39-08635f98d287",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lay All Your Love on Me",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
