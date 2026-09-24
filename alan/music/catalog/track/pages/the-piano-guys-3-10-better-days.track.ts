import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310BetterDays = {
  id: "01a0afa2-0bbe-79f7-a9fc-386ba69e5bee",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-better-days",
  ownLength: 3.1733333333333333,
  ownProgress: 3.1733333333333333,
  partOfCollections: ["release/the-piano-guys-3-10"],
  status: "completed",
  unit: "unit/minutes",
  title: "Better Days",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "betterdays|0jW6R8CVyVohuUJVcuweDI|190400",
  song: "song/the-piano-guys-better-days",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 1,
      position: 12,
      externalId: "4DfvhohdE4RnYHYkhy8mUU",
      externalLink: "https://open.spotify.com/track/4DfvhohdE4RnYHYkhy8mUU",
    },
  ],
} as const satisfies Track
