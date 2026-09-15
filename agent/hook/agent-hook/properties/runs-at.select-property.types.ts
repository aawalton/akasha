import type { runsAt } from "akasha/agent/hook/agent-hook/properties/runs-at.select-property.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type RunsAt = List<(typeof runsAt.values)[number]>
