import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message512cb3cf98fd = {
  id: "01a0a699-914b-7000-8f38-512cb3cf98fd",
  type: "page-type/message",
  slug: "message-512cb3cf98fd",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at c6ad4802b1121662434cb2bc998bbdd9f0d6bcb6 found 1 check newly refusing.\n`typecheck` refused 76 times:\n  product/archive-of-worlds/web/.react-router/types/+routes.ts — line 7: TS2717: Subsequent property declarations must have the same type. Property 'pages' must be of type 'Pages', but here has type 'Pages'. — the akasha folder does not compi... (27 characters more)\n  product/archive-of-worlds/web/.react-router/types/+routes.ts — line 8: TS2717: Subsequent property declarations must have the same type. Property 'routeFiles' must be of type 'RouteFiles', but here has type 'RouteFiles'. — the akasha folder... (42 characters more)\n  product/archive-of-worlds/web/.react-router/types/+routes.ts — line 9: TS2717: Subsequent property declarations must have the same type. Property 'routeModules' must be of type 'RouteModules', but here has type 'RouteModules'. — the akasha ... (48 characters more)\n  product/archive-of-worlds/web/.react-router/types/+routes.ts — line 128: TS2307: Cannot find module './/root.tsx' or its corresponding type declarations. — the akasha folder does not compile as this change leaves it\n  product/archive-of-worlds/web/.react-router/types/+routes.ts — line 129: TS2307: Cannot find module './/routes/_app-layout.tsx' or its corresponding type declarations. — the akasha folder does not compile as this change leaves it\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
