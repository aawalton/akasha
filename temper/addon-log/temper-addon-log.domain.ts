import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperAddonLog = {
  id: "01a08e26-d48c-7a39-8610-6270e3e33c8f",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-addon-log",
  definition: "the lines an add-on writes about its own working while the game runs",
  parts: ["module/addon-log", "module/library-logger"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Whether an add-on writes these lines is the add-on's own to say.",
    },
    {
      invariantKind: "departure",
      statement: "An add-on names itself to the log library once.",
    },
  ],
} as const satisfies Domain
