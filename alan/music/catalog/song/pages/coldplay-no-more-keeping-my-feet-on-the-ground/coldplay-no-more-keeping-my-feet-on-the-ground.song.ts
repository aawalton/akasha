import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayNoMoreKeepingMyFeetOnTheGround = {
  id: "01a0ba5d-5423-7d57-bd83-20b49f47cddf",
  type: "page-type/song",
  slug: "coldplay-no-more-keeping-my-feet-on-the-ground",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8a21645d-48cf-407b-9360-517671342370",
      externalLink: "https://musicbrainz.org/work/8a21645d-48cf-407b-9360-517671342370",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "No More Keeping My Feet on the Ground",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
