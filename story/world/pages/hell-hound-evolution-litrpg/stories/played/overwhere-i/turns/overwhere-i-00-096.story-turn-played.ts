import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00096 = {
  id: "01a0fef1-274c-7f0b-be5a-0655b5e5ea37",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-096",
  ownLength: 288,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 96,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala", "character-other/overwhere-i-harl-voss"],
  stepStatus: "step-status/reviewers",
  action: "“I’m a bounty hunter, here to turn in some bounties.”",
  beats: [
    '"I\'m a bounty hunter, here to turn in some bounties," Nala says, and pays her copper.',
    "The watchman's brows go up; he sends a boy running for the gate sergeant, Bram Coyle.",
    "Osric pays three copper for himself and the cart's wheels; Tobin pays his own, puffed up proud.",
    '"That crossbow goes in unstrung, mind," the watchman tells her, nodding at it.',
    "Sergeant Coyle comes stumping down from the gatehouse, a thickset man with a grey-shot beard.",
    '"Bounties, is it? Let\'s see." She opens the sack, and he peers in at the salt.',
    "He gives a low whistle at Voss's face. \"Harl Voss, by the Almighty. That's no small fish.\"",
    '"Antler Hall, up the high street on the left, sign of the stag\'s antlers. Ask for Grete Holm."',
  ],
  lore: ["lore/overwhere-i-nala", "lore/overwhere-i-nala-2", "place/overwhere-i-wendlow"],
  endsAt: "2026-10-05T11:45:00.000Z",
} as const satisfies StoryTurnPlayed
