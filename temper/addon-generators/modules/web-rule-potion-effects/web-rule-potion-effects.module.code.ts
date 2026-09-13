export const WEB_POTION_EFFECT_CONDITIONS = `  // Potion restoration effects — resolved from the static @temper/game-items-alchemy
  // catalog via the SAME shared resolver the addon/CLI builders use, so the
  // condition classifies potions identically on both surfaces (parity).
  // Fail-closed: a non-potion / unresolvable potion (undefined) never matches.
  // "all" → potion grants every listed effect; "any" (default) → at least one.
  if (conditions.potionEffects !== undefined && conditions.potionEffects.length > 0) {
    const granted = resolvePotionRestoreMetricIds(
      item.itemId,
      parsePotionDataFromLink(item.itemLink)
    )
    if (granted === undefined) return false
    const grantedSet = new Set(granted)
    const required = conditions.potionEffects
    const matches =
      (conditions.potionEffectsMode ?? "any") === "all"
        ? required.every((effect) => grantedSet.has(effect))
        : required.some((effect) => grantedSet.has(effect))
    if (!matches) return false
  }`
