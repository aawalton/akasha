import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const inspireCurrent = {
  id: "019e3104-2614-7fae-9ee7-2ef21026f460",
  pageTypeSlug: "temper-rule-template",
  slug: "inspire-current",
  title: "Deconstruct for inspiration",
  key: "inspire-current",
  description:
    "Routes equipment for deconstruction to the highest-priority character who hasn't fully leveled the corresponding crafting skill. If the current character benefits, the item is deconstructed locally; otherwise it's routed via the bank.",
  categoryId: "equipment",
  displayOrder: 17,
  action: "deconstruct",
  active: false,
  goal: "progress",
  destination: "character:by-priority",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
