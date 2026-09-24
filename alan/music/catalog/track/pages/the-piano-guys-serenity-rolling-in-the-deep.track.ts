import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityRollingInTheDeep = {
  id: "01a0afa2-08d2-74c7-804d-335230ea8b6a",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-rolling-in-the-deep",
  ownLength: 3.8524333333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Rolling in the Deep",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "rollinginthedeep|0jW6R8CVyVohuUJVcuweDI|231146",
  song: "song/the-piano-guys-rolling-in-the-deep",
  carriedBy: [
    {
      release: "release/the-piano-guys-serenity",
      discNumber: 1,
      position: 5,
      externalId: "2glhwMIx8o8zeyIq7cveFl",
      externalLink: "https://open.spotify.com/track/2glhwMIx8o8zeyIq7cveFl",
    },
  ],
} as const satisfies Track
