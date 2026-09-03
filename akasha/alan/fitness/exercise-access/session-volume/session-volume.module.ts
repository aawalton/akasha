import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const sessionVolume = {
  id: "01a0685d-cca7-78cd-9b2d-1d2c2c423d9b",
  pageTypeSlug: "module",
  slug: "session-volume",
  definition:
    "the strength volume a session came to, and the volume a day came to across its sessions",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Volume is counted against the weight the client profile states.",
    },
    {
      invariantKind: "departure",
      statement: "A bodyweight that is not stated is refused rather than counted as nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "How much of the lifter's own weight a movement carries is the movement's to state.",
    },
    {
      invariantKind: "departure",
      statement: "A day's volume is the volume of every session filed on that day.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which store the rows come from is settled where the rows are read rather than handed in here.",
    },
    {
      invariantKind: "gap",
      statement:
        "No client profile page stands, so nothing states the weight volume is counted against.",
    },
  ],
} as const satisfies Module
