import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonDoesHeLoveYou = {
  id: "019ea4ae-bb81-7ef6-ac95-320fbb0ee6cd",
  type: "page-type/song",
  slug: "kelly-clarkson-does-he-love-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "63379111-830b-4a4d-a59d-9499c65c0eff",
      externalLink: "https://musicbrainz.org/work/63379111-830b-4a4d-a59d-9499c65c0eff",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Does He Love You",
  artist: "artist/kelly-clarkson",
  performed: true,
} as const satisfies Song
