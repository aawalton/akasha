import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsTheyDonTKnowYouLikeIDo = {
  id: "019ea49d-1695-748f-ab24-900657710885",
  type: "page-type/song",
  slug: "imagine-dragons-they-don-t-know-you-like-i-do",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ee000445-70c0-40fb-9626-ad831a5fb6ea",
      externalLink: "https://musicbrainz.org/work/ee000445-70c0-40fb-9626-ad831a5fb6ea",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "They Don’t Know You Like I Do",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
