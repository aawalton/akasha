import type { Command } from "akasha/commands/command.page-type.types.ts"

export const smsSend = {
  id: "01a0685f-c8ed-7008-b892-0bc284782555",
  type: "command",
  slug: "sms-send",
  definition: "the command putting one text message out over the toll-free number",
  code: "ts",
  taking: [
    { said: "--to <e164>", takes: "the number the text goes to, written in E.164" },
    { said: "<e164>", takes: "the same number, said as a word rather than at its flag" },
    { said: "--text <body>", takes: "the message body" },
    {
      said: "--from <e164>",
      takes: "the number to send from, the toll-free one where none is said",
    },
    {
      said: "--base-url <url>",
      takes: "the carrier API to reach, the live one where none is said",
    },
  ],
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
  ],
  name: "send",
  arguments: [{ argument: "argument/json" }, { argument: "argument/text-file" }],
} as const satisfies Command
