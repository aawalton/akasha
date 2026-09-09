import type { Domain } from "../../domains/domain.page-type.ts"

export const browserLaunchEnv = {
  id: "01a05c48-deeb-7003-a5da-3a33a507b7c8",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "browser-launch-env",
  definition: "the environment a browser is started with",
  parts: ["module/launch-env"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here starts a browser.",
    },
  ],
} as const satisfies Domain
