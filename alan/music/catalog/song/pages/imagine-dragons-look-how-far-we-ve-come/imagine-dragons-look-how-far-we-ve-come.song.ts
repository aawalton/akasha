import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsLookHowFarWeVeCome = {
  id: "019ea498-fcbc-7fc1-a3e9-b4f62d58eda1",
  type: "page-type/song",
  slug: "imagine-dragons-look-how-far-we-ve-come",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "740f277b-c4ba-4191-a35f-35a54a7dcc1f",
      externalLink: "https://musicbrainz.org/work/740f277b-c4ba-4191-a35f-35a54a7dcc1f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Look How Far We’ve Come",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
