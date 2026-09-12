import type { Command } from "akasha/commands/command.page-type.types.ts"

export const emailMessageSend = {
  id: "01a06810-cf11-717b-8bb7-cfc22b009ed1",
  type: "command",
  slug: "email-message-send",
  definition: "the command sending a composed message from the authenticated mailbox",
  code: "ts",
  taking: [
    {
      said: "--to <addr,..>",
      takes: "who the mail goes to, said again or parted by commas, and every send names one",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reply's threading is derived from the message replied to rather than stated.",
    },
    {
      invariantKind: "departure",
      statement: "A reply names both the thread it joins and the message replied to.",
    },
    {
      invariantKind: "departure",
      statement: "A subject or a body said both inline and in a file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "`-` names standard input for one flag at most.",
    },
    {
      invariantKind: "departure",
      statement: "A send comes back as the message's id and its thread.",
    },
    {
      invariantKind: "departure",
      statement: "A message once sent is not taken back.",
    },
    {
      invariantKind: "departure",
      statement: "A send that threw after Gmail took the message says the message went.",
    },

    {
      invariantKind: "departure",
      statement: "A body read from a file is carried whole.",
    },

    {
      invariantKind: "departure",
      statement: "A message with no attachment is one plain-text part rather than multipart.",
    },
    {
      invariantKind: "departure",
      statement: "Every send names a subject here or at `--subject-file`.",
    },
    { invariantKind: "departure", statement: "Every send names a body here or at `--body-file`." },
  ],
  name: "send",
  arguments: [
    { argument: "argument/subject-file" },
    { argument: "argument/body-file" },
    { argument: "argument/subject" },
    { argument: "argument/body" },
    { argument: "argument/attach" },
    { argument: "argument/thread" },
    { argument: "argument/reply-to-message" },
    { argument: "argument/send-as" },
    { argument: "argument/cc", repeats: true },
    { argument: "argument/bcc", repeats: true },
  ],
} as const satisfies Command
