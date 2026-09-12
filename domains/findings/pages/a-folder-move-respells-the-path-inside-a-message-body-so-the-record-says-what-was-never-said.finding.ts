import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aFolderMoveRespellsThePathInsideAMessageBodySoTheRecordSaysWhatWasNeverSaid = {
  id: "01a095e9-b047-7ef0-991d-4ac9167cd5a9",
  type: "finding",
  slug: "a-folder-move-respells-the-path-inside-a-message-body-so-the-record-says-what-was-never-said",
  domain: "domain/change",
  claim:
    "A folder move respells the path inside a message's body, so a record of what an audit said becomes a record of what the audit never said.",
  evidence:
    "`move-folder` reads every path in the index through `spellersIn` and repoints each file whose text holds the moved folder's name, `move-folder.change-mechanical-folder.code.ts:125`. A message's `body` is text somebody wrote, and it is respelled the same way. Drafting a move of `agents/claude-code/session/jsonl` rewrote `agents/messaging/messages/pages/message-09d8897d3fee.message.ts`, whose body records an audit at `58eb1e896c1a` refusing that folder, into one naming `agents/claude-code/session/modules/session-jsonl`, a path that folder did not have at that commit.\n\nThe record was measured by one check and is held by another. That message's body is the audit's own words, and what they ask for is a folder named `session-jsonl-schema` rather than `jsonl-schema` — what `session-jsonl-schema` calls its folder. They name no `modules` level. The check that wrote those words is `folder-matches-a-shape`. The check refusing the rename now is `module-sits-under-a-modules-folder`, which wants a `modules` segment in the folder chain and judges only a path a change writes, so it is invisible until the file moves. Satisfying the second check is what nests the folder, and nesting it is what respells this record. Three folders named in that message are unmoved for this reason: `agents/claude-code/launch-args`, `agents/claude-code/session/jsonl` and `agents/claude-code/session/jsonl-schema`.",
} as const satisfies Finding
