import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const diskStore = {
  id: "01a0658b-0f02-7435-bfcf-e778c41f839f",
  pageTypeSlug: "domain",
  slug: "disk-store",
  definition: "a node-pinned filesystem other stores rest on",
  pluralSlug: "disk-stores",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A store no other store rests on is a disk store.",
    },
    {
      invariantKind: "departure",
      statement: "A volume is not backed up by default.",
    },
  ],
} as const satisfies Domain
