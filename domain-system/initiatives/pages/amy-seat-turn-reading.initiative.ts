import type { Initiative } from "../initiative.page-type.ts"

export const amySeatTurnReading = {
  id: "01a06cce-038c-7380-902c-0e4da97349a1",
  pageTypeSlug: "initiative",
  slug: "amy-seat-turn-reading",
  domainSlug: "domain/code-editor",
  personaSlug: "amy",
  intents: [
    {
      statement: "A seat whose session has ended is drawn in the text color.",
      workingMemory:
        "Nothing ever stamps a seat stopped, because `turnStateOf` in turn-records returns null unconditionally, leaving the `stamped` branch of `readSeatTurn` dead. A seat holding no record at all already reads stopped through `!tookATurn`, which is why one seat of fourteen draws text today. No stub needs reviving: `seat-presence-read` answers whether the process a seat names is live, and agent-turn-state already wraps that reading.",
    },
    {
      statement: "A seat with a turn start still to come is drawn in blue.",
      workingMemory:
        "`compacting` reaches blue as of 12acdc5b, but a hook binds an agent only from its next spawn, so no running seat shows it yet. Of the other components, `running-task` is written by nothing across all fourteen seats, while `open-question` is written by three seats and is absent from TURN_PENDING_COMPONENTS, so it is read and dropped. One of those two is a real bug and which one is unknown.",
    },
    {
      statement: "Every component a seat's turn is read from is written by something.",
    },
    {
      statement: "Every value written beside a seat is read by something.",
    },
    {
      statement: "A seat's turn state is read from no stub.",
      workingMemory:
        "`turnStateOf`, `turnPendingSourceOf` and `turnEndReadingOf` in turn-records each return null unconditionally, and their setters do nothing. `workingOf` was the fourth of them and reads the transcript as of 3705f463.",
    },
    {
      statement: "A turn state that is a kind of another turn state is drawn under it.",
      workingMemory:
        "The hierarchy repair, putting idle-pending under idle. The work is kept at bbbbff89ae and can be cherry-picked once two defects already on seat-turn-state.page-type.ts are fixed.",
    },
    {
      statement: "A subagent's turn state is read from what the subagent is doing.",
      workingMemory:
        "Left until the seats are right, at Alan's direction. `subagentTurnOf` reads whether the page named for the subagent is there. The reading is to be cached uncommitted on the subagent record, as it now is on the seat.",
    },
  ],
  constraints: [
    "Working means a seat is mid-turn: given a prompt and not yet finished answering, including a long tool call with no request open.",
    "Stopped is drawn only where something has gone wrong, so stopped carries no color of its own.",
    "A compacting seat is not drawn yellow, and blue is allowed for one.",
    "The reading is cached uncommitted on the seat and subagent records.",
    "Alan approved the PreCompact and PostCompact hooks and no others.",
    "A run may write, the invariant that a run writes nothing having been dropped.",
    "A body is composed under a directory named for the session, because every seat shares /tmp.",
    "The order is stopped, then blue for seats, then subagents.",
    "Each piece is made clean and correct and performant before the next piece is taken up.",
  ],
} as const satisfies Initiative
