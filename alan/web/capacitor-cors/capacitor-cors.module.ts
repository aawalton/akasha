import type { Module } from "@akasha/code/module"

export const capacitorCors = {
  id: "01a063c9-03ff-733a-9c12-48399577ca75",
  pageTypeSlug: "module",
  type: "module",
  slug: "capacitor-cors",
  definition: "the cross-origin headers a request from the native shell is answered with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A request from another origin is answered without a cross-origin header.",
    },
    {
      invariantKind: "departure",
      statement: "A preflight is answered 204 carrying the cross-origin headers alone.",
    },
    {
      invariantKind: "departure",
      statement: "An answer to the native shell keeps its own status and its own body.",
    },
  ],
} as const satisfies Module
