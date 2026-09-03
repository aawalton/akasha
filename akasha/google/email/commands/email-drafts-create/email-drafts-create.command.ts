import type { Command } from "@akasha/command-system/command"

export const emailDraftsCreate = {
  id: "01a06810-cf11-70dc-9875-5c649a88fe59",
  pageTypeSlug: "command",
  slug: "email-drafts-create",
  definition: "the command writing one Gmail draft from the flags a send takes, unsent",
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
    "the flags are the ones `email messages send` takes, so a draft and a send are composed alike.",
    "a subject or a body is said inline or read from a file, and saying it both ways is refused.",
    "one call reads standard input once, so `-` names it for one flag at most.",
    "a path that is not absolute is read against the repository root.",
    "the draft comes back as its own id, the id of the message it holds, and that message's thread.",
    "a draft once written is not taken back here.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A draft is composed from the flags a send is composed from.",
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
      invariantKind: "absence",
      statement: "Nothing here sends the draft.",
    },
  ],
} as const satisfies Command
