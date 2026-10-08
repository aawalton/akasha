import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeJustALittleBitOfYourHeart = {
  id: "019ea4e0-56aa-7619-9062-3b0860df4683",
  type: "page-type/song",
  slug: "ariana-grande-just-a-little-bit-of-your-heart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "070b8d7e-05bf-4663-89c2-51bd67f3ea35",
      externalLink: "https://musicbrainz.org/work/070b8d7e-05bf-4663-89c2-51bd67f3ea35",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Just a Little Bit of Your Heart",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:37:06.218Z",
  updatedAt: "2026-09-19T16:44:14.000Z",
} as const satisfies Song
