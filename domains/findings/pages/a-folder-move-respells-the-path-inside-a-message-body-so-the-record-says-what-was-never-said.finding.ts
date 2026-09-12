import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aFolderMoveRespellsThePathInsideAMessageBodySoTheRecordSaysWhatWasNeverSaid = {
  id: "01a095e9-b047-7ef0-991d-4ac9167cd5a9",
  type: "finding",
  slug: "a-folder-move-respells-the-path-inside-a-message-body-so-the-record-says-what-was-never-said",
  domain: "domain/change",
  claim:
    "A folder move respells the path inside a message's body, so a record of what an audit said becomes a record of what the audit never said.",
  evidence:
    "`move-folder` reads every path in the index through `spellersIn` and repoints each file whose text holds the moved folder's name, `move-folder.change-mechanical-folder.code.ts:125`. A message's `body` is text somebody wrote, and it is respelled the same way. Drafting a move of `agents/claude-code/session/jsonl` rewrote `agents/messaging/messages/pages/message-09d8897d3fee.message.ts`, whose body records an audit at `58eb1e896c1a` refusing that folder, into one naming `agents/claude-code/session/modules/session-jsonl`, a path that folder did not have at that commit.",
} as const satisfies Finding
