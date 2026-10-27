import type { TemperHudPanel } from "akasha/temper/addon/shared/hud-component/temper-hud-panel/temper-hud-panel.page-type.types.ts"

export const chat = {
  id: "01a17ec6-f0fd-76e2-ac8d-ffb71e17958c",
  type: "page-type/temper-hud-panel",
  slug: "chat",
  title: "Chat",
  key: "ZO_ChatWindow",
  dock: "temper-hud-dock/bottom-left",
  displayOrder: 1,
  inputModes: ["keyboard"],
  createdAt: "2026-10-27T19:12:09.468Z",
  updatedAt: "2026-10-27T20:15:17.769Z",
} as const satisfies TemperHudPanel
