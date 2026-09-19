import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSitDownYoureRockingTheBoat = {
  id: "01a0b72f-5536-74e9-825d-fdf3b30ae9f8",
  type: "page-type/song",
  slug: "james-taylor-sit-down-youre-rocking-the-boat",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c908130e-0816-3d73-a307-298801c3576a",
      externalLink: "https://musicbrainz.org/work/c908130e-0816-3d73-a307-298801c3576a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sit Down, You’re Rocking the Boat",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
