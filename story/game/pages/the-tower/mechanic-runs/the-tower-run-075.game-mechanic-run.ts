import type { GameMechanicRun } from "akasha/story/game/mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun075 = {
  id: "01a0c958-da08-7fb1-b823-ef985fb24ff8",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-075",
  title: "ALLOCATION ATTEMPT — INVALID TARGET, points HELD. The System has no 'Wisdom' axi…",
  game: "game/the-tower",
  turn: 70,
  mechanic: "game-mechanic/attribute-check",
  said: "ALLOCATION ATTEMPT — INVALID TARGET, points HELD. The System has no 'Wisdom' axis (his eight: MIGHT/FINESSE/VITALITY/INTELLECT/PERCEPTION/WILL/PRESENCE/LUCK). A permanent 3-point allocation is his deliberate call (never auto-spend; never assume intent) -> NOT committed to a guessed mapping. Surfaced the two facets of 'wisdom' matching his goal, by the sheet's own attrInfo: WILL ('resolve... guards the mind against influence' = BREAK an influence's hold, his stated aim) and INTELLECT ('reasoning and analysis' = SEE THROUGH the lie). 3 points UNSPENT pending his named axis. NO roll, NO cost. Scene UNCHANGED — still on the threshold, NOT stepped in; no assume of his choice; the illusion does not react. Ends on the menu. NO Tower reset.",
  follows: "590f68d272144477dff0a4a1cf8816abb45c7f93dca4d5046ba92222cd8a10c7",
  workings: "json",
} as const satisfies GameMechanicRun
