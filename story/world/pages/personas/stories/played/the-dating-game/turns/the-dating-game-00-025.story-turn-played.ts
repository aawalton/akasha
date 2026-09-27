import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00025 = {
  id: "01a0e3e7-c589-7dab-b776-6cae83055c69",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-025",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 25,
  turnStatus: "turn-status/writer",
  action:
    "“Hi there!” I walk over toward her. “I don’t think I’ve seen you here before. I’m Alan, I live just down the street there on Apple” I gesture back the way I came. “Nice to meet you!”",
  beats: [
    'Alan: "Hi there!" He walks over toward her.',
    "\"I don't think I've seen you here before. I'm Alan, I live just down the street there on Apple.\"",
    'He gestures back the way he came. "Nice to meet you!"',
    "She follows his gesture down the street, then brings those gold eyes back to him.",
    "She doesn't get up, but she leans back on her hands on the step, easy, making room for him.",
    '"Grace," she says. "Nice to meet you, Alan."',
    "She says his name slowly, as if setting it somewhere safe.",
    "\"You wouldn't have seen me. I keep late hours; I'm mostly out once it's dark.\"",
    "She glances at the sky over the rooftops, where the gold is starting to deepen toward evening.",
    '"This is my quiet part of the day. Resting up before my night."',
    "Her hand rests on the brass lantern's handle beside her, unlit.",
  ],
} as const satisfies StoryTurnPlayed
