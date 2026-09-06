import type { Module } from "@akasha/code/module"

export const supervisorProxyAdoptionDecide = {
  id: "01a06838-5a84-7004-bfa3-4f11134ef503",
  pageTypeSlug: "module",
  slug: "supervisor-proxy-adoption-decide",
  definition: "whether a supervisor takes over the OAuth proxy standing or starts its own",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "No live proxy is answered with a fresh proxy.",
    },
    {
      invariantKind: "departure",
      statement: "A live proxy at the version expected here is taken over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A live proxy at another version is taken over anyway while that proxy is healthy.",
    },
    {
      invariantKind: "departure",
      statement:
        "A live proxy at another version that is unhealthy is replaced rather than taken over.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts or stops or reaches a proxy.",
    },
  ],
} as const satisfies Module
