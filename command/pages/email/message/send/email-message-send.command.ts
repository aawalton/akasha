import type { Command } from "akasha/command/command.page-type.types.ts"

export const emailMessageSend = {
  id: "01a06810-cf11-717b-8bb7-cfc22b009ed1",
  type: "page-type/command",
  slug: "email-message-send",
  definition: "the command sending a composed message from the authenticated mailbox",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reply's threading is derived from the message replied to rather than stated.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reply names both the thread it joins and the message replied to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subject or a body said both inline and in a file is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`-` names standard input for one flag at most.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A send comes back as the message's id and its thread.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message once sent is not taken back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A send that threw after Gmail took the message says the message went.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "A body read from a file is carried whole.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "A message with no attachment is one plain-text part rather than multipart.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every send names a subject here or at `--subject-file`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every send names a body here or at `--body-file`.",
    },
  ],
  name: "send",
  arguments: [
    { argument: "argument/to-address", required: true, repeats: true },
    {
      argument: "argument/subject-file",
      notWith: ["argument/subject"],
      oneOf: ["argument/subject"],
    },
    { argument: "argument/body-file", notWith: ["argument/body"], oneOf: ["argument/body"] },
    { argument: "argument/subject" },
    { argument: "argument/body" },
    { argument: "argument/thread" },
    { argument: "argument/reply-to-message" },
    { argument: "argument/send-as" },
    { argument: "argument/cc", repeats: true },
    { argument: "argument/bcc", repeats: true },
    { argument: "argument/attach", repeats: true },
  ],
} as const satisfies Command
