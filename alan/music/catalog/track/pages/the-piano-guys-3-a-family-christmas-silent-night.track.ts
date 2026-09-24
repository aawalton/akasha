import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AFamilyChristmasSilentNight = {
  id: "01a0afa2-187f-714d-ad34-dbff30a4a619",
  type: "page-type/track",
  slug: "the-piano-guys-3-a-family-christmas-silent-night",
  ownLength: 3.5021166666666668,
  ownProgress: 3.5021166666666668,
  partOfCollections: ["release/the-piano-guys-3-a-family-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Silent Night",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Franz Xaver Gruber" }, { artist: "artist/the-piano-guys" }],
  trackKey: "silentnight|0jW6R8CVyVohuUJVcuweDI,395Z91yDQ05pkMbRKik18y|210127",
  song: "song/celtic-woman-silent-night",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-a-family-christmas",
      discNumber: 1,
      position: 12,
      externalId: "48O4tCMl9OJqyLLhd7u7hF",
      externalLink: "https://open.spotify.com/track/48O4tCMl9OJqyLLhd7u7hF",
    },
  ],
} as const satisfies Track
