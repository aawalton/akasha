import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysOverTheRainbowSimpleGifts = {
  id: "01a0b71e-9d1b-7ab3-a854-a4243b236e11",
  type: "page-type/song",
  slug: "the-piano-guys-over-the-rainbow-simple-gifts",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bb1f4365-0925-438a-8b44-8036a0265a96",
      externalLink: "https://musicbrainz.org/work/bb1f4365-0925-438a-8b44-8036a0265a96",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Over the Rainbow / Simple Gifts",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
