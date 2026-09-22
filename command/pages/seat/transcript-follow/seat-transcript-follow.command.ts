import type { Command } from "akasha/command/command.page-type.types.ts"

export const seatTranscriptFollow = {
  id: "01a0c96f-7bbd-783d-b659-9c9f6d4e6e12",
  type: "page-type/command",
  slug: "seat-transcript-follow",
  definition: "the command answering a seat's next exchange, waiting until the transcript has it",
  code: "ts",
  test: "ts",
  maxWallSeconds: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer is a JSON object naming an `exchanges` list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry names the turn's uuid, what the person said and what was answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An exchange is a person's turn together with the text the agent wrote before the person's next turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A person's turn is a record typed `user` whose message content is text rather than a list of blocks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person's turn is a record whose `origin.kind` is `human`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record whose `origin.kind` is other than `human` is no turn from the person.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record with no `origin` at all is no turn from the person.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A task notification, a peer and a channel are the other kinds a transcript holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record marked as a sidechain is part of no exchange.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thinking block and a tool call are no part of what the agent wrote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn the agent did not reply to is answered with nothing replied.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An exchange is closed by the person's next turn and at no other time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The agent's text across every turn before the person speaks again joins into one reply.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The last exchange is open, and answered nowhere until the person's next turn is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reply the person's next turn cuts short is answered as far as that reply got.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming `--after` is answered the exchanges past the turn that uuid names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A uuid no turn in the transcript names takes nothing out of the answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call finding no exchange waits rather than answering an empty list at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The wait watches the directory the transcript is in rather than the file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change is let settle for a few tens of milliseconds before the next scan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line written only partway is left for the scan after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sweep each second backs that watch up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A transcript shorter than it was at the scan before is scanned again from its first byte.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript is written over before a resume, which is why that guard is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat's transcript path is worked out afresh at every scan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is pointed at another transcript file when that seat starts again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wait that elapses is answered an empty list rather than a refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat with no transcript beside its page is refused, and the refusal says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat name akasha files nothing under is a fault of the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's transcript is taken from the values kept beside that seat's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scan takes the path it scans as a function rather than reaching for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The wait is the caller's, so this page sets no ceiling on the wall clock.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run writes nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here speaks into the conversation it follows.",
    },
  ],
  name: "transcript-follow",
  arguments: [
    { argument: "argument/seat", required: true },
    { argument: "argument/after-exchange" },
    { argument: "argument/wait-seconds" },
  ],
} as const satisfies Command
