import type { FileProperty } from "@akasha/pages-system/file-property"

export type StateType = "ts"

export const stateType = {
  id: "01a07245-dce5-7a6b-b280-8d4dd7179a71",
  pageTypeSlug: "file-property",
  slug: "state-type",
  propertySlug: "state-type",
  definition: "the TypeScript type the state beside it is written and read as",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This file is committed where the state it types is not.",
    },
    {
      invariantKind: "departure",
      statement: "The service writing the state is judged against this type.",
    },
    {
      invariantKind: "departure",
      statement: "The editor takes this type without loading the file the editor reads.",
    },
    {
      invariantKind: "departure",
      statement: "One type names the whole of one line rather than one row of it.",
    },
  ],
} as const satisfies FileProperty
