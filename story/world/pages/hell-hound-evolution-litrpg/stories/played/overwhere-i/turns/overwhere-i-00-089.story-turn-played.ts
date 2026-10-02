import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00089 = {
  id: "01a0fe82-d4c8-70ba-9efa-bb6ce80d83a7",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-089",
  ownLength: 112,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 89,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/recorders",
  action: "“It’s me, Nala. I took care of Voss and his men, are you all all right?”",
  beats: [
    '"It\'s me, Nala. I took care of Voss and his men. Are you all all right?" she calls.',
    'Tobin lowers his bow with a shaky laugh. "Nala! We\'re whole, both of us. Not a scratch."',
    "Osric scrambles out from under the cart, bruised and stiff, and stares at her like at a ghost.",
    "Tobin spots the blood on her shoulder and ribs and digs out Hessa's pot of yarrow salve.",
    '"Hessa\'s salve; it slows bleeding," he says, holding it out to her.',
    'Then the words tumble out: "How many were there? Is it true? Is Voss really dead?"',
  ],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-osric-fenn",
    "lore/overwhere-i-tobin-ashdown",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  endsAt: "2026-10-04T00:30:00.000Z",
} as const satisfies StoryTurnPlayed
