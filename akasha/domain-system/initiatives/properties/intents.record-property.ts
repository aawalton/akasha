import type { List } from "@akasha/pages-system/page-property"
import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { IntentStatement } from "./intent-statement.text-property.ts"
import type { WorkingMemory } from "./working-memory.text-property.ts"

export type Intent = {
  statement: IntentStatement
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
    { pagePropertySlug: "intent-statement", required: true, many: false },
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
