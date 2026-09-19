import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraAnimal = {
  id: "019ea4a6-e4da-77eb-9170-48a094c1e900",
  type: "page-type/song",
  slug: "aurora-animal",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c0125a33-540a-44f3-bb22-6ff19fc8f728",
      externalLink: "https://musicbrainz.org/work/c0125a33-540a-44f3-bb22-6ff19fc8f728",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Animal",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
