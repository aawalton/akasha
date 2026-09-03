import type { Module } from "@akasha/code-system/module"

export const supervisorInteractiveSeams = {
  id: "01a06871-3115-7007-ad27-cd0693dae709",
  pageTypeSlug: "module",
  slug: "supervisor-interactive-seams",
  definition: "the three collaborators a seat's interactive run is handed rather than reaching for",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here holds behaviour; the seam is one type and no more.",
    },
  ],
} as const satisfies Module
