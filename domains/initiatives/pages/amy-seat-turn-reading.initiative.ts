import type { Initiative } from "../initiative.page-type.ts"

export const amySeatTurnReading = {
  id: "01a06cce-038c-7380-902c-0e4da97349a1",
  pageTypeSlug: "initiative",
  slug: "amy-seat-turn-reading",
  domainSlug: "domain/code-editor",
  personaSlug: "amy",
  intents: [
    {
      statement: "Every value written beside a seat is read by something.",
      workingMemory:
        "Audited at a5d1fc02: 21 keys and record fields sit beside a seat, and 17 are read. Dead: `context-replaced`, which nothing writes and nothing reads, its three named consumers all gone; `rotated-session-uuid`, whose `keepRotated` has no caller; and `turn-pending`'s per-field `at`, which `bare()` drops on write. `scannedTo` is round-trip only but load-bearing, deciding which bytes are scanned.",
    },
    {
      statement: "A seat's turn state is read from no stub.",
      workingMemory:
        "`turnPendingSourceOf` is a projection of the pending record that still exists, and its branch is unreachable because the pending branch answers first. `turnStateOf` is dead: `stampIn` maps null to idle, all three callers hand it idle, and the only other value lost its writer at ab6bac1225. `turnEndReadingOf` is the one no reader reproduces, and filling it wants a Stop hook.",
    },
    {
      statement: "A turn state is drawn within the time the code-editor domain allows.",
      workingMemory:
        "Met at the service, measured at a5d1fc02: a transcript settles for 25ms of its own while a store keeps 250ms, the service writing into no transcript folder and so unable to trigger itself there. An append reaches the sidecar in 41ms median and 44ms at worst, down from 267ms, for 4.8% of a core against 3.6%. The panel adds a 25ms settle and a 30ms read, which is arithmetic rather than measured.",
    },
    {
      statement: "A turn state that is a kind of another turn state is drawn under it.",
      workingMemory:
        "One line blocks it: seat-turn-state.page-type.ts names `seat-turn-state/idle-pending` among its own parts, so two pages name it, and `domain-is-named-by-a-parent` refuses while `panel-domains` draws it at a root. Take that line away, then put bbbbff89ae back, one line into idle.seat-turn-state.ts, which applies byte for byte. The note of two defects was stale.",
    },
  ],
  constraints: [
    "Working means a seat is mid-turn: given a prompt and not yet finished answering, including a long tool call with no request open.",
    "Stopped is drawn only where something has gone wrong, so stopped carries no color of its own.",
    "A compacting seat is not drawn yellow, and blue is allowed for one.",
    "Green takes priority over blue.",
    "A live background command and a live subagent are kept apart in the data.",
    "The reading is cached uncommitted on the seat and subagent records.",
    "Alan approved the PreCompact and PostCompact hooks and no others.",
    "A run may write, the invariant that a run writes nothing having been dropped.",
    "A body is composed under a directory named for the session, because every seat shares /tmp.",
    "Each piece is made clean and correct and performant before the next piece is taken up.",
    "The word owed is settled: three meanings went from seat-system at a446b230, and the orphan on Outcome went at 700957ae. What is left is Warrant.owed in context-system, which is the live one.",
    "One implementation reads what a writer must have read: context/modules/warranting, declared-seat-reading having been ablated at 9bc44a50.",
    "A subagent's turn state is read in editor-extension/subagent-core, which folds that subagent's own transcript.",
    "The akasha reading of a subagent turn went at 54584c35, no id carrying a double hyphen ever reaching it.",
    "A record beside a seat declares every field it carries, the unknown-key guard reaching only the top level.",
    "A reader keeping a cursor needs that cursor cleared when its rules change, because a landing does not reach what was already read past.",
  ],
} as const satisfies Initiative
