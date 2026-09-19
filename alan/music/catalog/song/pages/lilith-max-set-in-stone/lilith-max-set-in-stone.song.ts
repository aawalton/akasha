import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxSetInStone = {
  id: "019ea4f6-4114-76d8-ae65-0575c25c9da4",
  type: "page-type/song",
  slug: "lilith-max-set-in-stone",
  title: "Set in Stone",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f3e3bfaa-8350-47af-8cb7-328e431346f3",
      externalLink: "https://musicbrainz.org/recording/f3e3bfaa-8350-47af-8cb7-328e431346f3",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
