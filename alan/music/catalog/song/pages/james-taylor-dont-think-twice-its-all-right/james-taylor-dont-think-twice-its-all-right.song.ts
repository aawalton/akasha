import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorDontThinkTwiceItsAllRight = {
  id: "01a0b72f-1f62-778e-b49e-68eebead2aa5",
  type: "page-type/song",
  slug: "james-taylor-dont-think-twice-its-all-right",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "04920e7f-790a-302c-873c-1efc11d20b4d",
      externalLink: "https://musicbrainz.org/work/04920e7f-790a-302c-873c-1efc11d20b4d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t Think Twice, It’s All Right",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
