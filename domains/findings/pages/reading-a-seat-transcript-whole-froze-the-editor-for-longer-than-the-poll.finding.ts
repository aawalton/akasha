import type { Finding } from "../finding.page-type.ts"

export const readingASeatTranscriptWholeFrozeTheEditorForLongerThanThePoll = {
  id: "01a06811-01d3-7005-9b69-8da1c638490c",
  pageTypeSlug: "finding",
  slug: "reading-a-seat-transcript-whole-froze-the-editor-for-longer-than-the-poll",
  domainSlug: "workspace-package/editor-extension",
  claim:
    "Reading a seat's transcript whole on every poll cost, on this fleet at load 30-37, up to 1,799 MB read and 9,507 ms of held event loop for one tick against a one-second poll. Wall time and loop-held time agreed to within 3 ms, so the whole of it was synchronous, and a blocked extension host repaints nothing: every panel and the status line froze together. This is what the appended-bytes fold in `transcript-reading` stands against.",
  evidence:
    "Measured per tick, seat by seat, at fleet load 30-37:\\n\\n    seat    jsonl      subagent files   bytes read   event loop held\\n    thea     3.5 MB      16              20 MB          48-145 ms\\n    dalla   10.5 MB      25              66 MB         273-528 ms\\n    aine    17.2 MB     102             200 MB        448-1311 ms\\n    ember   60.6 MB     416           1,079 MB       2979-7389 ms\\n    amy    108.6 MB    1189           1,799 MB       5727-9507 ms\\n\\nAmy's seat held the host for longer than the poll interval nine times over. The subagent transcripts beneath a seat were read twice in one tick rather than once, because the settled slice and the tail each built their own `subagentEntries`; both slices are now drawn against one read, which is an invariant on `transcript-view`.\\n\\nThe fold is held in memory rather than on disk. It is the drawn corpus, far larger than the cursor book at `~/.cache/ops/agent-tree-cursors.json` that the agent tree's subagent reader keeps, so it adds no writer to that book and no contention on it.\\n\\nThe size test the fold replaced watched only the seat's own file, so it drew nothing when a subagent grew and re-read everything when it did.",
} as const satisfies Finding
