import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSheThinksIStillCare = {
  id: "01a0b72f-4ec8-715d-bc5d-932ad84cb81d",
  type: "page-type/song",
  slug: "james-taylor-she-thinks-i-still-care",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "827f9347-3dbd-33b9-8dfb-65fb35d89b18",
      externalLink: "https://musicbrainz.org/work/827f9347-3dbd-33b9-8dfb-65fb35d89b18",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "She Thinks I Still Care",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T01:02:06.024Z",
  updatedAt: "2026-09-19T16:23:44.000Z",
} as const satisfies Song
