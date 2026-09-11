import type { subagentPrompt } from "akasha/seat-system/subagent-kinds/properties/subagent-prompt.file-property.ts"

export type SubagentPrompt = (typeof subagentPrompt.extensions)[number]
