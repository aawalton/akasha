import type { Command } from "../command.page-type.ts"

export const index = {
  id: "01a04de1-13fa-7331-979e-d443758eefad",
  pageTypeSlug: "command",
  slug: "index",
  definition: "the index rebuilt from the commit at HEAD and put in place whole",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "`index` is found by its path, never through the index it repairs.",
    },
    {
      invariantKind: "departure",
      statement: "The act is the first word, and `refresh` is the only act there is.",
    },
    {
      invariantKind: "departure",
      statement: "The index is built over `akasha/` as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "A worktree standing apart from HEAD is refused, and `--unlanded` builds over it.",
    },
    {
      invariantKind: "departure",
      statement: "The commit the index names is stamped by the rebuild, never by this command.",
    },
    {
      invariantKind: "departure",
      statement: "The index is built aside and put in place whole.",
    },
    {
      invariantKind: "departure",
      statement: "The landing lock is held from reading HEAD to putting the index in place.",
    },
    {
      invariantKind: "departure",
      statement: "A flag belonging to a command that writes is refused rather than ignored.",
    },
    {
      invariantKind: "departure",
      statement: "`--dry-run` builds the index aside and puts nothing in place.",
    },
    {
      invariantKind: "departure",
      statement: "An entry that would not file is refused, and what was built still stands.",
    },
    {
      invariantKind: "absence",
      statement: "A refresh writes nothing tracked and makes no commit.",
    },
    {
      invariantKind: "gap",
      statement: "A body a hand is still writing is taken as it stands.",
    },
  ],
} as const satisfies Command
