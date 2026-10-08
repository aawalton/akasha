import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const claudeCodeTool = {
  id: "01a065b0-2101-7bd6-8f34-c21a86eb89e4",
  type: "page-type/domain",
  slug: "claude-code-tool",
  definition: "an agent tool built into Claude Code",
  parts: ["computed-property-module/tool-subject"],
  createdAt: "2026-09-03T05:13:56.737Z",
  updatedAt: "2026-09-24T16:40:06.000Z",
} as const satisfies Domain
