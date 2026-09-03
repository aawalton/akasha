import type { NamedEvent } from "../named-event.page-type.ts"

export const goblinLordFinalBattle = {
  id: "019f6865-78e1-7381-ba3e-cc661c4cd804",
  pageTypeSlug: "named-event",
  slug: "goblin-lord-final-battle",
  title: "Final battle against the Goblin Lord",
  aliases: ["goblin-lord-attack", "goblin-lord-siege", "goblin-lord-battle"],
  evidenceBeat: 136,
  evidenceChapter: "6.02",
  evidenceNote:
    "ruled from sweep evidence 'It had been six days since the attack of the Goblin Lord' — window excludes ch187 goblin-lord-battle ref (foreshadowing) (rhia-ruled 2026-07-15 drain-end batch)",
  firstChapter: 240,
  namedEventKind: "battle",
  lastChapter: 400,
  seq: 23,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
