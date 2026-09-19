import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHereYouComeAgain = {
  id: "019ea416-18c1-78dc-9a1f-898beb11f437",
  type: "page-type/song",
  slug: "taylor-swift-here-you-come-again",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "077d295d-b664-4eda-8283-fbbfd24609a6",
      externalLink: "https://musicbrainz.org/work/077d295d-b664-4eda-8283-fbbfd24609a6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Here You Come Again",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
