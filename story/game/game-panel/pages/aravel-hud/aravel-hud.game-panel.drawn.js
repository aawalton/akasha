const { poolPanelBy } =
  globalThis.akashaDrawing[
    "akasha/story/game/game-panel/modules/pool-panel/pool-panel.module.code.tsx"
  ]

export const Panel = poolPanelBy([
  { key: "partners-ii-hp", max: "partners-ii-hpMax", color: "red", label: "VITALITY" },
  { key: "partners-ii-focus", max: "partners-ii-focusMax", color: "blue", label: "ESSENCE" },
  { key: "partners-ii-stamina", max: "partners-ii-staminaMax", color: "green", label: "STAMINA" },
])
