import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonBlueChristmas = {
  id: "019ea4ad-ccfc-75b3-b2be-62d43c4bd1c4",
  type: "page-type/song",
  slug: "kelly-clarkson-blue-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "414afdb5-bd79-3349-8a93-d940da14c36e",
      externalLink: "https://musicbrainz.org/work/414afdb5-bd79-3349-8a93-d940da14c36e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Blue Christmas",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
