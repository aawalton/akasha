import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonSoftlyAndTenderly = {
  id: "019ea4b2-bcfc-73f7-bc12-ae88ab6e7140",
  type: "page-type/song",
  slug: "kelly-clarkson-softly-and-tenderly",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7975de9f-455b-4727-8f93-2f35230ed56a",
      externalLink: "https://musicbrainz.org/work/7975de9f-455b-4727-8f93-2f35230ed56a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Softly and Tenderly",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
