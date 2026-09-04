import type { Question } from "../question.page-type.ts"

export const canYouPhysicallyPowerCycleNode03WhenYouGetAMoment = {
  id: "019f9646-e4e9-71ee-ba1f-234d436e82c0",
  pageTypeSlug: "question",
  slug: "can-you-physically-power-cycle-node-03-when-you-get-a-moment",
  ask: "Can you physically power-cycle node-03 when you get a moment? Its reboot hung and — bare-metal, no remote power (no IPMI/BMC) — a manual power-cycle is the only way back. It's the one thing blocking the fleet's CI right now.",
  askedBy: "amy",
  askedIn: "019f82e2-489c-7736-8d45-8365713763ff",
  status: "answered",
  offered: ["On it now", "Give me a bit"],
  answer: "On it now",
  closedAt: "2026-07-24T22:58:14.101Z",
  context: "txt",
} as const satisfies Question
