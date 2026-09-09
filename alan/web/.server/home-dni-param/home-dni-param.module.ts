import type { Module } from "@akasha/code/module"

export const homeDniParam = {
  id: "01a0655e-d399-7f57-a5ed-36dc75b69609",
  pageTypeSlug: "module",
  slug: "home-dni-param",
  definition: "the home navigation item read out of a request",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A question the service refused is thrown rather than answered as no home item.",
    },
    {
      invariantKind: "departure",
      statement:
        "Null is answered only where the service answered and no row carried the home slug.",
    },
    {
      invariantKind: "departure",
      statement: "The home slug is matched over the rows rather than narrowed in the question.",
    },
  ],
} as const satisfies Module
