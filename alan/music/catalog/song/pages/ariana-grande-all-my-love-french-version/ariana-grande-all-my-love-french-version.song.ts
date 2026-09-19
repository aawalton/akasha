import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeAllMyLoveFrenchVersion = {
  id: "01a0ba8d-75be-7ba9-bfb4-43933dc0e595",
  type: "page-type/song",
  slug: "ariana-grande-all-my-love-french-version",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "af9f60da-0d76-47ee-bc83-bcaaa3b05ce0",
      externalLink: "https://musicbrainz.org/work/af9f60da-0d76-47ee-bc83-bcaaa3b05ce0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All My Love (French version)",
  artist: "artist/ariana-grande",
  songType: "derivative",
  performed: true,
} as const satisfies Song
