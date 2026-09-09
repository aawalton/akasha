import type { Module } from "@akasha/code/module"

export const voiceCloneClient = {
  id: "01a0682d-8ef5-7007-9aeb-17efab6f532f",
  pageTypeSlug: "module",
  type: "module",
  slug: "voice-clone-client",
  definition: "what a voice-clone request carries to the speech service",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A clone has a reference clip and the words that clip says.",
    },
    {
      invariantKind: "departure",
      statement: "The reference clip is named where that clip is on the service's host.",
    },
    {
      invariantKind: "departure",
      statement: "A normal request has no priority header at all.",
    },
    {
      invariantKind: "departure",
      statement: "A high request has `x-cop-priority` so the pool serves that request first.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the service.",
    },
    {
      invariantKind: "departure",
      statement: "The request is only built.",
    },
  ],
} as const satisfies Module
