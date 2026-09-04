import type { Module } from "@akasha/code-system/module"

export const proxyServing = {
  id: "01a06421-4b73-741a-990a-c82a314d3fe8",
  pageTypeSlug: "module",
  slug: "proxy-serving",
  definition: "a gateway serving from its start to its stop",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A HEAD of the root path is answered 200 with no body.",
    },
    {
      invariantKind: "departure",
      statement: "A GET of `/healthz` is answered 200 with the body `ok`.",
    },
    {
      invariantKind: "departure",
      statement: "A GET of `/inflight` is answered the count of requests in flight.",
    },
    {
      invariantKind: "departure",
      statement: "A GET of `/inflight` is answered what the hold registry counts.",
    },
    {
      invariantKind: "departure",
      statement: "A GET of `/rc-status` is answered the count of remote-control connections.",
    },
    {
      invariantKind: "departure",
      statement: "A POST of `/v1/messages` is handed to the message handler.",
    },
    {
      invariantKind: "departure",
      statement: "A POST of `/v1/messages/count_tokens` is handed to the message handler.",
    },
    {
      invariantKind: "departure",
      statement: "A path no route here names is forwarded upstream.",
    },
    {
      invariantKind: "departure",
      statement: "A method a route does not name is forwarded upstream.",
    },
    {
      invariantKind: "departure",
      statement: "Every request is written about before a route is chosen.",
    },
    {
      invariantKind: "departure",
      statement: "The line written for a request says whether an authorization header arrived.",
    },
    {
      invariantKind: "departure",
      statement: "A request reaching the message handler is given no server timeout.",
    },
    {
      invariantKind: "departure",
      statement: "A request reaching the message handler raises the in-flight count.",
    },
    {
      invariantKind: "departure",
      statement: "A response carrying a body arms the observer to lower the in-flight count.",
    },
    {
      invariantKind: "departure",
      statement:
        "A response carrying no body lowers the in-flight count before that answer goes out.",
    },
    {
      invariantKind: "departure",
      statement: "A response leaving the slot empty lowers the in-flight count.",
    },
    {
      invariantKind: "departure",
      statement: "A slot holding an observer nothing armed is emptied.",
    },
    {
      invariantKind: "departure",
      statement: "A client that aborts ends the observer as a client disconnect.",
    },
    {
      invariantKind: "departure",
      statement: "A client that aborts lowers the in-flight count.",
    },
    {
      invariantKind: "departure",
      statement: "The in-flight count is lowered once however many ends are reached.",
    },
    {
      invariantKind: "departure",
      statement:
        "A request forwarded over the remote-control listener raises the connection count.",
    },
    {
      invariantKind: "departure",
      statement: "A request forwarded over the port raises no connection count.",
    },
    {
      invariantKind: "departure",
      statement: "A remote-control response carrying a body arms its observer to lower that count.",
    },
    {
      invariantKind: "departure",
      statement: "A remote-control request that aborts lowers the connection count.",
    },
    {
      invariantKind: "departure",
      statement:
        "A request carrying a body is read into one buffer before that request is forwarded.",
    },
    {
      invariantKind: "departure",
      statement: "A forwarded request is sent with no access token of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The port is bound through `bind-with-retry`.",
    },
    {
      invariantKind: "departure",
      statement: "A listener answering no port is stopped.",
    },
    {
      invariantKind: "departure",
      statement: "A listener answering no port throws.",
    },
    {
      invariantKind: "departure",
      statement: "A unix socket path is cleared before the remote-control listener is opened.",
    },
    {
      invariantKind: "departure",
      statement: "A remote-control listener that throws leaves the port listener serving.",
    },
    {
      invariantKind: "departure",
      statement: "A remote-control listener that throws is written about on the warning seam.",
    },
    {
      invariantKind: "departure",
      statement: "Stopping a gateway stops the port listener.",
    },
    {
      invariantKind: "departure",
      statement: "Stopping a gateway stops the remote-control listener.",
    },
    {
      invariantKind: "departure",
      statement: "Stopping a gateway takes the unix socket path away.",
    },
    {
      invariantKind: "departure",
      statement: "The unix socket path goes away even where stopping that listener throws.",
    },
    {
      invariantKind: "departure",
      statement: "A gateway with no unix socket path takes no socket path away.",
    },
    {
      invariantKind: "departure",
      statement: "A flush ends every stream the shutdown registry holds.",
    },
    {
      invariantKind: "departure",
      statement: "The port handed back is the port the listener bound.",
    },
    {
      invariantKind: "departure",
      statement: "The effects handed in are reached rather than effects built from the root.",
    },
    {
      invariantKind: "departure",
      statement: "The effects are built from the root where the caller hands no effects in.",
    },
    {
      invariantKind: "departure",
      statement: "The log prefix is `[oauth-proxy]` where the caller names no prefix.",
    },
    {
      invariantKind: "departure",
      statement: "An idle span the caller names nowhere reaches the forward as zero.",
    },
    {
      invariantKind: "departure",
      statement: "A keepalive span the caller names nowhere reaches the forward as zero.",
    },
    {
      invariantKind: "departure",
      statement: "The clock is handed in so a test needs no real time.",
    },
    {
      invariantKind: "departure",
      statement: "The sleep is handed in so a test needs no wait.",
    },
    {
      invariantKind: "departure",
      statement: "The fetch is handed in so a test needs no network.",
    },
    {
      invariantKind: "departure",
      statement: "The listener is handed in so a test needs no open socket.",
    },
    {
      invariantKind: "departure",
      statement: "Every line written here goes to a seam the caller may replace.",
    },
    {
      invariantKind: "departure",
      statement: "The pipeline a message turn runs through is named here.",
    },
    {
      invariantKind: "departure",
      statement: "A message turn is run through `pre-forward-queue`.",
    },
    {
      invariantKind: "departure",
      statement: "An attempt that queue makes is `account-walk`.",
    },
    {
      invariantKind: "departure",
      statement: "A queue that commits answers with `committed-keepalive`.",
    },
    {
      invariantKind: "departure",
      statement: "A queue that exhausts answers with `rate-limit-refusal`.",
    },
    {
      invariantKind: "departure",
      statement: "The account a request is sent under is chosen by `account-picker`.",
    },
    {
      invariantKind: "departure",
      statement: "The credential that account is sent with is read by `fresh-credential`.",
    },
    {
      invariantKind: "departure",
      statement: "One account picker is built for the life of a gateway.",
    },
    {
      invariantKind: "departure",
      statement: "A pipeline handed in replaces the one named here.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A caller holds what starting a gateway hands back for as long as that gateway runs.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here chooses an account.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a token.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here retries a request.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a transport row.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock the caller cannot replace.",
    },
    {
      invariantKind: "absence",
      statement: "No route here answers a credential.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here reads the `getLogDir` the start options carry.",
    },
    {
      invariantKind: "gap",
      statement: "The directory `getLogDir` answers is no page file a transport row lands beside.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here reads the refresh outcome hook the start options carry.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here reads the terminal test the start options carry.",
    },
    {
      invariantKind: "gap",
      statement: "A request whose url will not parse throws out of the route unanswered.",
    },
    {
      invariantKind: "gap",
      statement: "A request forwarded over the port leaves the observer of that request unended.",
    },
    {
      invariantKind: "gap",
      statement: "The routes are written here rather than handed in.",
    },
    {
      invariantKind: "gap",
      statement: "A socket path left over is kept where the remote-control listener never opened.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing proves these routes against a listener that is really open.",
    },
  ],
} as const satisfies Module
