import type { Module } from "@akasha/code/module"

export const forward = {
  id: "01a062f9-d8f3-766c-9fde-c4ce5fec4856",
  pageTypeSlug: "module",
  type: "module",
  slug: "forward",
  definition: "one client request sent on to the Anthropic API and the response streamed back",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A request is sent to the Anthropic API at the path that request arrived on.",
    },
    {
      invariantKind: "departure",
      statement: "A request is sent with the query that request arrived with.",
    },
    {
      invariantKind: "departure",
      statement: "A request is sent with the method that request arrived with.",
    },
    {
      invariantKind: "departure",
      statement: "A request is sent with the body bytes the caller handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The headers sent upstream are the copy `proxy-headers` makes.",
    },
    {
      invariantKind: "departure",
      statement: "An access token handed in is sent as a bearer `authorization` header.",
    },
    {
      invariantKind: "departure",
      statement: "A request handed no access token has the `authorization` header the client sent.",
    },
    {
      invariantKind: "departure",
      statement:
        "A request with no authorization of either sort is sent with no authorization header.",
    },
    {
      invariantKind: "departure",
      statement: "An idle guard is armed on `/v1/messages`.",
    },
    {
      invariantKind: "departure",
      statement: "An idle guard is armed on `/v1/messages/count_tokens`.",
    },
    {
      invariantKind: "departure",
      statement: "A path neither messages API answers is sent unguarded.",
    },
    {
      invariantKind: "departure",
      statement: "An idle span at zero or below leaves a request unguarded.",
    },
    {
      invariantKind: "departure",
      statement: "An observer is built where a log file is handed in.",
    },
    {
      invariantKind: "departure",
      statement: "An observer is built where the slot has an end.",
    },
    {
      invariantKind: "departure",
      statement: "A slot with no end beside no log file is left with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An observer that is built is put in the slot the caller handed in.",
    },
    {
      invariantKind: "departure",
      statement: "An observer already in the slot is ended before the new observer lands.",
    },
    {
      invariantKind: "departure",
      statement: "A replaced observer is ended as a client disconnect.",
    },
    {
      invariantKind: "departure",
      statement: "The upstream status reaches the observer.",
    },
    {
      invariantKind: "departure",
      statement: "The observer's start is stamped before the upstream fetch opens.",
    },
    {
      invariantKind: "departure",
      statement: "A response the upstream gives no body for ends its observer at once.",
    },
    {
      invariantKind: "departure",
      statement: "A keepalive is armed only where the upstream content type has the SSE type.",
    },
    {
      invariantKind: "departure",
      statement: "A keepalive is armed only where the downstream keepalive span is above zero.",
    },
    {
      invariantKind: "departure",
      statement: "An SSE error frame is served only where the upstream content type has that type.",
    },
    {
      invariantKind: "departure",
      statement: "The response has the upstream status.",
    },
    {
      invariantKind: "departure",
      statement: "The response has the upstream status text.",
    },
    {
      invariantKind: "departure",
      statement: "The response headers are the copy `proxy-headers` makes.",
    },
    {
      invariantKind: "departure",
      statement: "The file a transport row lands beside is handed in rather than a directory.",
    },
    {
      invariantKind: "departure",
      statement: "The clock is handed in so a test needs no real time.",
    },
    {
      invariantKind: "departure",
      statement: "The timers are handed in so a test needs no wait.",
    },
    {
      invariantKind: "departure",
      statement: "The fetch is handed in so a test needs no network.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands the whole request body in as one buffer.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands one slot to every attempt one client request is served by.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller arms the end on the observer left in the slot.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in the path of a page file a transport row lands beside.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here resolves a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a transport row.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here retries a request.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here chooses the account a request is sent under.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here has a clock the caller cannot replace.",
    },
    {
      invariantKind: "gap",
      statement: "An upstream fetch that throws before a response arrives reaches no observer.",
    },
    {
      invariantKind: "gap",
      statement: "A fetch that throws leaves the slot with the observer of the attempt before.",
    },
    {
      invariantKind: "gap",
      statement: "The upstream base is written here rather than handed in.",
    },
    {
      invariantKind: "gap",
      statement: "The two guarded paths are written here rather than handed in.",
    },
    {
      invariantKind: "gap",
      statement: "A keepalive emitter is armed on the real timers.",
    },
    {
      invariantKind: "gap",
      statement: "The observer's start covers the upstream connect as well as the stream.",
    },
    {
      invariantKind: "gap",
      statement: "An observer is left in the slot after the response is handed back.",
    },
    {
      invariantKind: "gap",
      statement: "A request body reaching upstream is a whole buffer rather than a stream.",
    },
  ],
} as const satisfies Module
