import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSantaTellMeNaughtyVersion = {
  id: "01a0ba8d-9679-7150-9660-86227559d8c0",
  type: "page-type/song",
  slug: "ariana-grande-santa-tell-me-naughty-version",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d5969c4d-9aaf-48ce-b9c3-e37c4289b877",
      externalLink: "https://musicbrainz.org/work/d5969c4d-9aaf-48ce-b9c3-e37c4289b877",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Santa Tell Me (naughty version)",
  artist: "artist/ariana-grande",
  songType: "derivative",
  performed: true,
} as const satisfies Song
