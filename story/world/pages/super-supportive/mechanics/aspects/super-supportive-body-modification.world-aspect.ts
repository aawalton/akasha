import type { WorldAspect } from "akasha/story/world/mechanics/aspects/world-aspect.page-type.types.ts"

export const superSupportiveBodyModification = {
  id: "01a0e9f0-79f3-70ef-a10a-16b4c565dd2f",
  type: "page-type/world-aspect",
  slug: "super-supportive-body-modification",
  title: "Body modification",
  world: "world/super-supportive",
  aliases: ["enhancements", "genetic modification"],
  description:
    "Magical or genetic changes to a body, such as enhanced bones or reconfigured immune systems.",
} as const satisfies WorldAspect
