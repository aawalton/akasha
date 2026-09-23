import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyFortnightFeatPostMalone = {
  id: "01a0ce86-9a7b-7ffb-8a82-c430930924d9",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-fortnight-feat-post-malone",
  ownLength: 3.8160833333333333,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
    "release/taylor-swift-2-the-tortured-poets-department",
    "release/taylor-swift-2-fortnight-acoustic-version",
    "release/taylor-swift-2-fortnight-feat-post-malone-blond-ish-remix",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Fortnight (feat. Post Malone)",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "246dkjvS1zLTtiykXe5h60", artistName: "Post Malone" },
  ],
  trackKey: "fortnightfeatpostmalone|06HL4z0CvFAxyc27GXpf02,246dkjvS1zLTtiykXe5h60|228965",
  song: "song/taylor-swift-fortnight",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fortnight-acoustic-version",
      discNumber: 1,
      position: 3,
      externalId: "6GrvlxquXWumwyNeZb1oZz",
      externalLink: "https://open.spotify.com/track/6GrvlxquXWumwyNeZb1oZz",
    },
    {
      release: "release/taylor-swift-2-fortnight-feat-post-malone-blond-ish-remix",
      discNumber: 1,
      position: 2,
      externalId: "20nACtTlLpHqevuIVVD166",
      externalLink: "https://open.spotify.com/track/20nACtTlLpHqevuIVVD166",
    },
    {
      release: "release/taylor-swift-2-the-tortured-poets-department",
      discNumber: 1,
      position: 1,
      externalId: "2OzhQlSqBEmt7hmkYxfT6m",
      externalLink: "https://open.spotify.com/track/2OzhQlSqBEmt7hmkYxfT6m",
    },
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 1,
      externalId: "6dODwocEuGzHAavXqTbwHv",
      externalLink: "https://open.spotify.com/track/6dODwocEuGzHAavXqTbwHv",
    },
  ],
} as const satisfies Track
