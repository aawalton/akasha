import type { runsAt } from "akasha/agents/hooks/agent-hook/properties/runs-at.select-property.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type RunsAt = List<(typeof runsAt.values)[number]>
