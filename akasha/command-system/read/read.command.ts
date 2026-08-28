import type { Command } from "../command/command.page-type.ts"

export const read = {
  id: "01a04a32-495b-7a1e-9231-0acfa8bc4704",
  pageTypeSlug: "command",
  slug: "read",
  definition: "a file and what is required for it, recorded as read, and on a re-read only what changed",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: [
    "corpus",
    "reading",
    "required-reading",
  ],
  design: [
    "A slug naming pages of two types is refused with a path for each, rather than answered with one of them.",
    "A read returns the whole file where the agent asks for it or nothing says what it last saw.",
    "A read takes no line range, so no call returns part of a file.",
    "A read too big for one answer returns fewer files and the call that takes the rest.",
    "A body past what one answer holds returns what it is, and records nothing.",
    "A read printing to a pipe records nothing and says so, because a record would claim a body reached the agent.",
    "A conditional reading arrives as a definition and a path, never as a body.",
    "The body a read records is kept, so a later read can show what moved without asking git.",
  ],
} as const satisfies Command
