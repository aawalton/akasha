import type { CodeCheck } from "../../code-check.page-type.ts"

export const popoverKeepsItsViewportCap = {
  id: "01a082e9-5908-74cf-8d6f-521d3e9c7a79",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "popover-keeps-its-viewport-cap",
  definition:
    "the check refusing a popover whose class or prop undoes the viewport cap its wrapper sets",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A wrapper capping its width by its family's available width names the tag judged.",
    },
    {
      invariantKind: "departure",
      statement: "A wrapper is found wherever it is written rather than in a package named here.",
    },
    {
      invariantKind: "departure",
      statement: "A wrapper setting no collision padding names no tag.",
    },
    {
      invariantKind: "departure",
      statement: "A max-w token on a named tag replaces the cap rather than joining it.",
    },
    {
      invariantKind: "departure",
      statement: "A max-w with a calc is left, the cap being reachable inside it.",
    },
    {
      invariantKind: "departure",
      statement: "A className a call builds is read through to the strings that call has.",
    },
    {
      invariantKind: "departure",
      statement:
        "Turning collisions off, and closing the collision padding, are refused on those tags.",
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
      invariantKind: "gap",
      statement: "A change to a wrapper's own cap is judged over the files using that wrapper.",
    },
  ],
  check: { maxCpuSeconds: 10 },
} as const satisfies CodeCheck
