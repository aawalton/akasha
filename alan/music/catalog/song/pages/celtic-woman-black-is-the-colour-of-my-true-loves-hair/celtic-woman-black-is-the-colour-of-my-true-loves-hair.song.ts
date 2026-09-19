import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanBlackIsTheColourOfMyTrueLovesHair = {
  id: "01a0b720-0f77-7054-8507-91a0d8ba8d03",
  type: "page-type/song",
  slug: "celtic-woman-black-is-the-colour-of-my-true-loves-hair",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7fa9dab7-66b5-3fb4-9814-198233486508",
      externalLink: "https://musicbrainz.org/work/7fa9dab7-66b5-3fb4-9814-198233486508",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Black Is the Colour (of My True Love’s Hair)",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
} as const satisfies Song
