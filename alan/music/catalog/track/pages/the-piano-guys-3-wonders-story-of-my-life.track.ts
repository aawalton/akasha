import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersStoryOfMyLife = {
  id: "01a0afa2-159b-7d42-9b46-bb5812517bd6",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-story-of-my-life",
  ownLength: 4.51355,
  ownProgress: 4.51355,
  partOfCollections: ["release/the-piano-guys-3-wonders", "release/the-piano-guys-serenity"],
  status: "completed",
  unit: "unit/minutes",
  title: "Story of My Life",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "storyofmylife|0jW6R8CVyVohuUJVcuweDI|270813",
  song: "song/the-piano-guys-story-of-my-life",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-wonders",
      discNumber: 1,
      position: 1,
      externalId: "71I9xjigtEcEYcbZgtvG1J",
      externalLink: "https://open.spotify.com/track/71I9xjigtEcEYcbZgtvG1J",
    },
    {
      release: "release/the-piano-guys-serenity",
      discNumber: 1,
      position: 11,
      externalId: "2pVaG6gN3n2g1PSaECpM9a",
      externalLink: "https://open.spotify.com/track/2pVaG6gN3n2g1PSaECpM9a",
    },
  ],
} as const satisfies Track
