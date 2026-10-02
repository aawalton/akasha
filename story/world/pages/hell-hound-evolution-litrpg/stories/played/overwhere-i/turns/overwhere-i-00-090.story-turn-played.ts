import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00090 = {
  id: "01a0fe8d-1485-7c6e-a76e-8bdad23356a7",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-090",
  ownLength: 154,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 90,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala", "character-other/overwhere-i-harl-voss"],
  stepStatus: "step-status/writer",
  action:
    "I apply the salve. “I forget how many, we can count ears and tags if you want. For Voss, I’ve got his head in his sack here.” I open the sack and pull it out so they can see. “Guess we have two bounties to turn in now.”",
  beats: [
    "Nala takes the pot and smears salve into her wounds: thigh, hip, shoulder, ribs and forearm.",
    "It stings, then the seeping stops; the pot is half gone by the time she is done.",
    '"I forget how many. We can count ears and tags if you want."',
    '"For Voss, I\'ve got his head in his sack here." She opens the sack and lifts it out by the hair.',
    'Tobin goes white and turns away, then turns back grinning. "Fenwatch will sing of this!"',
    '"Guess we have two bounties to turn in now," Nala says.',
    'Osric lets out a long whistle. "Thirty gold, that head, at the Board. Thirty!"',
    '"Mind, the Board pays only in Wendlow; that\'s two more days east by cart from here."',
    "He eyes the head. \"It'll turn before then. I've salt in the cart, four copper a sack, if you want.\"",
  ],
  issues: [
    '"bolt wounds at her shoulder, ribs and forearm" - drops her thigh bolt; half a pot dresses all',
  ],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-osric-fenn",
    "lore/overwhere-i-the-deserter-crew-2",
    "lore/overwhere-i-the-deserter-crew-2-2",
    "lore/overwhere-i-the-deserter-crew-2-2-2",
    "lore/overwhere-i-the-system-2",
    "lore/overwhere-i-tobin-ashdown",
    "place/overwhere-i-wendlow",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  endsAt: "2026-10-04T00:40:00.000Z",
} as const satisfies StoryTurnPlayed
