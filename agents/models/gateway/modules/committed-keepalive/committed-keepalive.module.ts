import type { Module } from "@akasha/code-system/module"

export const committedKeepalive = {
  id: "01a0643b-c949-7ef9-a390-9c33451d3e59",
  pageTypeSlug: "module",
  slug: "committed-keepalive",
  definition: "the stream a client is held on while a request is still being tried",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A committed response is a 200.",
    },
    {
      invariantKind: "departure",
      statement: "A committed response is sent as an event stream.",
    },
    {
      invariantKind: "departure",
      statement: "A committed response tells caches to keep nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A committed response is answered before the first attempt is made.",
    },
    {
      invariantKind: "departure",
      statement: "One keepalive comment goes out before anything else.",
    },
    {
      invariantKind: "departure",
      statement: "A keepalive comment goes out every 3500 milliseconds where no span is named.",
    },
    {
      invariantKind: "departure",
      statement: "A keepalive span of zero arms no heartbeat.",
    },
    {
      invariantKind: "departure",
      statement: "The hold is polled again every 2000 milliseconds where no span is named.",
    },
    {
      invariantKind: "departure",
      statement: "An attempt finding no account is followed by a wait and another attempt.",
    },
    {
      invariantKind: "departure",
      statement: "The observer slot is filled again before each wait.",
    },
    {
      invariantKind: "departure",
      statement: "A served status in the 200s is spliced through to the client.",
    },
    {
      invariantKind: "departure",
      statement: "A splice stops the heartbeat before the first upstream byte goes out.",
    },
    {
      invariantKind: "departure",
      statement: "A served status outside the 200s becomes an sse error frame.",
    },
    {
      invariantKind: "departure",
      statement: "The body of a served error is cancelled rather than sent on.",
    },
    {
      invariantKind: "departure",
      statement: "The error type a frame names is read off the status by `committed-outcome`.",
    },
    {
      invariantKind: "departure",
      statement: "An attempt that rejects sends an `api_error` frame.",
    },
    {
      invariantKind: "departure",
      statement: "An attempt that rejects ends the stream.",
    },
    {
      invariantKind: "departure",
      statement: "An attempt that rejects releases the hold.",
    },
    {
      invariantKind: "departure",
      statement: "An attempt that rejects stops the heartbeat.",
    },
    {
      invariantKind: "departure",
      statement: "An attempt that rejects is written about on the error seam.",
    },
    {
      invariantKind: "departure",
      statement: "A client that disconnects stops the heartbeat.",
    },
    {
      invariantKind: "departure",
      statement: "A client that disconnects releases the hold.",
    },
    {
      invariantKind: "departure",
      statement: "A client that disconnects cancels the upstream reader being spliced.",
    },
    {
      invariantKind: "departure",
      statement: "A heartbeat stopped by a disconnect re-arms itself never.",
    },
    {
      invariantKind: "departure",
      statement: "The stream is closed once however many ends are reached.",
    },
    {
      invariantKind: "departure",
      statement: "The hold is released once however many ends are reached.",
    },
    {
      invariantKind: "departure",
      statement: "A transport row is written only where the caller names a place for that row.",
    },
    {
      invariantKind: "departure",
      statement: "A transport row names the span the request was held before its splice.",
    },
    {
      invariantKind: "departure",
      statement: "A transport row carries the reason the pool was empty.",
    },
    {
      invariantKind: "departure",
      statement: "A transport row is written once however many ends are reached.",
    },
    {
      invariantKind: "departure",
      statement: "An enqueue onto a closed stream closes the stream rather than throwing.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in the attempt the hold is retrying.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in the clock so a test needs no real time.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in the sleep so a test needs no real wait.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller may hand in the timers so a test needs no real timer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here chooses an account.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here forwards a request.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a token.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names the pipeline an attempt runs.",
    },
    {
      invariantKind: "gap",
      statement:
        "`tools/lib/model-gateway/committed-keepalive.ts` names the pipeline rather than taking one.",
    },
    {
      invariantKind: "gap",
      statement: "`tools/lib/model-gateway/committed-keepalive.ts` reads the clock directly.",
    },
    {
      invariantKind: "gap",
      statement: "Every line written here goes to the console rather than to a seam.",
    },
    {
      invariantKind: "gap",
      statement: "A splice that throws part-way sends no frame saying the stream broke.",
    },
    {
      invariantKind: "gap",
      statement: "A hold is bounded by nothing but the client hanging up.",
    },
    {
      invariantKind: "gap",
      statement: "The frames a splice sends on are counted nowhere in the transport row.",
    },
  ],
} as const satisfies Module
