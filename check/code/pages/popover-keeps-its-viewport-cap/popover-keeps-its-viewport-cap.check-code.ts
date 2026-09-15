import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const popoverKeepsItsViewportCap = {
  id: "01a082e9-5908-74cf-8d6f-521d3e9c7a79",
  type: "check-code",
  slug: "popover-keeps-its-viewport-cap",
  definition:
    "the check refusing a popover whose class or prop undoes the viewport cap its wrapper sets",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A wrapper capping its width by its family's available width names the tag judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A wrapper is found wherever that wrapper is written rather than in a package named here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wrapper setting no collision padding names no tag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A max-w token on a named tag replaces the cap rather than joining the cap.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A max-w with a calc is left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The cap is reachable inside a max-w with a calc.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A className a call builds is read through to the strings that call has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Turning collisions off and closing the collision padding are refused on those tags.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tag two wrappers give two families refuses the check.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree where no wrapper caps refuses the check rather than reporting clean.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The tags judged are read from the files a search of the tree names and the change's own files.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each of those files is read as the change leaves that file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change to a wrapper's cap judges the files that change carries and no other.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file using that wrapper is judged when that file is next changed or at audit.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
