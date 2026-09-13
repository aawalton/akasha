export const WEB_ITEM_NAME_CONDITION = `  // Item name — mini query language (terms AND'd, negation, quoted phrases)
  if (conditions.itemNamePattern) {
    if (!itemNameMatchesPattern(item.itemName, conditions.itemNamePattern)) return false
  }`
