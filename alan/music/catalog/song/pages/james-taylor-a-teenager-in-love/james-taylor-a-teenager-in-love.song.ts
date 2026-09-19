import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorATeenagerInLove = {
  id: "01a0b72f-2a53-7690-b5c7-ff24b36e0c0a",
  type: "page-type/song",
  slug: "james-taylor-a-teenager-in-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9ff3f54e-ea6c-3a57-a928-22f0b3087db7",
      externalLink: "https://musicbrainz.org/work/9ff3f54e-ea6c-3a57-a928-22f0b3087db7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Teenager in Love",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
} as const satisfies Song
