import type { GameMechanicRun } from "akasha/story/game/game-mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun071 = {
  id: "01a0c958-d978-773a-bf44-9716d2eb67af",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-071",
  title: "GEAR + NAME (deterministic). Stalker hide WORN as a makeshift cloak -> +1 armor…",
  game: "story-game/the-tower",
  turn: 66,
  mechanic: "game-mechanic/attribute-check",
  said: "GEAR + NAME (deterministic). Stalker hide WORN as a makeshift cloak -> +1 armor (equipment.armor.def=1; physDef 13->14). Eye-lens + river-stone pocketed (kept). The new maul NAMED 'Burning Anger' (player keeps the legacy name through every transformation; the old steel head is folded into it — continuity is literal). No pool/skill/affinity/XP change. STOP geared + ready at the lip of the shaft — NOT yet climbing. NO assumed climb. NO Tower reset.",
  follows: "612b6fe15cafbe254550db166248b498656907626e3e8dd7a894c1b3003a4aca",
  workings: "json",
} as const satisfies GameMechanicRun
