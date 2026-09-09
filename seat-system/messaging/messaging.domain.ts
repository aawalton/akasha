import type { Domain } from "@akasha/domains/domain"

export const messaging = {
  id: "01a08842-144e-783f-af6d-2e8a02ad5e8d",
  pageTypeSlug: "domain",
  slug: "messaging",
  definition: "a message carried to the agent it names",
  parts: [
    "module/message-file",
    "module/message-file-watch",
    "module/message-page-address",
    "module/message-reach-write",
    "module/message-to",
    "module/message-to-start",
    "module/messages-agent-id",
    "module/messages-console-stdout-guard",
    "module/messages-delivery-witness",
    "module/messages-mcp",
  ],
} as const satisfies Domain
