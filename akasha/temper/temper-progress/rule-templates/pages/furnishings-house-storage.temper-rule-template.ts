import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const furnishingsHouseStorage = {
  id: "01a05fd0-4de0-7ed7-baea-d7001b1818d1",
  pageTypeSlug: "temper-rule-template",
  slug: "furnishings-house-storage",
  title: "Store furniture in housing",
  key: "furnishings-house-storage",
  description:
    "Moves furnishings to the furniture vault (house storage) when visiting the bank. Keeps your backpack clear of bulky furniture items.",
  categoryId: "furnishings",
  displayOrder: 35,
  action: "move-to",
  active: false,
  goal: "hoard",
  destination: "furniture-vault",
} as const satisfies TemperRuleTemplate
