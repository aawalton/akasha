import type { Finding } from "../finding.page-type.ts"

export const aStatedTestFileIsNotThere = {
  id: "01a04d4f-b2a2-7001-831b-478c1450c732",
  pageTypeSlug: "finding",
  slug: "a-stated-test-file-is-not-there",
  domainSlug: "domain/checks-system",
  claim:
    "One page states a test held in a file that is not there, which is exactly what the unbuilt page-property-has-its-file check refuses, so the ruling that check waits on has a live defect on one side of it rather than being a free choice between two amounts of work.",
  evidence:
    "Index-reading states `test: \"ts\"` and no `index-reading.module.test.ts` stands beside it. It is the only such page of the hundred and nine, and it answers to one existence check per stated file-kind property, which is the exact O(1) read per changed file that four-checks-await-a-ruling describes as within reach. The page it stands on is not a quiet one. Index-reading is required by checking, by calling and by move, so it is what the check runner, the command dispatcher and the only command reading the relation index all reach through. Two design lines lean on it directly: that what a check must know beyond the file it was handed it asks the index, and that the commands are found in the index. The module answering both asserts a test it does not have, and nothing reported that, which is the shape of the gap rather than an accident of it. This does not settle the ruling. Building the check on a stated breach and building it clean off a property schema are still the two routes, and Zero At Landing means this must be fixed before either lands. What it changes is the accounting: the finding reads as a choice where waiting costs nothing, and waiting has already cost one undetected page on the folder's most depended-on module. Recorded rather than fixed because writing the missing test is work in data-system and the ruling is the owner's.",
} as const satisfies Finding
