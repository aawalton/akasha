import type { Command } from "@akasha/command-system/command"

export const modelGatewayStart = {
  id: "01a069b9-74bd-7486-be0b-a850ee00342c",
  pageTypeSlug: "command",
  slug: "model-gateway-start",
  definition: "the command starting one gateway on the akasha entry, apart from the fleet",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--agent-id",
      takes: "the agent id the gateway runs under, which no seat may answer to",
    },
    { said: "--log-dir", takes: "where the gateway console and the errors under it are written" },
    { said: "--port", takes: "the port to ask for, 0 for any free one" },
    { said: "--account", takes: "the registration account the boot environment carries" },
    { said: "--version", takes: "the version the boot environment carries" },
    { said: "--keep", takes: "leave the gateway running and say the process id to stop it by" },
    { said: "--seconds", takes: "how long to wait for the port line before giving up" },
  ],
  helpNotes: [
    "this starts the akasha gateway entry the way a supervisor starts one: `bun <entry>` with the five OAUTH_PROXY keys in its environment.",
    "it is here because `block-akasha-shell-writes` refuses `bun akasha/...` on a command line, so the entry had no road a lane could run it by.",
    "an agent id a seat answers to is refused, so no run of this can write over the proxy state a serving gateway is using.",
    "without `--keep` the gateway is stopped as soon as it has printed its port, which is the cheapest proof that it boots.",
    "with `--keep` the gateway is left running and you stop it yourself by the process id reported.",
    "the port and the socket are its own, so nothing it does reaches a gateway already serving a seat.",
    "the code is 0 where a port came back and 3 where the gateway printed none.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One run starts one gateway.",
    },
    {
      invariantKind: "departure",
      statement: "The report names the port the gateway answers on.",
    },
    {
      invariantKind: "departure",
      statement: "The report names the process the gateway runs as.",
    },
    {
      invariantKind: "departure",
      statement: "A gateway that printed no port is refused rather than reported.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing inside the akasha folder is written by this command.",
    },
    {
      invariantKind: "absence",
      statement: "No credential is read by this command.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes a request of a gateway.",
    },
  ],
} as const satisfies Command
