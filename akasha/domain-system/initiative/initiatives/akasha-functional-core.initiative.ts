import type { Initiative } from "../initiative.page-type.ts"

export const akashaFunctionalCore = {
  id: "01a05324-954d-7f70-8b6f-0a30053d98c1",
  pageTypeSlug: "initiative",
  slug: "akasha-functional-core",
  domainSlug: "domain/akasha-system",
  personaSlug: "akasha",
  parentSlug: "akasha-migration",
  invariants: [
    {
      invariantKind: "gap",
      statement: "Every change to the akasha system is made by it.",
    },
    {
      invariantKind: "gap",
      statement: "The akasha system checks every change to itself.",
    },
  ],
  notes: [
    "A change the akasha system makes is gated, written and committed as one act. That was the third intent here and it is met: one lock over the gate, the write and the commit, and the bodies put back when any part of it throws. What it does not cover is named where it stands rather than here, so this initiative holds it no longer.",
    "The other two are open, and both are open at the shell. A Write, an Edit and a NotebookEdit are refused inside the akasha folder, and so is every writing verb of git, but a shell writes a file in more ways than can be named and the hook over them samples rather than closes. What the sampling misses lands unjudged, and a change that lands unjudged is a change no check ever saw, so the two intents fail together and in the same place.",
    "Checks run on every change the write command lands, but the suite that runs there is the patch suite and not the audit one. The tests, the import cycle check and the property declaration check run only at audit, and nothing invokes audit: there is no CI, no git hook and no schedule. A change can also land with no check at all by breaking the glass, which is design rather than a hole, and the commit says so when it happens.",
  ],
} as const satisfies Initiative
