export const WEB_LEVEL_CONDITION = `  if (conditions.maxLevel !== undefined) {
    const level = computeCombinedLevel(item.requiredLevel, item.requiredCP)
    const op = conditions.levelOp ?? "<="
    if (!compareWithOp(op, level, conditions.maxLevel)) return false
  }`
