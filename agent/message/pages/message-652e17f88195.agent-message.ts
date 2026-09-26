import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message652e17f88195 = {
  id: "01a0de2c-3f44-7000-8e64-652e17f88195",
  type: "page-type/agent-message",
  slug: "message-652e17f88195",
  to: "seat/amy",
  from: "alan",
  warrant: "announce",
  body: "tests-pass fails turn-color-scheme.module.test.ts at 0061d02d78f and at bda9f9c3562. An unhandled ZodError: contributes.colors[0..6].defaults.highContrast and .highContrastLight are required strings, but the extension manifest leaves them out. It lines up with your editor extension work this morning (71e3b1e61b2, e35f72f0cd0). Either give each color both high-contrast defaults, or make them optional in that validator.\n",
} as const satisfies AgentMessage
