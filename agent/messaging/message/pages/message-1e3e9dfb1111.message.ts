import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message1e3e9dfb1111 = {
  id: "01a0a5ac-006b-7000-b6a0-1e3e9dfb1111",
  type: "message",
  slug: "message-1e3e9dfb1111",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 6f13fdb0aff8eb0701b2ff26d0d79aa3e550aacb found 1 check newly refusing.\n`typecheck` refused 171 times:\n  alan/atlas-web/.react-router/types/+routes.ts — line 179: TS2307: Cannot find module './/root.tsx' or its corresponding type declarations. — the akasha folder does not compile as this change leaves it\n  alan/atlas-web/.react-router/types/+routes.ts — line 180: TS2307: Cannot find module './/routes/_app-layout.tsx' or its corresponding type declarations. — the akasha folder does not compile as this change leaves it\n  alan/atlas-web/.react-router/types/+routes.ts — line 181: TS2307: Cannot find module './/routes/atlas-home/atlas-home.route.code.tsx' or its corresponding type declarations. — the akasha folder does not compile as this change leaves it\n  alan/atlas-web/.react-router/types/+routes.ts — line 182: TS2307: Cannot find module './/routes/atlas-search/atlas-search.route.code.tsx' or its corresponding type declarations. — the akasha folder does not compile as this change leaves it\n  alan/atlas-web/.react-router/types/+routes.ts — line 183: TS2307: Cannot find module './/routes/atlas-map/atlas-map.route.code.tsx' or its corresponding type declarations. — the akasha folder does not compile as this change leaves it\n/var/home/walton/.local/state/workstation-services/audit-verdicts.json holds what each of them answered, whole.\n",
} as const satisfies Message
