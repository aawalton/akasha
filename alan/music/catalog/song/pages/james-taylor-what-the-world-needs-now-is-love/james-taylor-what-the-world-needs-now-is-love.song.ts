import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWhatTheWorldNeedsNowIsLove = {
  id: "01a0b72f-4658-7845-a123-8549fab8775f",
  type: "page-type/song",
  slug: "james-taylor-what-the-world-needs-now-is-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0d3307b4-3150-3969-bb87-3fe68413229f",
      externalLink: "https://musicbrainz.org/work/0d3307b4-3150-3969-bb87-3fe68413229f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "What the World Needs Now Is Love",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
} as const satisfies Song
