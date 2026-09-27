import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readSettling = {
  id: "01a0e2eb-49cf-7b9f-8e9d-0d6026dac245",
  type: "page-type/module",
  slug: "read-settling",
  definition: "a read on a reading thread kept apart from every landing",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A read takes no hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read starts only while no landing holds the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read waiting past the longest wait for a hold is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hold whose holder is gone is taken as no hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read starts only while the service is making no landing of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing the service makes waits for every read its threads are answering.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reads and the service's own landings meet in memory the threads share.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing waits a minute at most for reads, and then goes ahead and says so.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A landing another process begins while a read is answered is not seen, as on one thread.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No read is answered again or refused for a landing that came and went.",
    },
  ],
} as const satisfies Module
