import type { Command } from "akasha/commands/command.page-type.types.ts"

export const modelGatewayStart = {
  id: "01a069b9-74bd-7486-be0b-a850ee00342c",
  type: "command",
  slug: "model-gateway-start",
  definition: "the command starting one gateway on the akasha entry, apart from the fleet",
  code: "ts",
  parts: ["module/proxy-run"],
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
  invariants: [
    {
      invariantKind: "departure",
      statement: "One run starts one gateway.",
    },
    {
      invariantKind: "departure",
      statement: "A port that came back answers 0.",
    },
    {
      invariantKind: "departure",
      statement: "A gateway that printed no port answers 3.",
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
  name: "start",
} as const satisfies Command
