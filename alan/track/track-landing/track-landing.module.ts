import type { Module } from "@akasha/code/module"

export const trackLanding = {
  id: "01a072c2-e567-7000-a1b9-3a51eea84ed2",
  pageTypeSlug: "module",
  slug: "track-landing",
  definition: "a body Alan's tracking composed, landed under the tracked trees or refused",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A caller hands the body in as a value rather than as a file.",
    },
    {
      invariantKind: "departure",
      statement: "A change stating no body takes its path away.",
    },
    {
      invariantKind: "departure",
      statement: "A body goes up through the change that works out the kind of path it is handed.",
    },
    {
      invariantKind: "departure",
      statement: "A page's id is worked out by that change rather than by the landing.",
    },
    {
      invariantKind: "departure",
      statement: "Every page landed here arrives with an id, whichever tracked tree it goes under.",
    },
    {
      invariantKind: "departure",
      statement: "A path outside the tracked trees is refused before anything is written.",
    },
    {
      invariantKind: "departure",
      statement: "Every change of a single call lands as a single commit or no change lands.",
    },
    {
      invariantKind: "departure",
      statement: "A change lands under no agent id and owes no reading.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal is carried back to the caller rather than thrown.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows a command line.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the disk for a body a caller already has.",
    },
  ],
} as const satisfies Module
