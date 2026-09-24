import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheHymnsCollection2DiscSetComeFollowMe = {
  id: "01a0b4c8-4db5-72ef-918a-83342999f5e9",
  type: "page-type/track",
  slug: "paul-cardall-the-hymns-collection-2-disc-set-come-follow-me",
  ownLength: 2.6675333333333335,
  ownProgress: 2.6675333333333335,
  partOfCollections: ["release/paul-cardall-the-hymns-collection-2-disc-set"],
  status: "completed",
  unit: "unit/minutes",
  title: "Come, Follow Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "comefollowme|7FQRbf8gbKw8KZQZAJWxH2|160052",
  song: "song/paul-cardall-come-follow-me",
  carriedBy: [
    {
      release: "release/paul-cardall-the-hymns-collection-2-disc-set",
      discNumber: 1,
      position: 9,
      externalId: "4mtd0os4gNHl80dea2VWFQ",
      externalLink: "https://open.spotify.com/track/4mtd0os4gNHl80dea2VWFQ",
    },
  ],
} as const satisfies Track
