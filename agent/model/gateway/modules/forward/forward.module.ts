import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const forward = {
  id: "01a062f9-d8f3-766c-9fde-c4ce5fec4856",
  type: "module",
  slug: "forward",
  definition: "one client request sent on to a provider and the response streamed back",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request is sent to the base handed in at the path that request arrived on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller handing in no base at all has the request sent to Anthropic.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An upstream handed in with one request carries the base and header that request takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An upstream handed in is sent with its own header alone and no bearer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request is sent with the query that request arrived with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request is sent with the method that request arrived with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request is sent with the body bytes the caller handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The headers sent upstream are the copy `proxy-headers` makes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An access token handed in is sent as a bearer `authorization` header.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request handed no access token has the `authorization` header the client sent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A request with no authorization of either sort is sent with no authorization header.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An idle guard is armed on `/v1/messages`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An idle guard is armed on `/v1/messages/count_tokens`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path neither messages API answers is sent unguarded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An idle span at zero or below leaves a request unguarded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An observer is built where a log file is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An observer is built where the slot has an end.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slot with no end beside no log file is left with nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An observer that is built is put in the slot the caller handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An observer already in the slot is ended before the new observer lands.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A replaced observer is ended as a client disconnect.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The upstream status reaches the observer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The observer's start is stamped before the upstream fetch opens.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A response the upstream gives no body for ends its observer at once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A keepalive is armed only where the upstream content type has the SSE type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A keepalive is armed only where the downstream keepalive span is above zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An SSE error frame is served only where the upstream content type has that type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The response has the upstream status.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The response has the upstream status text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The response headers are the copy `proxy-headers` makes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file a transport row lands beside is handed in rather than a directory.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The clock is handed in so a test needs no real time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The timers are handed in so a test needs no wait.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fetch is handed in so a test needs no network.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller hands the whole request body in as one buffer.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller hands one slot to every attempt one client request is served by.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller arms the end on the observer left in the slot.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller hands in the path of a page file a transport row lands beside.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here resolves a page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a transport row.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here retries a request.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here chooses the account a request is sent under.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here has a clock the caller cannot replace.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "An upstream fetch that throws before a response arrives reaches no observer.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A fetch that throws leaves the slot with the observer of the attempt before.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Anthropic's own base is written here as the base a caller may leave unsaid.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The two guarded paths are written here rather than handed in.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A keepalive emitter is armed on the real timers.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The observer's start covers the upstream connect as well as the stream.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "An observer is left in the slot after the response is handed back.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A request body reaching upstream is a whole buffer rather than a stream.",
    },
  ],
} as const satisfies Module
