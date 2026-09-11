import type { CpuKind } from "akasha/infrastructure/cpu/kinds/cpu-kind.page-type.types.ts"

export const throttled = {
  id: "01a0918b-bdc8-77e7-834a-16d48b13473c",
  type: "cpu-kind",
  slug: "throttled",
  definition: "time a program was held off a processor by its own ceiling",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Throttling is a ceiling being kept rather than a host being short.",
    },
    {
      invariantKind: "departure",
      statement: "A program is throttled while processors elsewhere are idle.",
    },
    {
      invariantKind: "departure",
      statement: "The kernel counts both how often a program was throttled and for how long.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling nothing is ever throttled against is a ceiling nothing reached.",
    },
  ],
} as const satisfies CpuKind
