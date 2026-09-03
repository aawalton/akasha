import type { Question } from "../question.page-type.ts"

export const doesTheFleetWorkHaltBindThisSeatSSubagentFanOut = {
  id: "019fb43d-82d9-7c38-947a-48a361c1f366",
  pageTypeSlug: "question",
  slug: "does-the-fleet-work-halt-bind-this-seat-s-subagent-fan-out",
  ask: "Does the fleet work halt bind this seat's subagent fan-out?",
  askedBy: "aine",
  askedIn: "019fb30c-3cbe-7700-91df-83950a893ac9",
  status: "answered",
  offered: [
    "Fan out — the halt is for the fleet, not this seat's subagents",
    "Stay solo — keep working alone, no subagents until I resume",
    "Full stop — wind down and wait for me",
  ],
  answer: "Fan out — the halt is for the fleet, not this seat's subagents",
  closedAt: "2026-07-30T21:01:05.280Z",
  context: "txt",
} as const satisfies Question
