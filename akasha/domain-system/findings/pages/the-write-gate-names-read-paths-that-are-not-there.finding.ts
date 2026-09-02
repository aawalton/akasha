import type { Finding } from "../finding.page-type.ts"

export const theWriteGateNamesReadPathsThatAreNotThere = {
  id: "01a06302-83de-78ab-aaad-d2fb56d76965",
  pageTypeSlug: "finding",
  slug: "the-write-gate-names-read-paths-that-are-not-there",
  domainSlug: "workspace-package/command-system",
  claim:
    "The write gate tells an agent to read files at paths where no file is. It names the seat and subagent property folders in the singular, and those folders were renamed to the plural. Running the exact command the gate prints answers that it names no file, so the gate's own remedy fails and the agent has to guess the spelling.",
  evidence:
    "A subagent landing a music command was refused for five unread files and given five read commands. `akasha/seat-system/subagent/subagent.page-type.ts`, `akasha/seat-system/subagent/properties/agent-id.text-property.ts`, `akasha/seat-system/subagent/properties/dispatched-as.text-property.ts`, `akasha/seat-system/seat/properties/assignment-slug.one-of-property.ts` and `akasha/seat-system/seat/properties/principal-seat-name.relation-property.ts` are all absent. The same files under `subagents/` and `seats/` are there. Earlier in the same session the singular `seat/properties/assignment-slug.one-of-property.ts` was read and recorded, so the folders were renamed while agents were working and what builds the gate's paths did not follow.",
} as const satisfies Finding
