export const WEB_TRAIT_CONDITIONS = `  // traits — map ESO trait number to Temper ID and check inclusion
  if (conditions.traits !== undefined && conditions.traits.length > 0) {
    const temperId = esoTraitToTemperId(item.traitType, item.equipType)
    if (!temperId) return false
    if (!conditions.traits.includes(temperId)) return false
  }`
