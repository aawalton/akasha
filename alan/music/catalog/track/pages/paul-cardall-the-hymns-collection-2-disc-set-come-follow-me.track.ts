import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheHymnsCollection2DiscSetComeFollowMe = {
  id: "01a0b4c8-4db5-72ef-918a-83342999f5e9",
  type: "page-type/track",
  slug: "paul-cardall-the-hymns-collection-2-disc-set-come-follow-me",
  ownLength: 2.6675333333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-hymns-collection-2-disc-set"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4mtd0os4gNHl80dea2VWFQ",
      externalLink: "https://open.spotify.com/track/4mtd0os4gNHl80dea2VWFQ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Come, Follow Me",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "comefollowme|7FQRbf8gbKw8KZQZAJWxH2|160052",
  song: "song/paul-cardall-come-follow-me",
} as const satisfies Track
