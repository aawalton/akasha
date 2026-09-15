import type { IntentStatement } from "akasha/domain/initiative/properties/intent-statement.standard-agent-english-property.types.ts"
import type { WorkingMemory } from "akasha/domain/initiative/properties/working-memory.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type IntentStack = List<{
  statement: IntentStatement
  workingMemory?: WorkingMemory
}>
