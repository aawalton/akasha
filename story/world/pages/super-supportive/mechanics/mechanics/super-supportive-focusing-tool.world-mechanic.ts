import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveFocusingTool = {
  id: "01a0e9f1-cfc2-7a43-839f-231577d2ff60",
  type: "page-type/world-mechanic",
  slug: "super-supportive-focusing-tool",
  title: "Focusing tool",
  world: "world/super-supportive",
  aliases: ["focus"],
  description: "A thing that helps a caster concentrate and holds their authority.",
} as const satisfies WorldMechanic
