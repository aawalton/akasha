import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const diskStore = {
  id: "01a0658b-0f02-7435-bfcf-e778c41f839f",
  type: "page-type/domain",
  slug: "disk-store",
  definition: "a node-pinned filesystem other stores rest on",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A store no other store rests on is a disk store.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A volume is not backed up by default.",
    },
  ],
} as const satisfies Domain
