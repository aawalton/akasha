import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00046 = {
  id: "01a0e828-d5f3-740f-a947-4c0188cfcf9e",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-046",
  cover: "image/image-afedbf58a83c4c00",
  ownLength: 179,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 46,
  prose: "txt",
  characters: ["character-other/the-dating-game-aelwyn", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "\"Sounds great! I'm excited, I think you'll be really good for me. I hope I can be a good fit for you too.\"",
  beats: [
    "He says, \"Sounds great! I'm excited, I think you'll be really good for me.\"",
    '"I hope I can be a good fit for you too."',
    '"Oh, you will be. You asked. That\'s the hardest step, and you already took it."',
    "She shoulders her pack, and they start down together, out of the pines and between the walls.",
    "He minds his feet as she said, noticing each step on the loose rock.",
    "She doesn't coach on the way down; she points things out instead: a lizard on a warm stone.",
    "She says hello to every hiker coming up, and two of them know her from the channel.",
    "One asks for a selfie, and she gives it in a heartbeat, all poise, then trots back to his side.",
    "A little before noon they come out at the trailhead, the park's grass bowl bright below them.",
    'She walks backward a few steps, watching his stride. "Okay. I watched your feet too."',
    "\"You land on your heels like you're mad at the ground. That's gonna be our step two.\"",
  ],
  lore: ["lore/the-dating-game-aelwyn"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-27T11:50:00.000Z",
} as const satisfies StoryTurnPlayed
