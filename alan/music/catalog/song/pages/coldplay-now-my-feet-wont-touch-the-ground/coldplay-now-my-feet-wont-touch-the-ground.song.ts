import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayNowMyFeetWontTouchTheGround = {
  id: "01a0ba5d-50c2-7c57-bf9f-5814d72a318c",
  type: "page-type/song",
  slug: "coldplay-now-my-feet-wont-touch-the-ground",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "567e5c3f-e201-395a-a831-06df2e2672e3",
      externalLink: "https://musicbrainz.org/work/567e5c3f-e201-395a-a831-06df2e2672e3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Now My Feet Won’t Touch the Ground",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
