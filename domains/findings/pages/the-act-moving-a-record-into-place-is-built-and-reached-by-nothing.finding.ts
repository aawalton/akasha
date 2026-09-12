import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const theActMovingARecordIntoPlaceIsBuiltAndReachedByNothing = {
  id: "01a09522-2f78-79d4-a9c9-1b03d84eab85",
  type: "finding",
  slug: "the-act-moving-a-record-into-place-is-built-and-reached-by-nothing",
  domain: "domain/change",
  claim:
    "`change-mechanical-file-content/move-property-value` carries one value to another place in a list, whether that value is text or a record, naming it by a field it states and naming where it goes by the value already holding that place. No change agent reaches it, so no agent can call it. An agent putting a record anywhere but last therefore takes every record below the place out and puts them all back, at one act each way.",
  evidence:
    "The act is a 114-line page and 149 lines of code with its own test, at changes/mechanical/file-content/move/move-property-value/. `akasha change draft move-property-value` answers that the name is no change and lists the forty-seven that are; `changes/agent/file-content/change-agent-file-content.domain.ts` states sixteen parts and none is this one; no file outside the act's own folder names it. Four landings paid the cost while the act sat there: `d58af6e8115` twice, `f025240cea6` at depth ten twice, `a04a45cec55` at depth seven, `f72fa381f52` at depth ten. The cost is one remove and one add for each record below the place, and one add for the record itself. It is being paid now, by the migration carrying `taking` entries into `arguments`, on a list whose order the parser reads.",
} as const satisfies Finding
