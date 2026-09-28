import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00043 = {
  id: "01a0e579-12b8-79f6-80cc-dc54ee5667f4",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-043",
  ownLength: 197,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 43,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/recorders",
  action:
    "I circle around it and then tackle it, pressing myself to its skin and hold on as tight as I can.",
  beats: [
    "Nala sidesteps the heaving mouth and circles wide toward its flank.",
    "The blind head swings round with her, tracking her step for step.",
    "She lunges for a grip, but it twists its bulk away and she sprawls short.",
    "The mouth snaps at her and closes on air; she scrambles clear by inches.",
    "She throws herself at it again and lands mid-body, well back from the head, arms locked round.",
    "Her salt crust grinds into the cracked hide; the worm shrieks and bucks as it burns.",
    "It rolls to scrape her off, and its whole bloated bulk comes down on top of her.",
    "The breath is crushed out of her, and the hall goes dark.",
    "Through the dark, a lynx's jaws close gently on her arm: Links, dragging her across the floor.",
    "She comes round at the edge of the gloom beside the honey jar, unable to stand.",
    "Far back, the worm rolls and scrapes along the floor, grinding the salt off its hide.",
    'Links, above her, fur bristling: "That cost me power I can\'t spare twice."',
  ],
  issues: [
    '"her salted hands skid off the cracked hide" - salted bookworm skin is dry, rough, easy to grip',
  ],
  lore: ["place/otherwhere-hall-back"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics"],
} as const satisfies StoryTurnPlayed
