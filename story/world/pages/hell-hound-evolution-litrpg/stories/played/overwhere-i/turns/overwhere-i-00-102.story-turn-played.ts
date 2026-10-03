import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00102 = {
  id: "01a0ff47-0ee9-7f6e-9407-aa126ec2b010",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-102",
  ownLength: 263,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 102,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala", "character-other/overwhere-i-ghost-eye"],
  stepStatus: "step-status/recorders",
  action:
    "“Two hour walk is all? The Wyrm sounds like a nice warm up, I’ll take that tomorrow. For today, I’m looking for a nice place to stay as well as somewhere to sell miscellaneous loot from my adventures. Oh! And someone who can turn Ghost-Eye here into a proper casting focus.” I pull out the drakewolf eye. “Recommendations?”",
  beats: [
    '"Two hour walk is all? The Wyrm sounds like a nice warm up. I\'ll take that tomorrow," Nala says.',
    'Grete takes the Wyrm slip off the counter, pins it to the board, and chalks "Nala Arthur" under it.',
    '"Stands till it dies. Pays on the head, or the fangs if the head\'s too big to haul."',
    '"For today, I need a nice place to stay, and somewhere to sell loot from my adventures," Nala says.',
    '"Oh! And someone who can turn Ghost-Eye here into a proper casting focus. Recommendations?"',
    "She pulls out the drakewolf eye and sets it on the counter.",
    'Grete knows it at once. "Drake-pearl. An alchemist pays about four gold for one of those."',
    '"Bell and Barrel by the square. Clean, a silver for bed and supper, and a bathhouse."',
    '"Blades and bows go to Wil Harrow, smith on Anvil Lane. He buys fair."',
    '"Pelts and monster parts: the guild counting-house pays least. Mother Sallow pays more."',
    '"She\'s an alchemist by the river stairs, buys parts for her draughts."',
    "\"For a focus, Ilse Varrow. Blue door on Glass Street. All of it's a quarter hour's walk from here.\"",
  ],
  issues: [
    '"where the Weir Wyrm slip is pinned" - Grete laid that slip flat on the counter last turn',
  ],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-wendlow-2",
    "place/overwhere-i-wendlow",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  endsAt: "2026-10-05T12:40:00.000Z",
} as const satisfies StoryTurnPlayed
