import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHopelesslyDevotedToYou = {
  id: "019ea416-19ad-7676-b607-90bec4e89aa4",
  type: "page-type/song",
  slug: "taylor-swift-hopelessly-devoted-to-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "10197ccb-743a-4140-b322-c685500aedbf",
      externalLink: "https://musicbrainz.org/work/10197ccb-743a-4140-b322-c685500aedbf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hopelessly Devoted to You",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
