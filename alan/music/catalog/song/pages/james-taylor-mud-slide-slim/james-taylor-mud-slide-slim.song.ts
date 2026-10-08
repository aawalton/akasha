import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMudSlideSlim = {
  id: "01a0b72f-3529-781f-aa5d-0be2b364407a",
  type: "page-type/song",
  slug: "james-taylor-mud-slide-slim",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "38730978-8361-430f-8bd0-5c83bf9d47a9",
      externalLink: "https://musicbrainz.org/work/38730978-8361-430f-8bd0-5c83bf9d47a9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mud Slide Slim",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T01:01:59.465Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
