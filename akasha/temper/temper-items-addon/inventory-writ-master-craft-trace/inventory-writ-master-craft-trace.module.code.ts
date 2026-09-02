import {
  getSavedVariables,
  isSavedVariablesReady,
} from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type { MasterCraftTrace } from "../inventory-writ-master-craft-trace-types/inventory-writ-master-craft-trace-types.module.code.ts"

const MASTER_CRAFT_TRACE_RING_MAX = 24

export function recordMasterCraftTrace(this: void, trace: MasterCraftTrace): undefined {
  if (!isSavedVariablesReady()) return
  const sv = getSavedVariables()
  if (sv.diagnostics === undefined) sv.diagnostics = {}
  const ring = sv.diagnostics.masterCraftTraces ?? []
  ring[ring.length] = trace
  while (ring.length > MASTER_CRAFT_TRACE_RING_MAX) {
    ring.splice(0, 1)
  }
  sv.diagnostics.masterCraftTraces = ring
}
