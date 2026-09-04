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
        "The turn-working record carries activeTurn, scannedTo, openShells and openAgents, and each is read. The pending record carries four components after owed went at a446b230. Nothing has audited the rest of what sits beside a seat.",
    },
    {
      statement: "A seat's turn state is read from no stub.",
      workingMemory:
        "`turnStateOf`, `turnPendingSourceOf` and `turnEndReadingOf` in turn-records each return null unconditionally, and their setters do nothing. `workingOf` was the fourth and reads the transcript as of 3705f463. The fifth was `readOwed`, taken away at a446b230 rather than filled, because `decideOwed` returned the owed verdict for no input it admits. Three remain.",
    },
    {
      statement: "A turn state is drawn within the time the code-editor domain allows.",
      workingMemory:
        "Measured at 547c20b2: an append reaches the seat's sidecar in 267ms median over four pairs, and the panel adds a 25ms debounce and an 11ms read, so green lands near 300ms against a budget of 100ms. Tightening the 250ms settle was refused: the service writes into a folder it watches, so it re-triggers itself, and that loop already costs 3.6% of a core. A transcript watch in the panel reaches 36ms, and wants transcript paths the extension cannot reach today.",
    },
    {
      statement: "A turn state that is a kind of another turn state is drawn under it.",
      workingMemory:
        "The hierarchy repair, putting idle-pending under idle. The work is kept at bbbbff89ae and can be cherry-picked once two defects already on seat-turn-state.page-type.ts are fixed.",
    },
    {
      statement: "A subagent's turn state is read from what the subagent is doing.",
      workingMemory:
        "Left until the seats are right, at Alan's direction. The transcript now names every live subagent by id, paired from an async launch to the notification naming it, so the page-presence reading `subagentTurnOf` uses is no longer the only source. Page presence leaked: athena carried seven pages against two live agents.",
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
    "One implementation reads what a writer must have read: context-system/warranting, declared-seat-reading having been ablated at 9bc44a50.",
    "A reader keeping a cursor needs that cursor cleared when its rules change, because a landing does not reach what was already read past.",
  ],
} as const satisfies Initiative
