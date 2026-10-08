import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonYouMakeMeFeelLikeANaturalWoman = {
  id: "019ea4b0-5b32-7d94-8717-1f492d2f408d",
  type: "page-type/song",
  slug: "kelly-clarkson-you-make-me-feel-like-a-natural-woman",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d2799d77-ee1f-3219-98ba-0a70bf10f35c",
      externalLink: "https://musicbrainz.org/work/d2799d77-ee1f-3219-98ba-0a70bf10f35c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "(You Make Me Feel Like) A Natural Woman",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:44:41.650Z",
  updatedAt: "2026-09-19T16:29:09.000Z",
} as const satisfies Song
