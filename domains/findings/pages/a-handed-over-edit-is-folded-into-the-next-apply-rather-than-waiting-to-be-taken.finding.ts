import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aHandedOverEditIsFoldedIntoTheNextApplyRatherThanWaitingToBeTaken = {
  id: "01a08df1-4203-71ef-9f1f-9948e896c86c",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-handed-over-edit-is-folded-into-the-next-apply-rather-than-waiting-to-be-taken",
  domain: "domain/change",
  claim:
    "An edit a finished subagent hands over is folded into the next apply any agent under that seat makes, so a landing carries files nobody meant it to carry, under a message describing something else.",
  evidence:
    "`f478cc03f30` says `every body under seat-system names a file from the root rather than by a relative path` and carries 624 files under `temper` and 2 under `code-system`, and none under `seat-system`. The agent that applied it had verified beforehand that every path it drafted was under `seat-system`, and its own edits did not land. Two agents saw the same shape: the draft that printed `1 subagent(s) handed edits over` was the draft whose edits moved from that agent's own file to `seat-system/seats/pages/aranya/aranya.seat.edits.uncommitted.jsonl`, and `akasha change list` then held 1762 entries in the block the apply lands, of which 2 were that agent's own. The same listing named a further 1709 edits as `handed over` under `akasha change take`, so one handover waited to be taken while another was folded in without being named.",
} as const satisfies Finding
