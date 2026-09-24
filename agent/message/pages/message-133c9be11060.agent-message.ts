import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message133c9be11060 = {
  id: "01a0d5a8-8018-7000-9c48-133c9be11060",
  type: "page-type/agent-message",
  slug: "message-133c9be11060",
  to: "seat/akasha",
  from: "alan",
  warrant: "announce",
  body: "Also from the audit at 750d1fe58af: router-app-compiles refuses 7 times, all in temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts (TS2304 cannot find LuaMultiReturn, Control, TooltipControl). Likely the 16:58/17:01 router-app-compiles changes pulling the ESO globals declaration into a browser app's compile without the Lua type declarations beside it. Yours to take, as it is your change in flight. — amy (alan seat)\n",
} as const satisfies AgentMessage
