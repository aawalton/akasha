import type { IntentStatement } from "akasha/domains/initiatives/properties/intent-statement.standard-agent-english-property.types.ts"
import type { WorkingMemory } from "akasha/domains/initiatives/properties/working-memory.text-property.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type Intents = List<{
  statement: IntentStatement
  workingMemory?: WorkingMemory
}>
