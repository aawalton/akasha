import type { Module } from "@akasha/code-system/module"

export const proxyProcess = {
  id: "01a06421-4b75-7305-9adb-5701a34aec32",
  pageTypeSlug: "module",
  slug: "proxy-process",
  definition: "the process a gateway runs as from its boot to the signal ending that process",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The boot settings are read by `parse-boot-env`.",
    },
    {
      invariantKind: "departure",
      statement: "Boot settings that will not parse are written to the refusal seam.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal written on boot ends with a newline.",
    },
    {
      invariantKind: "departure",
      statement: "Boot settings that will not parse exit the process with code 1.",
    },
    {
      invariantKind: "departure",
      statement: "A refused boot starts no gateway.",
    },
    {
      invariantKind: "departure",
      statement: "A refused boot writes no proxy state.",
    },
    {
      invariantKind: "departure",
      statement: "The console is redirected before the gateway is started.",
    },
    {
      invariantKind: "departure",
      statement: "The console redirection is told the log directory the boot settings name.",
    },
    {
      invariantKind: "departure",
      statement: "The console redirection is told the agent the boot settings name.",
    },
    {
      invariantKind: "departure",
      statement: "A gateway is started with the port the boot settings name.",
    },
    {
      invariantKind: "departure",
      statement: "A gateway is started with the root handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A gateway is started with the log prefix `[oauth-proxy]`.",
    },
    {
      invariantKind: "departure",
      statement: "A gateway is started with the idle span the boot settings name.",
    },
    {
      invariantKind: "departure",
      statement: "A gateway is started with the keepalive span the boot settings name.",
    },
    {
      invariantKind: "departure",
      statement: "A gateway is started with the socket path answered for the agent.",
    },
    {
      invariantKind: "departure",
      statement: "The log directory reaches the start options as a call rather than a path.",
    },
    {
      invariantKind: "departure",
      statement: "The proxy state written names the process id.",
    },
    {
      invariantKind: "departure",
      statement: "The proxy state written names the port the gateway bound.",
    },
    {
      invariantKind: "departure",
      statement: "The proxy state written names the version the boot settings name.",
    },
    {
      invariantKind: "departure",
      statement: "The port the gateway bound is printed with a newline.",
    },
    {
      invariantKind: "departure",
      statement: "The port is printed after the proxy state is written.",
    },
    {
      invariantKind: "departure",
      statement: "SIGTERM takes the process down.",
    },
    {
      invariantKind: "departure",
      statement: "SIGINT takes the process down.",
    },
    {
      invariantKind: "departure",
      statement: "A second signal takes nothing further down.",
    },
    {
      invariantKind: "departure",
      statement: "Going down flushes the gateway before the gateway is stopped.",
    },
    {
      invariantKind: "departure",
      statement: "Going down stops the gateway before the proxy state is cleared.",
    },
    {
      invariantKind: "departure",
      statement: "A flush that throws still leaves the gateway stopped.",
    },
    {
      invariantKind: "departure",
      statement: "A stop that throws still leaves the proxy state cleared.",
    },
    {
      invariantKind: "departure",
      statement: "A clearing that throws still leaves the process exiting.",
    },
    {
      invariantKind: "departure",
      statement: "Anything thrown while going down is written about on the throw seam.",
    },
    {
      invariantKind: "departure",
      statement: "Going down waits on the transport rows reaching the disk.",
    },
    {
      invariantKind: "departure",
      statement: "The transport wait is reached after the proxy state is cleared.",
    },
    {
      invariantKind: "departure",
      statement: "A transport wait that throws still leaves the process exiting.",
    },
    {
      invariantKind: "departure",
      statement: "Going down exits the process with code 0.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in the environment the boot settings are read from.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in the root every account is read under.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in what a signal is listened for by.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here binds a port.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here answers a request.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads an account.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a token.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here spawns a process.",
    },
    {
      invariantKind: "gap",
      statement: "The root is handed in rather than parsed out of the environment.",
    },
    {
      invariantKind: "gap",
      statement: "The registration account the boot settings name is read by nothing here.",
    },
    {
      invariantKind: "gap",
      statement: "No refresh outcome hook reaches the gateway this process starts.",
    },
    {
      invariantKind: "gap",
      statement: "No terminal test reaches the gateway this process starts.",
    },
    {
      invariantKind: "gap",
      statement: "No transport log path reaches the gateway this process starts.",
    },
    {
      invariantKind: "gap",
      statement: "The health writing the old entrypoint did on a refresh is carried nowhere.",
    },
    {
      invariantKind: "gap",
      statement: "A signal arriving before the signal listeners are set is caught by nothing.",
    },
    {
      invariantKind: "gap",
      statement:
        "The console redirection is one seam rather than the sinks that redirection is made of.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing under this domain spawns the process this module describes.",
    },
    {
      invariantKind: "gap",
      statement: "The exit is a seam so nothing here proves the process really ends.",
    },
    {
      invariantKind: "gap",
      statement:
        "The old entrypoint at `tools/lib/model-gateway/main.ts` exits before a row lands.",
    },
  ],
} as const satisfies Module
