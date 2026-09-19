import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorEnoughToBeOnYourWay = {
  id: "01a0b72f-2b9e-74ce-afbf-1fb4916bf849",
  type: "page-type/song",
  slug: "james-taylor-enough-to-be-on-your-way",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ae39883b-0075-494e-877f-1347129dd055",
      externalLink: "https://musicbrainz.org/work/ae39883b-0075-494e-877f-1347129dd055",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Enough to Be on Your Way",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
