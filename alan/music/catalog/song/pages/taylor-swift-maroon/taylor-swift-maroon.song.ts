import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMaroon = {
  id: "019ea416-2125-7cb1-91d6-0174291052b2",
  type: "page-type/song",
  slug: "taylor-swift-maroon",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6eae06ce-2d2a-4ce6-ba19-2017637adf08",
      externalLink: "https://musicbrainz.org/work/6eae06ce-2d2a-4ce6-ba19-2017637adf08",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Maroon",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
