import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsRelease = {
  id: "019ea49d-0847-71ce-9da7-f3a3a8f98101",
  type: "page-type/song",
  slug: "imagine-dragons-release",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ed48dced-5167-49a4-a6e6-0c13045f4b97",
      externalLink: "https://musicbrainz.org/work/ed48dced-5167-49a4-a6e6-0c13045f4b97",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Release",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
