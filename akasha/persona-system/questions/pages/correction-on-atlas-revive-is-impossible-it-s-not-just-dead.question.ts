import type { Question } from "../question.page-type.ts"

export const correctionOnAtlasReviveIsImpossibleItSNotJustDead = {
  id: "019f9620-dc4a-7d33-a470-f9682cdd368d",
  pageTypeSlug: "question",
  slug: "correction-on-atlas-revive-is-impossible-it-s-not-just-dead",
  ask: "Correction on Atlas — revive is IMPOSSIBLE: it's not just dead, it's durably RETIRED (the terminal do-not-revive signal; someone deliberately shut the agent down). Its transcript shows a healthy, idle seat (no crash/misbehavior — it was even holding its own #15551 device-gate ping for 'after the 24th', i.e. now). Bringing it back means spawning a FRESH atlas agent (un-retiring it — recompiles persona identity + memory from its page, new session). I recommend that: it's healthy, you want it owning its app, and it has its own pending work resurfacing today. But since it was deliberately RETIRED for a reason I can't see, I'm confirming before I override that signal. Spawn a fresh Atlas?",
  askedBy: "olwen",
  askedIn: "019f9450-57a1-764b-9ea9-ede89f8c0ffd",
  status: "answered",
  offered: [
    "Spawn a fresh Atlas — bring it back (recommended)",
    "Leave retired — reassign atlas adoption to Astra",
    "Leave retired — Olwen drives the atlas adoption",
  ],
  answer: "Spawn a fresh Atlas — bring it back (recommended)",
  closedAt: "2026-07-24T21:57:27.480Z",
  context: "txt",
} as const satisfies Question
