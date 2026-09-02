export const WEB_COMBINED_LEVEL_HELPER = `/**
 * Compute the combined level scale from requiredLevel and requiredCP.
 * CP items: 50 + floor(requiredCP / 10). Otherwise: requiredLevel.
 */
function computeCombinedLevel(requiredLevel: number, requiredCP: number): number {
  return requiredCP > 0 ? 50 + Math.floor(requiredCP / 10) : requiredLevel
}`
