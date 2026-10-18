import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message06bf6a183503 = {
  id: "01a150e5-46ce-7000-86f4-06bf6a183503",
  type: "page-type/agent-message",
  slug: "message-06bf6a183503",
  to: "seat/ember",
  from: "alan",
  warrant: "announce",
  body: 'tests-pass refused at f303ba894bc3: temper/eso/ui-harness/modules/ui-virtuals/ui-virtuals.module.test.ts, test "writes a handler as a Lua function the sandbox compiles" (line 302) still expects `["OnInitialized"] = function(self, ...)`. Your 3f7ceb9f5a5 (14:20, "A template handler in the sandbox is handed every argument as the game hands them, the control first") now writes `function(...)` then `local self = ...` in ui-virtuals-lua, so that expectation is stale. Please bring the test to the new shape (it still checks ZO_Ready(self), which passes). Full answer is on the newest row of check/code/pages/tests-pass/tests-pass.check-code.audit.logs.uncommitted.jsonl.\n',
  createdAt: "2026-10-18T21:22:46.004Z",
  updatedAt: "2026-10-18T21:22:46.004Z",
} as const satisfies AgentMessage
