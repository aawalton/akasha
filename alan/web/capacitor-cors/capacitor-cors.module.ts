import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const capacitorCors = {
  id: "01a063c9-03ff-733a-9c12-48399577ca75",
  pageTypeSlug: "module",
  type: "module",
  slug: "capacitor-cors",
  definition: "the cross-origin headers a request from the native shell is answered with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A request from another origin is answered without a cross-origin header.",
    },
    {
      invariantKind: "departure",
      statement: "The native shell's origin is the https origin of the site the shell serves.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "The custom scheme an installed build still sends is admitted beside the https origin.",
    },
    {
      invariantKind: "departure",
      statement: "The origin an answer names is the origin the request carried.",
    },
    {
      invariantKind: "departure",
      statement: "A preflight is answered 204 carrying the cross-origin headers alone.",
    },
    {
      invariantKind: "departure",
      statement: "An answer to the native shell keeps its own status and its own body.",
    },
    {
      invariantKind: "departure",
      statement:
        "A header one answer states wins over a cross-origin header, and that over a carried one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A header picked up part way through a request is carried by every answer after it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A route doing its work in its action still answers a preflight through its loader.",
    },
    {
      invariantKind: "departure",
      statement: "A method a route does not serve is refused 405 with the cross-origin headers.",
    },
  ],
} as const satisfies Module
