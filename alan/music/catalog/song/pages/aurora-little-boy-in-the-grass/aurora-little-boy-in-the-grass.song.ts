import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraLittleBoyInTheGrass = {
  id: "019ea4a3-faa6-76c9-bbd3-dbeede219a50",
  type: "page-type/song",
  slug: "aurora-little-boy-in-the-grass",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2f368c2f-7bb1-4cea-89ab-d65c5e654bf8",
      externalLink: "https://musicbrainz.org/work/2f368c2f-7bb1-4cea-89ab-d65c5e654bf8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Little Boy in the Grass",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
