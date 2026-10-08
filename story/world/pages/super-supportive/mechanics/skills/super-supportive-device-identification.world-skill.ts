import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveDeviceIdentification = {
  id: "01a0e9f6-d517-7a41-b885-85347f71f717",
  type: "page-type/world-skill",
  slug: "super-supportive-device-identification",
  title: "Device Identification",
  world: "world/super-supportive",
  aliases: ["device identification offering"],
  description: "A talent that names a pointed-at device and its status.",
  createdAt: "2026-09-28T21:41:02.871Z",
  updatedAt: "2026-09-28T21:41:06.000Z",
} as const satisfies WorldSkill
