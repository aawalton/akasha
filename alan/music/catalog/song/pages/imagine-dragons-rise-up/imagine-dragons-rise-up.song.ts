import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsRiseUp = {
  id: "019ea49c-eb27-76a5-9fb2-91ce2996f5b7",
  type: "page-type/song",
  slug: "imagine-dragons-rise-up",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "da34ba0b-391d-4503-9458-03f3a3ecc47c",
      externalLink: "https://musicbrainz.org/work/da34ba0b-391d-4503-9458-03f3a3ecc47c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rise Up",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
