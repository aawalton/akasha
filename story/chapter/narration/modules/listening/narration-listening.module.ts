import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const narrationListening = {
  id: "01a10dd0-f139-7f90-93df-c7587b8ac438",
  type: "page-type/module",
  slug: "narration-listening",
  definition:
    "what the player does around the audio: reading answers, Now Playing and marking read",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Narration plays at one of seven speeds from 0.8 to 2, and a tap takes the next.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A faster speed keeps the narrator's pitch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter already read is never marked read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Marking a chapter read that the server refuses is tried again, up to five times.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each refusal of marking a chapter read is reported to the web server's log.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Progress is written to the chapter's own read progress, as reading writes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Now Playing names the chapter playing, and the story it is of as the artist.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lock screen's previous and next go to the start of a chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "In a browser, the lock screen's play and pause reach the audio itself rather than this code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "In the app, the lock screen's play and pause reach this code through the app.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A toggle from the lock screen pauses audio that is playing and plays any other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each lock screen command is reported, and so is a play the audio refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A play the audio refuses leaves the narration open rather than failed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A moment of silence played on the tap opens the audio before the stream arrives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Handing the stream to the audio element is one function for every browser.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narration asks the phone to keep playing it in the background.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "hls.js holds ten minutes of a narration past the playhead.",
    },
  ],
  updatedAt: "2026-10-10T15:37:33.071Z",
  createdAt: "2026-10-05T20:45:59.481Z",
} as const satisfies Module
