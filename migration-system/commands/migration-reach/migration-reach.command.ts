import type { Command } from "@akasha/command-system/command"

export const migrationReach = {
  id: "01a0654f-b626-7b34-aa69-382fa25ed68e",
  pageTypeSlug: "command",
  slug: "migration-reach",
  definition: "the command saying which files outside akasha are inside akasha as well",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<path>", takes: "a file outside akasha to judge, said as many times as needed" },
    { said: "--paths-from <path>", takes: "a file holding one path to judge on each line" },
    { said: "--told <path>", takes: "a file holding `<old path>\\t<akasha path>` on each line" },
    { said: "--takeable", takes: "say only the paths that may go, one on each line" },
  ],
  helpNotes: [
    "this is the ablation safety check: a file goes only where this says it is reached.",
    "a folder having been migrated is no answer about any file in it, so every file is judged alone.",
    "a file is reached where a page under akasha states its id, carries its page type and slug, holds its very bytes, or was named for it by `--told`.",
    "run this after the migration landed. a reading taken before the landing reaches nothing.",
    "the recipe: compose the new bodies, land them with `migrationLanded`, read them back with `readBack`, sweep the old paths here, then land the takeable ones as removals.",
    "`--takeable` is what a migration feeds back in as removals, so nothing unreached is ever composed as one.",
    "the code is 0 where every path asked after is reached and 2 where any one of them is not.",
    "the key is page type and slug corroborated by a field value of the old file. page ids are re-minted on every migration, so an id match reaches almost nothing.",
    "LIMIT: content regrouped at another grain reads as unreached. a page type akasha carries none of is said as such, so look for the content under another page type before migrating again.",
    "a sidecar is judged on its own evidence. a page being reached says nothing about the file beside it.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path is judged whether or not the path is a page.",
    },
    {
      invariantKind: "departure",
      statement: "A path already under akasha is refused rather than judged.",
    },
    {
      invariantKind: "departure",
      statement: "A path saying nothing of itself is answered as unreached rather than skipped.",
    },
    {
      invariantKind: "departure",
      statement: "The code answers one line for each path asked after.",
    },
    {
      invariantKind: "departure",
      statement: "The lines come back in the order the paths were asked after.",
    },
    {
      invariantKind: "departure",
      statement: "A run holding one unreached path answers with a code of its own.",
    },
  ],
} as const satisfies Command
