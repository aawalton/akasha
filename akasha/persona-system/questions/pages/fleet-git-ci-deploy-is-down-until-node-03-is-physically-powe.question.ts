import type { Question } from "../question.page-type.ts"

export const fleetGitCiDeployIsDownUntilNode03IsPhysicallyPowe = {
  id: "019f9648-d106-7ba7-8db8-85bd4e9fabd8",
  pageTypeSlug: "question",
  slug: "fleet-git-ci-deploy-is-down-until-node-03-is-physically-powe",
  ask: "Fleet git/CI/deploy is down until node-03 is physically power-cycled — can you power-cycle it (or toggle its smart-plug) when you're able?",
  askedBy: "athena",
  askedIn: "019f82df-de24-732c-9b7d-1d53ed2c2607",
  status: "answered",
  offered: ["Power-cycled node-03 — done", "Can't get to it right now"],
  answer: "Power-cycled node-03 — done",
  closedAt: "2026-07-24T22:58:20.408Z",
  context: "txt",
} as const satisfies Question
