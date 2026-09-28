import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIii00012 = {
  id: "01a0ea69-e919-726b-ba74-0474b0f6ef61",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iii-00-012",
  ownLength: 195,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iii"],
  position: 12,
  prose: "txt",
  characters: ["character-player/otherwhere-iii-nala"],
  stepStatus: "step-status/recorders",
  action:
    "“I’m afraid not. Or at least, my ID is in the wallet my ex-boyfriend dumped somewhere with my phone. I never memorized it.” I look back up at the screen. “Um…I think I need to get to the Artonan Consulate in the morning. Is that far from here?”",
  beats: [
    'Nala says, "I\'m afraid not."',
    '"My ID\'s in the wallet my ex-boyfriend dumped somewhere, with my phone. I never memorized it."',
    "The clerk nods as if she hears that every week and taps her tablet: SELF-PAY.",
    "\"That's okay. Nobody gets turned away. I'll flag you for our social worker.\"",
    "Nala looks back up at the TV, then at the clerk.",
    '"Um... I think I need to get to the Artonan Consulate in the morning. Is that far from here?"',
    '"The Desk Demon place?" The clerk\'s brows go up a little. "It\'s downtown."',
    '"Straight south on the Red Line from Lawrence."',
    "She studies Nala a moment, a woman with no ID asking for the consulate, then lets it go.",
    '"Social worker comes on at eight. She\'ll come find you before you head anywhere, okay?"',
    "The clerk stands, tucks the tablet under her arm and walks back toward the desk.",
  ],
  lore: ["place/otherwhere-iii-uptown-memorial-er", "place/super-supportive-artonan-consulate-4"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics"],
  endsAt: "2037-01-31T07:09:00.000Z",
} as const satisfies StoryTurnPlayed
