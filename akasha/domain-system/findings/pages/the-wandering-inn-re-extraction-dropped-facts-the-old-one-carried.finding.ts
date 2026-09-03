import type { Finding } from "../finding.page-type.ts"

export const theWanderingInnReExtractionDroppedFactsTheOldOneCarried = {
  id: "01a0655a-1c00-7000-9a3e-4f2a1b7c9d01",
  pageTypeSlug: "finding",
  slug: "the-wandering-inn-re-extraction-dropped-facts-the-old-one-carried",
  domainSlug: "domain/akasha-migration",
  claim:
    "The wandering-inn extraction under `pages/class`, `pages/skill` and `pages/spell` carries neither the class and skill evolution graph nor every character level the extraction under `dirty/` carried, so 467 files under `dirty/the-wandering-inn/` are held rather than superseded.",
  evidence:
    "Of the 1,273 class and skill files under `dirty/the-wandering-inn/`, 943 matched a counterpart by slug whose title and world-slug were equal, and went. The 330 that stay each carry an evolvesFrom or evolvesTo edge, or an alias the counterpart does not: 154 name an evolvesFrom, 144 an evolvesTo, 90 an alias. No file under `pages/class`, `pages/skill` or `pages/spell` holds an evolution field at all, and the world's mechanic-readings maps a name to a mechanic rather than a mechanic to a mechanic, so the graph has no home anywhere. The 90 aliases are singular-plural pairs the new extraction keeps as two separate pages, which loses that the pair is one class. Separately, the 137 files under `dirty/the-wandering-inn/story-character-timeline/` each carry a maxLevel. Recomputing that from the level field of every references.jsonl under `pages/class`, `pages/skill` and `pages/spell` reaches all 137 holders but comes out short for 21 of the 126 that state one, among them az-kerash at 78 against 0 recomputed and erin at 55 against 49.",
} as const satisfies Finding
