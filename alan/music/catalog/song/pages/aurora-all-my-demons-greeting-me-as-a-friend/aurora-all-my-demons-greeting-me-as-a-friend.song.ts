import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraAllMyDemonsGreetingMeAsAFriend = {
  id: "01a0b770-3331-71c7-b240-239f909eafee",
  type: "page-type/song",
  slug: "aurora-all-my-demons-greeting-me-as-a-friend",
  tags: ["autism"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "aa513b80-36e3-497d-a7d2-9386dbf82367",
      externalLink: "https://musicbrainz.org/work/aa513b80-36e3-497d-a7d2-9386dbf82367",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All My Demons Greeting Me as a Friend",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T02:12:58.801Z",
  updatedAt: "2026-09-22T13:09:58.000Z",
} as const satisfies Song
