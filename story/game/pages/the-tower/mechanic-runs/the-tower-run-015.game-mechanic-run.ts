import type { GameMechanicRun } from "akasha/story/game/mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun015 = {
  id: "01a0c958-d1db-7505-9b75-ddb504eed221",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-015",
  title: "FINESSE 13->14 (3 of 3 points spent; 0 unspent). Derived (engine): max Stamina 5…",
  game: "game/the-tower",
  turn: 14,
  mechanic: "game-mechanic/leveling",
  said: "FINESSE 13->14 (3 of 3 points spent; 0 unspent). Derived (engine): max Stamina 54->56 (+2), physAtk 35->36 (+1), physDef 10->10.5 (+0.5), Initiative 24->25 (+1). Current Stamina 54->56/56. Introspection (Sensitivity): feels FINESSE as sharpening/quickness in hands+feet, cleaner balance; learns FINESSE governs speed/precision (Stamina, strikes, footing, initiative). attrInfo['FINESSE'] revealed. Physical trio (VIT/MIGHT/FIN) now all raised +1. attrPoints 0 -> HUD points line hides. No roll. No foreshadowing.",
  follows: "0fbd8d24e280a9a131b5f1217abad5ff7932a6d997b7e18486c75af91ac1c03c",
  workings: "json",
} as const satisfies GameMechanicRun
