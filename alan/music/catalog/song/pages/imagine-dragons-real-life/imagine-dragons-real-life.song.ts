import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsRealLife = {
  id: "019ea49c-60cd-7f16-a293-52ce77733882",
  type: "page-type/song",
  slug: "imagine-dragons-real-life",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8123601d-0df3-437e-964d-1c31d7421318",
      externalLink: "https://musicbrainz.org/work/8123601d-0df3-437e-964d-1c31d7421318",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Real Life",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
