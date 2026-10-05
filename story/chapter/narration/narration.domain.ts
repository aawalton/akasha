import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const narration = {
  id: "01a10dba-92d8-79bd-b65d-435b1af749d5",
  type: "page-type/domain",
  slug: "narration",
  definition: "a chapter read aloud to Alan",
  parts: ["module/window-speaking", "module/narration-segments", "module/narration-telling"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is narrated when Alan asks for it rather than ahead of time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every chapter page type is narrated the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One function turns a chapter into the segments narration speaks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A segment ends on a sentence, and the first segment is short so playing starts soon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window in a chapter is spoken as plain sentences rather than skipped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each kind of window is spoken by a fixed rule, and a kind with no rule is spoken by a general one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Narration speaks in the af_heart voice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Narration keeps playing on Alan's phone while the phone is locked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The phone's own audio player plays narration from a growing HLS playlist.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The speech workload encodes a narration as one unbroken AAC stream with no gap between segments.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The audio of a narration is held in the speech workload's memory only while the narration lasts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The web server passes a narration through to Alan and makes no audio itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Narration keeps playing when Alan leaves the chapter's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Narration shows on the lock screen through Now Playing rather than through a Live Activity.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter whose narration ends is marked read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The next chapter of the story follows in the same stream.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narration that fails says so rather than going quiet.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Narration has no offline mode.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No chapter is narrated on the phone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Narration has no second way of playing to fall back on.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "iOS refuses work on the GPU from an app in the background.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A phone in the background starts no new audio element.",
    },
  ],
} as const satisfies Domain
