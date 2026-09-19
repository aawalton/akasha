import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHoneyDontLeaveLA = {
  id: "01a0b72f-231f-74c5-86f4-1688ca9b2191",
  type: "page-type/song",
  slug: "james-taylor-honey-dont-leave-l-a",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "33622c96-d754-3615-8326-2cefdc4a63e2",
      externalLink: "https://musicbrainz.org/work/33622c96-d754-3615-8326-2cefdc4a63e2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Honey Don’t Leave L.A.",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
