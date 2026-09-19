import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaHelpMe = {
  id: "01a0b726-8e93-7158-8921-a45f343af7de",
  type: "page-type/song",
  slug: "alexandria-help-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3a2478d9-850e-46cb-a0d9-3b1a7295c003",
      externalLink: "https://musicbrainz.org/recording/3a2478d9-850e-46cb-a0d9-3b1a7295c003",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Help Me",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
