import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheHymnsCollection2DiscSetTheRelease = {
  id: "01a0b4c8-4d8e-798b-9c72-77d7b4acb5d1",
  type: "page-type/track",
  slug: "paul-cardall-the-hymns-collection-2-disc-set-the-release",
  ownLength: 3.4263833333333333,
  ownProgress: 3.4263833333333333,
  partOfCollections: ["release/paul-cardall-the-hymns-collection-2-disc-set"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Release",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "therelease|7FQRbf8gbKw8KZQZAJWxH2|205583",
  song: "song/paul-cardall-the-release",
  carriedBy: [
    {
      release: "release/paul-cardall-the-hymns-collection-2-disc-set",
      discNumber: 1,
      position: 8,
      externalId: "6NsEOZqSomT2wcJjoJfJ8V",
      externalLink: "https://open.spotify.com/track/6NsEOZqSomT2wcJjoJfJ8V",
    },
  ],
} as const satisfies Track
