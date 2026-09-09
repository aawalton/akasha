export const WEB_ITEM_FLAG_CONDITIONS = `  // Stolen status — absent data fails (unknown items excluded from counts)
  if (conditions.stolen !== undefined) {
    if (item.stolen === undefined) return false
    if (conditions.stolen === "stolen" && !item.stolen) return false
    if (conditions.stolen === "not-stolen" && item.stolen) return false
  }

  // Bound status — absent data fails (unknown items excluded from counts)
  if (conditions.bound !== undefined) {
    if (item.bound === undefined) return false
    if (conditions.bound === "bound" && !item.bound) return false
    if (conditions.bound === "not-bound" && item.bound) return false
  }

  // BoP-tradeable status — absent data fails (unknown items excluded from counts)
  if (conditions.bopTradeable !== undefined) {
    if (item.bopTradeable === undefined) return false
    if (conditions.bopTradeable === "bop-tradeable" && !item.bopTradeable) return false
    if (conditions.bopTradeable === "not-bop-tradeable" && item.bopTradeable) return false
  }

  // Quest-relevant status — absent data fails (unknown items excluded from counts)
  if (conditions.questRelevant !== undefined) {
    if (item.questRelevant === undefined) return false
    if (conditions.questRelevant === "quest-relevant" && !item.questRelevant) return false
    if (conditions.questRelevant === "not-quest-relevant" && item.questRelevant) return false
  }

  // Locked status — absent means not locked (addon only writes true)
  if (conditions.locked !== undefined) {
    const isLocked = item.locked === true
    if (conditions.locked === "locked" && !isLocked) return false
    if (conditions.locked === "not-locked" && isLocked) return false
  }

  // Reconstructed status — absent means not reconstructed (addon only writes true)
  if (conditions.reconstructed !== undefined) {
    const isReconstructed = item.reconstructed === true
    if (conditions.reconstructed === "reconstructed" && !isReconstructed) return false
    if (conditions.reconstructed === "not-reconstructed" && isReconstructed) return false
  }

  // Transmuted status — absent means not transmuted (addon only writes true)
  if (conditions.transmuted !== undefined) {
    const isTransmuted = item.transmuted === true
    if (conditions.transmuted === "transmuted" && !isTransmuted) return false
    if (conditions.transmuted === "not-transmuted" && isTransmuted) return false
  }`
