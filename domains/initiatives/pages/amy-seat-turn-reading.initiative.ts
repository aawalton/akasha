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
        "21 keys and record fields sit beside a seat and 17 are read. `context-replaced` and `turn-pending`'s per-field `at` are dead and are being cut. Two are held for Alan, each removing a feature rather than duplication: `rotated-session-uuid`, whose removal takes session rotation with it, `watchSeatRotation` having polled every second since it was written and never once able to fire; and `reexec-asked`, whose only writer has no caller.",
    },
    {
      statement: "A turn state is drawn within the time the code-editor domain allows.",
      workingMemory:
        "Met at the service and measured at a5d1fc02: an append reaches the sidecar in 41ms median and 44ms at worst, down from 267ms, for 4.8% of a core against 3.6%. A transcript settles for 25ms of its own where a store keeps 250ms. What is left is the panel: its 25ms settle and 30ms read are arithmetic, so the 100ms the domain allows is unmeasured end to end.",
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
    "The turn end read went at e39c8f28, to be rebuilt rather than repaired, its own page having said nothing invoked it.",
    "A turn state that is a kind of another is named by that other rather than by the page type, which drew it at a root.",
    "The write gate refuses a page no parent names, and never a page naming a part that is not there.",
    "A subagent that finishes hands its drafted patch up to the seat that spawned it.",
    "What is owed in reads is owed per seat, so a subagent paying them buys the seat nothing.",
    "A record beside a seat declares every field it carries, the unknown-key guard reaching only the top level.",
    "A reader keeping a cursor needs that cursor cleared when its rules change, because a landing does not reach what was already read past.",
  ],
} as const satisfies Initiative
