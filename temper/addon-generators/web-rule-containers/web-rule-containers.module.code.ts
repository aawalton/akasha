export const WEB_CONTAINER_CONDITIONS = `  // canOpen — item is a container that isn't blocked by an active cooldown group.
  // Mirrors the addon's isItemOpenable: not-a-container → fail; cooldown-group
  // active → fail. Per-character game cooldowns aren't part of the snapshot
  // (they tick down without an export trigger), so the matcher only enforces
  // the account-wide group-cooldown signal — same delayed-mirror contract as
  // the rest of the addon-only conditions. Without isContainer captured (older
  // snapshots), the check passes through.
  if (conditions.canOpen !== undefined) {
    if (item.isContainer === undefined) {
      // pass through — pre-capture data
    } else if (!item.isContainer) {
      return false
    } else if (context?.openCooldowns) {
      const group = findCooldownGroup({ itemName: item.itemName })
      if (group !== undefined) {
        const expiresAt = context.openCooldowns.get(group.key)
        if (expiresAt !== undefined && expiresAt > Date.now()) return false
      }
    }
  }

  // canGiveMaxRewards — container that, opened now, would yield the maximum
  // rewards. Mirrors the addon's evaluateScriptKnowledgeForOpen + canOpen-rule
  // combination over the snapshot:
  //   - Must be a container.
  //   - On cooldown:
  //       RFTW → false (transmute stones still matter; the addon treats RFTW
  //         as cap-respecting regardless of script knowledge)
  //       any-char-knows-all-scripts → true (one character can open without
  //         losing scripts; cooldown is wasted on them anyway)
  //       otherwise → false
  //   - Off cooldown:
  //       cooldown-group container (non-RFTW) AND any-char-knows-all AND
  //         not all-chars-know-all → false (save the guaranteed drop for the
  //         character that still needs scripts)
  //       otherwise → true
  // Pre-capture isContainer or no openCooldowns context → pass through.
  if (conditions.canGiveMaxRewards !== undefined) {
    if (item.isContainer === undefined) {
      // pass through — pre-capture data
    } else if (!item.isContainer) {
      return false
    } else if (context?.openCooldowns) {
      const group = findCooldownGroup({ itemName: item.itemName })
      const expiresAt = group !== undefined ? context.openCooldowns.get(group.key) : undefined
      const cooldownActive = expiresAt !== undefined && expiresAt > Date.now()
      const rftw = isRftwContainer({ itemName: item.itemName })
      const known = context.knownScriptsByCharacter
      let anyKnowsAll = false
      let allKnowAll = known !== undefined && known.size > 0
      if (known !== undefined) {
        for (const charScripts of known.values()) {
          if (charScripts.size >= TOTAL_SCRIPT_COUNT) {
            anyKnowsAll = true
          } else {
            allKnowAll = false
          }
        }
      }
      if (cooldownActive) {
        if (rftw) return false
        if (!anyKnowsAll) return false
      } else if (group !== undefined && !rftw && anyKnowsAll && !allKnowAll) {
        return false
      }
    }
  }`
