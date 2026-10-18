import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message85b2bd8a68d1 = {
  id: "01a14ff4-8f88-7000-95da-85b2bd8a68d1",
  type: "page-type/agent-message",
  slug: "message-85b2bd8a68d1",
  to: "seat/alan",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at a8639ec7d830d1d912ba066b61ea44afc616c89c found 1 check newly refusing.\n`browser-code-compiles` refused 4 times:\n  alan/atlas-web/modules/location-map/location-map.module.code.tsx — line 1: TS2882: Cannot find module or type declarations for side-effect import of 'maplibre-gl/dist/maplibre-gl.css'.\n  alan/chess/modules/board/chess-board.module.code.tsx — line 2: TS2882: Cannot find module or type declarations for side-effect import of 'akasha/alan/chess/board-look/chess-board-look.stylesheet.styles.css'.\n  alan/chess/modules/eval-bar/chess-eval-bar.module.code.tsx — line 2: TS2882: Cannot find module or type declarations for side-effect import of 'akasha/alan/chess/board-look/chess-board-look.stylesheet.styles.css'.\n  temper/web/root.tsx — line 2: TS2882: Cannot find module or type declarations for side-effect import of 'akasha/temper/web/look/temper-web-look.stylesheet.styles.css'.\nwhat each of them answered is on the newest row of the audit log beside that check's page. This was meant for `thea`, whom nothing could reach: no seat holds the name `thea`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
  createdAt: "2026-10-18T16:59:50.446Z",
  updatedAt: "2026-10-18T16:59:50.446Z",
} as const satisfies AgentMessage
