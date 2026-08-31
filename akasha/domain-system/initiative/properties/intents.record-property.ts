import type { List } from "../../../pages-system/page-property/page-property.page-type.ts"
import type { RecordProperty } from "../../../pages-system/record-property/record-property.page-type.ts"
import type { Statement } from "../../domain/properties/statement.text-property.ts"
import type { WorkingMemory } from "./working-memory.text-property.ts"

export type Intent = {
  statement: Statement
  workingMemory?: WorkingMemory
}

export type Intents = List<Intent>

export const intents = {
  id: "01a058a3-b01f-7002-b869-8274ae8203a6",
  pageTypeSlug: "record-property",
  slug: "intents",
  propertySlug: "intents",
  definition: "what an initiative is to make so",
  properties: [
    { pagePropertySlug: "statement", required: true, many: false },
    { pagePropertySlug: "working-memory", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An intent says only what is not yet so.",
    },
    {
      invariantKind: "departure",
      statement: "An intent stands as a gap rather than stating which kind of invariant it is.",
    },
  ],
} as const satisfies RecordProperty
