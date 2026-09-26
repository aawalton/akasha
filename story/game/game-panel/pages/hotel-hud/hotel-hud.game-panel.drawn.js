const { poolPanelBy } =
  globalThis.akashaDrawing[
    "akasha/story/game/game-panel/modules/pool-panel/pool-panel.module.code.tsx"
  ]

export const Panel = poolPanelBy(
  [
    { key: "harem-hotel-health", max: "harem-hotel-healthMax", color: "red", label: "HEALTH" },
    { key: "harem-hotel-mana", max: "harem-hotel-manaMax", color: "blue", label: "MANA" },
    { key: "harem-hotel-stamina", max: "harem-hotel-staminaMax", color: "green", label: "STAMINA" },
  ],
  "harem-hotel-attribute-point"
)
