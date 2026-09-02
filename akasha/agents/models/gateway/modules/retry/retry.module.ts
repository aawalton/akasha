import type { Module } from "@akasha/code-system/module"

export const retry = {
  id: "01a06255-4c6e-7515-882a-618e9bffc960",
  pageTypeSlug: "module",
  slug: "retry",
  definition: "an upstream connection break either side of the first chunk of a response",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A transient transport error is a TypeError whose message holds a known phrase.",
    },
    {
      invariantKind: "departure",
      statement: "An idle timeout abort is transient where the message holds the idle token.",
    },
    {
      invariantKind: "departure",
      statement: "A DOMException carrying no idle timeout token is not transient.",
    },
    {
      invariantKind: "departure",
      statement: "A retry happens only for a transient transport error.",
    },
    {
      invariantKind: "departure",
      statement: "The backoff list holds one wait for each retry.",
    },
    {
      invariantKind: "departure",
      statement: "An error surviving the last backoff wait is rethrown to the caller.",
    },
    {
      invariantKind: "constraint",
      statement: "An operation handed to the retry must be safe to run more than once.",
    },
    {
      invariantKind: "departure",
      statement: "The sleep is handed in so a test needs no wait.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here retries on an upstream status.",
    },
    {
      invariantKind: "departure",
      statement:
        "A bare error code matches only where the message holds that code as a whole word.",
    },
    {
      invariantKind: "departure",
      statement: "A TypeError message holding `instanceof` is not a transient transport error.",
    },
    {
      invariantKind: "departure",
      statement: "The first chunk of an upstream body is read before the wrapper is handed back.",
    },
    {
      invariantKind: "departure",
      statement: "The wrapper copies each upstream chunk into a second ReadableStream.",
    },
    {
      invariantKind: "departure",
      statement: "The re-wrap costs 87% of the streaming CPU a live gateway spends.",
    },
    {
      invariantKind: "gap",
      statement: "Downstream backpressure never reaches the upstream reader.",
    },
    {
      invariantKind: "gap",
      statement: "A slow downstream reader grows the wrapper's queue to the whole upstream body.",
    },
    {
      invariantKind: "departure",
      statement: "A null upstream body stops the idle guard.",
    },
    {
      invariantKind: "departure",
      statement: "A failure reading the first chunk is thrown to the caller rather than framed.",
    },
    {
      invariantKind: "departure",
      statement: "A failure reading the first chunk reaches the observer as an upstream error.",
    },
    {
      invariantKind: "departure",
      statement: "A failure reading the first chunk stops the idle guard.",
    },
    {
      invariantKind: "departure",
      statement: "Each chunk that arrives resets the idle guard.",
    },
    {
      invariantKind: "departure",
      statement: "Each chunk that arrives resets the keepalive emitter.",
    },
    {
      invariantKind: "departure",
      statement: "A keepalive emitter is built only where the keepalive interval is above zero.",
    },
    {
      invariantKind: "departure",
      statement: "A keepalive comment goes out only where the last byte sent was a newline.",
    },
    {
      invariantKind: "departure",
      statement: "Each path the wrapped stream ends by stops the keepalive emitter.",
    },
    {
      invariantKind: "departure",
      statement: "Each path the wrapped stream ends by stops the idle guard.",
    },
    {
      invariantKind: "departure",
      statement: "Each path the wrapped stream ends by releases the upstream reader.",
    },
    {
      invariantKind: "departure",
      statement: "A downstream cancel is passed on to the upstream reader.",
    },
    {
      invariantKind: "departure",
      statement: "The cancel is the last word a cancelled stream gives the observer.",
    },
    {
      invariantKind: "gap",
      statement: "A cancel while a read is pending sends the pump's close down the error path.",
    },
    {
      invariantKind: "departure",
      statement:
        "A mid-stream failure is served as an SSE error frame only where the caller asked.",
    },
    {
      invariantKind: "departure",
      statement: "A served frame is opened with a newline where the last byte sent was no newline.",
    },
    {
      invariantKind: "departure",
      statement: "A mid-stream failure the caller wants no frame for errors the wrapped stream.",
    },
    {
      invariantKind: "departure",
      statement: "A stream closed by a served error frame reports no completion.",
    },
    {
      invariantKind: "departure",
      statement: "An observer callback that throws is swallowed before the throw reaches the pump.",
    },
    {
      invariantKind: "departure",
      statement: "The clock is handed in so a test needs no real time.",
    },
  ],
} as const satisfies Module
