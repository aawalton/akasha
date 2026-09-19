import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheMoonIsAHarshMistress = {
  id: "01a0b720-0a09-7300-a089-905a74ecd0f9",
  type: "page-type/song",
  slug: "celtic-woman-the-moon-is-a-harsh-mistress",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2dfebd49-5a80-3248-aba3-8c6d8adccede",
      externalLink: "https://musicbrainz.org/work/2dfebd49-5a80-3248-aba3-8c6d8adccede",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Moon Is a Harsh Mistress",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
} as const satisfies Song
