import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const committedKeepalive = {
  id: "01a0643b-c949-7ef9-a390-9c33451d3e59",
  type: "page-type/module",
  slug: "committed-keepalive",
  definition: "the stream a client is held on while a request is still being tried",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A committed response is a 200.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A committed response is sent as an event stream.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A committed response tells caches to keep nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A committed response is answered before the first attempt is made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One keepalive comment goes out before anything else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A keepalive comment goes out every 3500 milliseconds where no span is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A keepalive span of zero arms no heartbeat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hold is polled again every 2000 milliseconds where no span is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attempt finding no account is followed by a wait and another attempt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The observer slot is filled again before each wait.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A served status in the 200s is spliced through to the client.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A splice stops the heartbeat before the first upstream byte goes out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A served status outside the 200s becomes an sse error frame.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body of a served error is cancelled rather than sent on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The error type a frame names is read off the status by `committed-outcome`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attempt that rejects sends an `api_error` frame.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attempt that rejects ends the stream.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attempt that rejects releases the hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attempt that rejects stops the heartbeat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attempt that rejects is written about on the error seam.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A client that disconnects stops the heartbeat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A client that disconnects releases the hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A client that disconnects cancels the upstream reader being spliced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A heartbeat stopped by a disconnect re-arms itself never.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stream is closed once however many ends are reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hold is released once however many ends are reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transport row is written only where the caller names a place for that row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transport row names the span the request was held before its splice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transport row has the reason the pool was empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transport row is written once however many ends are reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An enqueue onto a closed stream closes the stream rather than throwing.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A caller hands in the attempt the hold is retrying.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A caller hands in the clock so a test needs no real time.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A caller hands in the sleep so a test needs no real wait.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A caller may hand in the timers so a test needs no real timer.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here chooses an account.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here forwards a request.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a token.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names the pipeline an attempt runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every line written here goes to the console rather than to a seam.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stream broken upstream reaches the splice as the error frame `retry` already wrote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hold is bounded by nothing but the client hanging up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The frames a splice sends on are counted nowhere in the transport row.",
    },
  ],
} as const satisfies Module
