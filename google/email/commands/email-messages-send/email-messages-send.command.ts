import type { Command } from "@akasha/command-system/command"

export const emailMessagesSend = {
  id: "01a06810-cf11-717b-8bb7-cfc22b009ed1",
  pageTypeSlug: "command",
  slug: "email-messages-send",
  definition: "the command sending a composed message from the authenticated mailbox",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--to <addr,..>", takes: "who the mail goes to, said again or parted by commas" },
    { said: "--cc <addr,..>", takes: "who is copied, said again or parted by commas" },
    { said: "--bcc <addr,..>", takes: "who is blind copied, said again or parted by commas" },
    { said: "--subject <text>", takes: "the subject line" },
    {
      said: "--subject-file <path>",
      takes: "a file the subject is read from, or `-` for the input",
    },
    { said: "--body <text>", takes: "the plain-text body" },
    { said: "--body-file <path>", takes: "a file the body is read from, or `-` for the input" },
    { said: "--attach <path>", takes: "a file to hang off the mail, said again for each" },
    { said: "--thread <id>", takes: "the thread the message joins" },
    {
      said: "--reply-to-message <id>",
      takes: "the message whose id seeds In-Reply-To and References",
    },
    { said: '--from <"Name <addr>">', takes: "a verified send-as alias to send the mail from" },
  ],
  helpNotes: [
    "a reply names both the thread and the message replied to, and its headers are derived from that message.",
    "a subject or a body is said inline or read from a file, and saying it both ways is refused.",
    "one call reads standard input once, so `-` names it for one flag at most.",
    "a path that is not absolute is read against the repository root.",
    "the send comes back as the message's id and its thread.",
    "a message once sent is not taken back.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reply's threading is derived from the message replied to rather than stated.",
    },
    {
      invariantKind: "departure",
      statement: "A subject read from a file carries no line ending.",
    },
    {
      invariantKind: "departure",
      statement: "A body read from a file is carried whole.",
    },
    {
      invariantKind: "departure",
      statement: "An address list is split on commas as well as on repeated flags.",
    },
    {
      invariantKind: "departure",
      statement: "A sender given in angle brackets carries the name before the brackets.",
    },
    {
      invariantKind: "departure",
      statement: "An attachment is read off the disk before the mail is composed.",
    },
    {
      invariantKind: "departure",
      statement: "A message carrying no attachment is one plain-text part rather than multipart.",
    },
  ],
} as const satisfies Command
