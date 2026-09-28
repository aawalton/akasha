import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveMourner = {
  id: "01a0e9f2-9e34-7731-9cae-bdfee50c237a",
  type: "page-type/world-class",
  slug: "super-supportive-mourner",
  title: "Mourner",
  world: "world/super-supportive",
  description:
    "An extremely rare emotional-transference class that takes others' negative feelings into oneself.",
} as const satisfies WorldClass
