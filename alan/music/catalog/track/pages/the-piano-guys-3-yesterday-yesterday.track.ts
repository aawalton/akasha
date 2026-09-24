import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3YesterdayYesterday = {
  id: "01a0afa2-1d95-7580-a8c3-072f55cd4c43",
  type: "page-type/track",
  slug: "the-piano-guys-3-yesterday-yesterday",
  ownLength: 3.4718666666666667,
  ownProgress: 3.4718666666666667,
  partOfCollections: ["release/the-piano-guys-3-yesterday"],
  status: "completed",
  unit: "unit/minutes",
  title: "Yesterday",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "yesterday|0jW6R8CVyVohuUJVcuweDI|208312",
  song: "song/the-piano-guys-yesterday",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-yesterday",
      discNumber: 1,
      position: 1,
      externalId: "4JLEnOgHaQD2yXkoI6iu65",
      externalLink: "https://open.spotify.com/track/4JLEnOgHaQD2yXkoI6iu65",
    },
  ],
} as const satisfies Track
