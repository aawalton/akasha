import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const kellyClarksonGiveMeOneReason = {
  id: "019ea4ae-e5a4-703f-bbb2-3f9e23da15a9",
  type: "song",
  slug: "kelly-clarkson-give-me-one-reason",
  title: "Give Me One Reason",
  artist: "artist/kelly-clarkson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "74ade219-a091-4255-a11c-fc0a3c47fd8b",
      externalLink: "https://musicbrainz.org/work/74ade219-a091-4255-a11c-fc0a3c47fd8b",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
} as const satisfies Song
