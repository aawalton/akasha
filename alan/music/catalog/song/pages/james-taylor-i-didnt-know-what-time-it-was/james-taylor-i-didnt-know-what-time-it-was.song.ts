import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorIDidntKnowWhatTimeItWas = {
  id: "01a0b72f-20c3-7b91-af48-c293905ee73c",
  type: "page-type/song",
  slug: "james-taylor-i-didnt-know-what-time-it-was",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "17ffdc13-e578-38d6-8cc7-0b9056143743",
      externalLink: "https://musicbrainz.org/work/17ffdc13-e578-38d6-8cc7-0b9056143743",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Didn’t Know What Time It Was",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
} as const satisfies Song
