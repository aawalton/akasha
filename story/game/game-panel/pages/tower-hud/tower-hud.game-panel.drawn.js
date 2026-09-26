const { poolPanelBy } =
  globalThis.akashaDrawing[
    "akasha/story/game/game-panel/modules/pool-panel/pool-panel.module.code.tsx"
  ]

export const Panel = poolPanelBy([
  { key: "health", max: "healthMax", color: "red", label: "HEALTH" },
  { key: "mana", max: "manaMax", color: "blue", label: "MANA" },
  { key: "stamina", max: "staminaMax", color: "green", label: "STAMINA" },
])
