import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheWaterIsWide = {
  id: "01a0b720-091c-7fe0-a5fe-0b6b076c5c0a",
  type: "page-type/song",
  slug: "celtic-woman-the-water-is-wide",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "24b18089-d220-4a8b-a98c-35129e592bde",
      externalLink: "https://musicbrainz.org/work/24b18089-d220-4a8b-a98c-35129e592bde",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Water Is Wide",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
