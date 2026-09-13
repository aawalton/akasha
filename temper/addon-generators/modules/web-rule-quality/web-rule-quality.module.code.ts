export const WEB_QUALITY_CONDITION = `  if (conditions.maxQuality !== undefined) {
    const op = conditions.qualityOp ?? "<="
    if (!compareWithOp(op, item.quality, conditions.maxQuality)) return false
  }`
