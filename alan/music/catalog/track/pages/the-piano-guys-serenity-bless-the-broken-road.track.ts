import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityBlessTheBrokenRoad = {
  id: "01a0afa2-0916-7852-9ffc-71594503c404",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-bless-the-broken-road",
  ownLength: 3.924,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Bless the Broken Road",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }, { artistName: "Jon Schmidt" }],
  trackKey: "blessthebrokenroad|0jW6R8CVyVohuUJVcuweDI,2YQ4MY2VwOMv43C0GemUY5|235440",
  song: "song/the-piano-guys-bless-the-broken-road",
  carriedBy: [
    {
      release: "release/the-piano-guys-serenity",
      discNumber: 1,
      position: 7,
      externalId: "1Ihys8VEEtMJ5L12E82GHq",
      externalLink: "https://open.spotify.com/track/1Ihys8VEEtMJ5L12E82GHq",
    },
  ],
} as const satisfies Track
