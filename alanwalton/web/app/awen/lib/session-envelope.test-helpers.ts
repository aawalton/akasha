import { type GameDisplayModules } from "@alanwalton/awen-core/game-schema"
import { GameStateSchema } from "@alanwalton/awen-core/state-schema"
import type { StoryLedger } from "./session-envelope"

export const STORY_MODULES: GameDisplayModules = {
  chapterProse: {},
  storySoFar: { source: "turns" },
  actionBox: {},
}

export const CRUNCHY_MODULES: GameDisplayModules = {
  beatLog: { systemWindows: true },
  hud: {},
  sheet: {},
  storySoFar: { source: "stateLedger" },
  actionBox: {},
}

export const STORY: StoryLedger = {
  chapters: [{ id: "c1", title: "The Salt Road", href: "/story-chapter/x", chapterNumber: 1 }],
  current: [{ id: "t9", title: "The Salt Road", text: "White grit." }],
}

export const STATE = GameStateSchema.parse({
  turn: 4,
  hud: { level: 3, pools: { vitae: 40 } },
  revealed: { name: "Aldric" },
  log: [
    { type: "narrative", text: "The door opens.", turn: 4 },
    { type: "system", title: "Threshold", lines: ["Floor 4."], turn: 4 },
  ],
  chapters: [
    {
      number: 1,
      title: "The Threshold",
      status: "archived",
      chapterId: "019efbd1-0000-7000-8000-000000000001",
    },
  ],
})
