import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaTheGirlYouLostToCocaine = {
  id: "019ea4ca-e93d-7b7d-8409-946f31533b6f",
  type: "page-type/song",
  slug: "sia-the-girl-you-lost-to-cocaine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1a90bcfc-0513-4b2b-b6c3-979f2988bdf6",
      externalLink: "https://musicbrainz.org/work/1a90bcfc-0513-4b2b-b6c3-979f2988bdf6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Girl You Lost to Cocaine",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
