import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sseErrorFrame = {
  id: "01a0622f-454f-7290-81e4-0dee69164263",
  type: "page-type/module",
  slug: "sse-error-frame",
  definition: "the bytes of an error event an Anthropic streaming reader accepts",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A frame is bytes rather than a string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A frame names its event `error`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A frame's whole JSON is on one `data` line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A frame ends with the blank line an event is closed by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The JSON is an object whose own type is `error`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The error type and message passed in are nested under the JSON's `error` key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The JSON is the envelope `anthropic-error-envelope` builds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A newline in a message is escaped into the JSON rather than ending the frame.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here chooses which error type a frame carries.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a frame to a stream.",
    },
  ],
} as const satisfies Module
