import type { CpuKind } from "akasha/infrastructure/cpu/kind/cpu-kind.page-type.types.ts"

export const utilization = {
  id: "01a0918b-7688-7fb8-a940-bbcdee460ae4",
  type: "page-type/cpu-kind",
  slug: "utilization",
  definition: "the part of a processor a program spent over a stretch of time",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A percentage states whether it is of one processor or of every processor.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A program on eight processors reaches eight hundred percent of one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Utilization is worked out from burned seconds over elapsed time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A host at full utilization with nothing waiting is a host being used well.",
    },
  ],
} as const satisfies CpuKind
