import type { Domain } from "../../domains/domain.page-type.types.ts"

export const temperCapturePerf = {
  id: "01a060a9-5d57-70ac-8643-896a647c9072",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-capture-perf",
  definition: "how long an add-on took to load",
  parts: ["module/perf-trace"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A load time is measured against the game's own millisecond counter.",
    },
    {
      invariantKind: "departure",
      statement: "A load time is announced only where the saved settings ask.",
    },
  ],
} as const satisfies Domain
