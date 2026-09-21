const { poolPanelBy } =
  globalThis.akashaDrawing["akasha/story/game/panel/modules/pool-panel/pool-panel.module.code.tsx"]

export const Panel = poolPanelBy([
  { key: "hp", max: "hpMax", color: "red", label: "VITAE" },
  { key: "focus", max: "focusMax", color: "blue", label: "FOCUS" },
  { key: "stamina", max: "stamMax", color: "green", label: "STAMINA" },
])
