import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const landingAdmission = {
  id: "01a0a0af-184c-7bcb-bcd1-77847f24260e",
  type: "page-type/module",
  slug: "landing-admission",
  definition: "the turn a landing waits for, and the memory the workstation keeps free to give it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing starts only where it holds the turn.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Sixteen gigabytes available is the least a landing starts on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is available is what the kernel says, rather than what is unused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing the workstation has no room for waits rather than refusing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is taken under a lock, so two landings never read the same free memory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn is held only while it is taken, so a run that died holding one stops nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A least read from the environment is used in place of the least stated here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here counts what memory a landing is about to take.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One landing is spaced from the next by what memory is free rather than by a wait.",
    },
  ],
} as const satisfies Module
