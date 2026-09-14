import type { Host } from "akasha/infrastructure/machines/hosts/host.page-type.types.ts"

export const macbook = {
  id: "01a06590-e94f-7756-9d6b-824b7b6c9549",
  type: "host",
  slug: "macbook",
  definition: "Alan's Apple laptop",
  title: "MacBook",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The workstation reaches this machine over ssh and runs programs here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fault on this machine is the harness's to mend rather than Alan's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This machine belonging to Alan is no reason to hand Alan a fault found here.",
    },
  ],
} as const satisfies Host
