import type { StoryDecision } from "../../story-decision.page-type.ts"

export const towerOfNimueDecision1 = {
  id: "01a0657d-bb97-75c4-b3f7-848f7b2d62fb",
  pageTypeSlug: "story-decision",
  slug: "tower-of-nimue-decision-1",
  title: "Decision #1 — The Anchor (Ch.1): The Seer",
  worldSlug: "tower-of-nimue",
  chapterNumber: 1,
  decisionType: "other",
  options:
    "**A — THE PROTECTOR** (threw her body across a pinned child): Essence 'Last Stand' — PASSIVE +10% damage reduction; ACTIVE 'Bulwark' halve the next hit (2-action CD). Lean +3 VIT -> HP 130. Tanky/long-game.\n\n**B — THE HUNTER** (tore the IV pole free and drove it home): Essence 'Killing Edge' — PASSIVE +15% strike damage; ACTIVE 'Lunge' gap-close strike at PWR x3 (3-action CD). Lean +2 PWR / +1 SPD -> strike 24 (~27.6 w/ passive). Aggressive/glass.\n\n**C — THE SEER** (reached for the interface itself, tried to read the System): Essence 'Open Eye' — PASSIVE reveal weak points (crit 18%, +50% crit dmg) and +1 essence option on every Harvest; ACTIVE 'Read' expose resistances, +20% dmg for 2 actions (2-action CD). Lean +2 ATT / +1 INS -> Focus 60. Long-game/flexible, compounds across the climb.",
  chosen: "C — The Seer",
  effect:
    "Slot 1 filled with baseline essence 'Open Eye' (passive weak-point reveal: crit 18% / +50% crit dmg, +1 essence option on every future Harvest; active 'Read': expose resistances +20% dmg for 2 actions, 2-action CD). Stat lean +2 ATT / +1 INS applied -> VIT 10 / PWR 10 / SPD 10 / ATT 12 / INS 11; derived HP 100 / Focus 60 / strike 20. Level 1, 0 banked points, slots 2-3 open. Build now current as of Chapter 1.",
  prose: "txt",
} as const satisfies StoryDecision
