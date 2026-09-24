import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityAThousandYears = {
  id: "01a0afa2-09c3-7161-91ac-88a65a25d83f",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-a-thousand-years",
  ownLength: 4.59955,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  status: "not-started",
  unit: "unit/minutes",
  title: "A Thousand Years",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "athousandyears|0jW6R8CVyVohuUJVcuweDI|275973",
  song: "song/evynne-hollens-a-thousand-years",
  carriedBy: [
    {
      release: "release/the-piano-guys-serenity",
      discNumber: 1,
      position: 12,
      externalId: "4LqIdsI9UU5YJOJQCAqztR",
      externalLink: "https://open.spotify.com/track/4LqIdsI9UU5YJOJQCAqztR",
    },
  ],
} as const satisfies Track
