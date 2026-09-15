import type { Command } from "akasha/command/command.page-type.types.ts"

export const modelGatewayStart = {
  id: "01a069b9-74bd-7486-be0b-a850ee00342c",
  type: "page-type/command",
  slug: "model-gateway-start",
  definition: "the command starting one gateway on the akasha entry, apart from the fleet",
  code: "ts",
  test: "ts",
  parts: ["module/proxy-run"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One run starts one gateway.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A port that came back answers 0.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A gateway that printed no port answers 3.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The report names the port the gateway answers on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The report names the process the gateway runs as.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A gateway that printed no port is refused rather than reported.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A start that threw after the spawn names the process left running.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A gateway that printed no port is refused with its log directory named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A start that threw before the spawn names no process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seams this runs on are handed in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing inside the akasha folder is written by this command.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No credential is read by this command.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here makes a request of a gateway.",
    },
  ],
  name: "start",
  arguments: [
    { argument: "argument/agent-id" },
    { argument: "argument/gateway-log-dir" },
    { argument: "argument/gateway-port" },
    { argument: "argument/registration-account" },
    { argument: "argument/version" },
    { argument: "argument/keep" },
    { argument: "argument/seconds" },
  ],
} as const satisfies Command
