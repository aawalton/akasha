import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const proxyServing = {
  id: "01a06421-4b73-741a-990a-c82a314d3fe8",
  type: "page-type/module",
  slug: "proxy-serving",
  definition: "a gateway serving from its start to its stop",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A HEAD of the root path is answered 200 with no body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A GET of `/healthz` is answered 200 with the body `ok`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A GET of `/inflight` is answered the count of requests in flight.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A GET of `/inflight` is answered the hold registry's count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A GET of `/rc-status` is answered the count of remote-control connections.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A POST of `/v1/messages` is handed to the message handler.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A POST of `/v1/messages/count_tokens` is handed to the message handler.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path no route here names is forwarded upstream.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A method a route does not name is forwarded upstream.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every request is written about before a route is chosen.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The line written for a request says whether an authorization header arrived.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request reaching the message handler is given no server timeout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request reaching the message handler raises the in-flight count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A response with a body arms the observer to lower the in-flight count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A response with no body lowers the in-flight count before that answer goes out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A response leaving the slot empty lowers the in-flight count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slot holding an observer nothing armed is emptied.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A client that aborts ends the observer as a client disconnect.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A client that aborts lowers the in-flight count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The in-flight count is lowered once however many ends are reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A request forwarded over the remote-control listener raises the connection count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request forwarded over the port raises no connection count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A remote-control response with a body arms its observer to lower that count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A remote-control request that aborts lowers the connection count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request with a body is read into one buffer before that request is forwarded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A forwarded request carrying an authorization of its own is sent with no access token of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A forwarded request carrying no authorization is sent with the credential of a picked account.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A forwarded request is sent with no access token where no account is left to choose.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The port is bound through `bind-with-retry`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A listener answering no port is stopped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A listener answering no port throws.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A unix socket path is cleared before the remote-control listener is opened.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A remote-control listener that throws leaves the port listener serving.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A remote-control listener that throws is written about on the warning seam.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Stopping a gateway stops the port listener.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Stopping a gateway stops the remote-control listener.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Stopping a gateway takes the unix socket path away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The unix socket path goes away even where stopping that listener throws.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A gateway with no unix socket path takes no socket path away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flush ends every stream the shutdown registry has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The port handed back is the port the listener bound.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The effects handed in are reached rather than effects built from the root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The effects are built from the root where the caller hands no effects in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The log prefix is `[oauth-proxy]` where the caller names no prefix.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An idle span the caller names nowhere reaches the forward as zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A keepalive span the caller names nowhere reaches the forward as zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The clock is handed in so a test needs no real time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The sleep is handed in so a test needs no wait.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fetch is handed in so a test needs no network.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The listener is handed in so a test needs no open socket.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every line written here goes to a seam the caller may replace.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pipeline a message turn runs through is named here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message turn is run through `pre-forward-queue`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An attempt that queue makes is `account-walk`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A queue that commits answers with `committed-keepalive`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A queue that exhausts answers with `rate-limit-refusal`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The account a request is sent under is chosen by `account-picker`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The credential that account is sent with is read by `fresh-credential`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One account picker is built for the life of a gateway.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pipeline handed in replaces the pipeline named here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A POST naming a stopped subagent is refused rather than handed to the message handler.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A POST of a messages path naming no subagent reaches the message handler whatever is held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The subagents held as stopped are handed in, and none is held where none is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A turn refused as a stopped subagent's is written about as a 400.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A caller has the proxy starting a gateway hands back for as long as that gateway runs.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here chooses an account.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a token.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here retries a request.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a transport row.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock the caller cannot replace.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No route here answers a credential.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing here reads the `getLogDir` the start options carry.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The directory `getLogDir` answers is no page file a transport row lands beside.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing here reads the refresh outcome hook the start options have.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing here reads the terminal test the start options have.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A request whose url will not parse throws out of the route unanswered.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A request forwarded over the port leaves the observer of that request unended.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The routes are written here rather than handed in.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A socket path left over is kept where the remote-control listener never opened.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing proves these routes against a listener that is really open.",
    },
  ],
} as const satisfies Module
