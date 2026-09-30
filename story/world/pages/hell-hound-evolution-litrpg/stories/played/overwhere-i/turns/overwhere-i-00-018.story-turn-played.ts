import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00018 = {
  id: "01a0f1d9-0f4b-7721-961b-34be94117c5c",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-018",
  ownLength: 172,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 18,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/reviewers",
  action:
    "After a good night sleep, I go looking for the bounty board to get the list of potential targets from the source.",
  beats: [
    "Nala sleeps in one of the Stag's small guest rooms, on a straw mattress under a wool blanket.",
    "She wakes rested at first light to hens, a cockerel, and smoke from the hall hearth.",
    "Downstairs Garrick sets out oat bread, a boiled egg and small ale; the village purse covers it.",
    "She asks where the bounty board is. Garrick laughs until his beard shakes.",
    "\"Board? That's in Wendlow, three days east. We've the reeve's slate. By the door, lady.\"",
    "Beside the Stag's door hangs a slate in a wooden frame, chalked in a careful hand.",
    "She reads it easily, though she has never seen these letters before in her life.",
    "REEDLURKERS robbing the eel traps at the fen edge: 3 silver a head.",
    "GRUBBOARS rooting the oat strips south of the palisade: 5 silver for the old boar.",
    "Below a scratched line, copied from Wendlow's Board:",
    "GHOST-EYE, Drakewolf, the Greyfen: 25 gold, head.",
    "HARL VOSS, deserter, Cutter's Quarry: 30 gold. His men: 2 gold each.",
  ],
  lore: [
    "lore/overwhere-i-agathe-morrow",
    "lore/overwhere-i-garrick-pell",
    "lore/overwhere-i-greyfen-beasts",
    "lore/overwhere-i-nala",
    "place/overwhere-i-fenwatch",
  ],
  reviewedBy: ["story-reviewer/style"],
  endsAt: "2026-09-30T07:00:00.000Z",
} as const satisfies StoryTurnPlayed
