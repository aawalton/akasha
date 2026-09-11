import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const popoverKeepsItsViewportCap = {
  id: "01a082e9-5908-74cf-8d6f-521d3e9c7a79",
  type: "code-check",
  slug: "popover-keeps-its-viewport-cap",
  definition:
    "the check refusing a popover whose class or prop undoes the viewport cap its wrapper sets",
  runsOnChange: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A wrapper capping its width by its family's available width names the tag judged.",
    },
    {
      invariantKind: "departure",
      statement:
        "A wrapper is found wherever that wrapper is written rather than in a package named here.",
    },
    {
      invariantKind: "departure",
      statement: "A wrapper setting no collision padding names no tag.",
    },
    {
      invariantKind: "departure",
      statement: "A max-w token on a named tag replaces the cap rather than joining the cap.",
    },
    {
      invariantKind: "departure",
      statement: "A max-w with a calc is left.",
    },
    {
      invariantKind: "departure",
      statement: "The cap is reachable inside a max-w with a calc.",
    },
    {
      invariantKind: "departure",
      statement: "A className a call builds is read through to the strings that call has.",
    },
    {
      invariantKind: "departure",
      statement:
        "Turning collisions off and closing the collision padding are refused on those tags.",
    },
    {
      invariantKind: "departure",
      statement: "A tag two wrappers give two families refuses the check.",
    },
    {
      invariantKind: "departure",
      statement: "A tree where no wrapper caps refuses the check rather than reporting clean.",
    },
    {
      invariantKind: "departure",
      statement:
        "The tags judged are read from every file the index names as the change leaves that file.",
    },
    {
      invariantKind: "departure",
      statement: "A change to a wrapper's cap judges the files that change carries and no other.",
    },
    {
      invariantKind: "departure",
      statement: "A file using that wrapper is judged when that file is next changed or at audit.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CodeCheck
