import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const proxyRun = {
  id: "01a069b9-74bc-7728-868d-54f66ae34d14",
  type: "page-type/module",
  slug: "proxy-run",
  definition: "starting one gateway on the akasha entry and saying the port it answered",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The entry started is the entry a supervisor spawns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The entry started is named by the same resolver.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The gateway started has a port of its own and a socket of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The port answered is the first line the gateway prints.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A gateway not asked to be kept is stopped once that gateway has printed its port.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gateway asked to be kept is let go of rather than waited on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gateway is named as soon as that gateway is running under a process id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That name carries the call which stops the process it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The log directory is named as soon as that directory is made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gateway stopped again is no longer named as left running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gateway that would not be stopped is left named as running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The console and the errors are written under the log directory named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run naming no directory writes them under a folder of that agent's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That folder is not the folder every agent shares a socket in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No gateway is started under an agent id a seat answers to.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a token.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads an account.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The version given is not computed from the entry.",
    },
  ],
} as const satisfies Module
