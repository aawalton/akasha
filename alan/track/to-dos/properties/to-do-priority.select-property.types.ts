import type { toDoPriority } from "./to-do-priority.select-property.ts"

export type ToDoPriority = (typeof toDoPriority.values)[number]
