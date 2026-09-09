import type { HeldAddon } from "../held-addon.page-type.ts"

export const libSlashCommander = {
  id: "01a081a5-173d-7681-9a03-f8d1b8cfb490",
  pageTypeSlug: "held-addon",
  type: "held-addon",
  slug: "lib-slash-commander",
  addonName: "LibSlashCommander",
  esoAddon: "temper-lib-slash-commander",
  addonKind: "library",
  heldBy: 13228,
  adjacents: ["temper-crafting"],
  tiClean: true,
} as const satisfies HeldAddon
