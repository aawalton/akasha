export const WEB_RESEARCH_CONDITION = `  // canResearch — check completion trait research data; passes through without context/data
  if (conditions.canResearch !== undefined && context?.researchedTraitsByCharacter?.size) {
    const canResearch = isTraitResearchableByAnyCharacter(item, context.researchedTraitsByCharacter)
    if (conditions.canResearch === "can-research" && !canResearch) return false
    if (conditions.canResearch === "cannot-research" && canResearch) return false
  }`
