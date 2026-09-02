import type { Module } from "@akasha/code-system/module"

export const sseErrorFrame = {
  id: "01a0622f-454f-7290-81e4-0dee69164263",
  pageTypeSlug: "module",
  slug: "sse-error-frame",
  definition: "the bytes of one error event an Anthropic streaming reader accepts",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A frame is bytes rather than a string.",
    },
    {
      invariantKind: "departure",
      statement: "A frame names its event `error`.",
    },
    {
      invariantKind: "departure",
      statement: "A frame's whole JSON is on one `data` line.",
    },
    {
      invariantKind: "departure",
      statement: "A frame ends with the blank line an event is closed by.",
    },
    {
      invariantKind: "departure",
      statement: "The JSON is an object whose own type is `error`.",
    },
    {
      invariantKind: "departure",
      statement: "The error type and message passed in are nested under the JSON's `error` key.",
    },
    {
      invariantKind: "departure",
      statement: "A newline in a message is escaped into the JSON rather than ending the frame.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here chooses which error type a frame carries.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a frame to a stream.",
    },
  ],
} as const satisfies Module
