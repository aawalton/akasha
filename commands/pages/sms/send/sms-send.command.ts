import type { Command } from "akasha/commands/command.page-type.types.ts"

export const smsSend = {
  id: "01a0685f-c8ed-7008-b892-0bc284782555",
  type: "command",
  slug: "sms-send",
  definition: "the command putting one text message out over the toll-free number",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A credential missing from the environment is refused as something said wrongly.",
    },
    {
      invariantKind: "departure",
      statement: "A credential is never carried into the answer or into a log.",
    },
    {
      invariantKind: "departure",
      statement: "The answer carries the id the carrier gave the message.",
    },
    {
      invariantKind: "absence",
      statement: "No message is taken back once that message is sent.",
    },
    {
      invariantKind: "departure",
      statement:
        "A message the carrier took is named as soon as the carrier answers that it took it.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal after that names the message the carrier took.",
    },
    {
      invariantKind: "departure",
      statement: "A carrier that refused the message leaves the refusal naming no message taken.",
    },
    {
      invariantKind: "departure",
      statement: "The reaching of the carrier is handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The number sent from is the toll-free number unless another number is said.",
    },
    {
      invariantKind: "departure",
      statement: "A body read from a file has no closing line ending.",
    },
    {
      invariantKind: "departure",
      statement: "A carrier answering anything but OK is operational rather than a refusal.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here checks that the number is one anybody enrolled.",
    },
    {
      invariantKind: "departure",
      statement: "The carrier reached is the live API unless another is said.",
    },
    {
      invariantKind: "departure",
      statement: "A call saying neither a body nor a file to read one from is refused.",
    },
  ],
  name: "send",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/to-number", required: true, saidAs: "flag-or-word" },
    { argument: "argument/text-file", notWith: ["argument/text"], oneOf: ["argument/text"] },
    { argument: "argument/text", oneOf: ["argument/text-file"] },
    { argument: "argument/from-number" },
    { argument: "argument/base-url" },
  ],
} as const satisfies Command
