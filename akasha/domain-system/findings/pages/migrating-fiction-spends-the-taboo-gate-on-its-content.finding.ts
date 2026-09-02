import type { Finding } from "../finding.page-type.ts"

export const migratingFictionSpendsTheTabooGateOnItsContent = {
  id: "01a063ce-6216-7008-907e-df72de209ebf",
  pageTypeSlug: "finding",
  slug: "migrating-fiction-spends-the-taboo-gate-on-its-content",
  domainSlug: "domain/akasha-check",
  claim:
    "The taboo check judges what a page carries as well as what an agent writes, so bringing fiction into akasha refuses on the names inside the fiction. One world's readings trip 15 of the 37 terms. Clearing a term means reading it, and a term read once is disarmed for every later write by that agent, so an agent who migrates one world has spent two fifths of the prose gate on somebody else's invented skill names before writing a sentence of their own.",
  evidence:
    "Measured while landing the first world page. `the-wandering-inn` carries 11,354 mechanic readings and 57 character readings. Every one of the 15 refusals falls in a `readingName` value, which is the name as the story writes it: a fictional skill or class. None falls in prose I wrote.\n\nThe counts, highest first, are 74, 71, 51, 39, 38, 24, 23, 12, 12, 6, 6, 3, 3, 3 and 1. The two I read to clear bar senses that have nothing to do with fiction: one bars a message that earns the start of a stopped seat, the other bars reading a document line by line. A story naming a skill means neither. Both terms name no kept sense, so the sense I meant is permitted by omission, and the check still refused until I had read them.\n\nThis finding cannot name the 15 terms without tripping the same check on itself and spending eight more of them, which is the shape of the problem stated twice.\n\nThe scale is the part that matters. A world is the smallest kind this migration carries and the only one of the 149 that holds readings at all. Left to come are 18,082 Royal Road chapters, 8,972 skills, 8,380 classes and 1,579 books, all of them English prose written by somebody else. Every term would go, for every agent who touches them, and nothing would report that the gate was gone.\n\nThe check earns its place on prose an agent writes. What was migrated is not that. Nothing here rules on where the line belongs.",
} as const satisfies Finding
