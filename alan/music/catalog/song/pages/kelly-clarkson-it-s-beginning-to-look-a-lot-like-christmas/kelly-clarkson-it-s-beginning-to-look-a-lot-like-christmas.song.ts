import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonItSBeginningToLookALotLikeChristmas = {
  id: "019ea4b1-276c-7450-8576-e5fe72172ac6",
  type: "page-type/song",
  slug: "kelly-clarkson-it-s-beginning-to-look-a-lot-like-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ffb60de2-3c6c-4c1f-b883-491075db11e1",
      externalLink: "https://musicbrainz.org/work/ffb60de2-3c6c-4c1f-b883-491075db11e1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It’s Beginning to Look a Lot Like Christmas",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
