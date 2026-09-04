import type { Command } from "@akasha/command-system/command"

export const smsSend = {
  id: "01a0685f-c8ed-7008-b892-0bc284782555",
  pageTypeSlug: "command",
  slug: "sms-send",
  definition: "the command putting one text message out over the toll-free number",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--to <e164>", takes: "the number the text goes to, written in E.164" },
    { said: "<e164>", takes: "the same number, said as a word rather than at its flag" },
    { said: "--text <body>", takes: "the message body" },
    { said: "--text-file <path>", takes: "a file the body is read from, or `-` for the input" },
    {
      said: "--from <e164>",
      takes: "the number to send from, the toll-free one where none is said",
    },
    {
      said: "--base-url <url>",
      takes: "the carrier API to reach, the live one where none is said",
    },
    { said: "--json", takes: "give what was sent as JSON rather than as the sent line" },
  ],
  helpNotes: [
    "the key and the number sent from are read from the environment, which the secrets file fills.",
    "neither is ever written into the answer or into a log.",
    "an answer the carrier gives that is not OK is operational rather than a refusal of what was said.",
    "the answer carries the id the carrier gave the message.",
    "a message once sent is not taken back.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A credential missing from the environment is refused as something said wrongly.",
    },
    {
      invariantKind: "departure",
      statement: "A credential is never carried into the answer.",
    },
    {
      invariantKind: "departure",
      statement: "The number sent from is the toll-free one unless another is said.",
    },
    {
      invariantKind: "departure",
      statement: "A body read from a file carries no closing line ending.",
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
} as const satisfies Command
