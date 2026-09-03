import type { Command } from "../command.page-type.ts"

export const remove = {
  id: "01a04bed-1461-7364-8579-6799d5aa8ea0",
  pageTypeSlug: "command",
  slug: "remove",
  definition: "named paths taken away, gated together and removed or refused as one",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  changeKindSlug: "change-mechanical",
  partSlugs: ["module/remove-naming", "module/remove-workspacing"],
  taking: [
    { said: "--file-path <path>", takes: "a path anywhere in the repository to take away" },
    { said: "--message <text>", takes: "what the commit is for" },
    { said: "--message-file <file>", takes: "a file the commit message is read from" },
    { said: "--break-the-glass <reason>", takes: "why no check runs, said in the commit" },
  ],
  helpNotes: [
    "--file-path repeats, so several paths go in one commit.",
    "a directory named takes away every file git holds under it.",
    "the files beside what you name under `akasha/` go with it.",
    "a path outside `akasha/` goes too, and no check judges one, which the answer says.",
    "a folder at the top of the repository is refused — name what is inside it.",
    "a page going is taken out of every list that named it, in the same commit.",
    "a name held on its own rather than as a list entry is reported and left alone.",
    "a name in code rather than in a page property is neither found nor reported.",
    "what a tracked file left behind still names is reported, and nothing here repoints it.",
    "a file is named for spelling a whole path that goes or a package name a manifest that goes declares.",
    "a wider sweep for the last part of each path is reported apart, and most of it is unrelated.",
    "the root manifest stops naming a workspace this empties, and the lockfile is made again.",
    "a root manifest another commit moved while this ran refuses the removal rather than being written over.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A path is read against the repository root and never against the folder the call was made in.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is not there is already gone rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A removal forgets every agent's reading of every path the removal takes.",
    },
    {
      invariantKind: "departure",
      statement: "A removal forgets every agent's reading of a named path already gone.",
    },
    {
      invariantKind: "departure",
      statement: "Which named paths went and which were already gone is said.",
    },
    {
      invariantKind: "departure",
      statement: "Neither kind of path is reported as the other.",
    },
    {
      invariantKind: "departure",
      statement: "A call where no named path stood commits nothing and still answers as done.",
    },
    {
      invariantKind: "departure",
      statement: "A directory opens onto every tracked file under the directory.",
    },
    {
      invariantKind: "departure",
      statement: "A directory holding no tracked file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path anywhere in the repository is taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A path inside `.git` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder at the top of the repository is refused.",
    },
    {
      invariantKind: "departure",
      statement: "No check judges a path outside the `akasha` folder.",
    },
    {
      invariantKind: "departure",
      statement: "A path no check judged is named in the answer.",
    },
    {
      invariantKind: "absence",
      statement: "A file beside a path outside the `akasha` folder is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "What still names a path outside the `akasha` folder that goes is reported.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file spelling a whole path that goes is reported apart from what a wider sweep reached.",
    },
    {
      invariantKind: "departure",
      statement: "A search that could not run refuses the removal.",
    },
    {
      invariantKind: "absence",
      statement: "A file other than the root manifest naming what goes is left as that file is.",
    },
    {
      invariantKind: "departure",
      statement: "The root manifest stops naming a workspace the removal empties.",
    },
    {
      invariantKind: "departure",
      statement:
        "A workspace is emptied where the removal takes the manifest naming that workspace.",
    },
    {
      invariantKind: "departure",
      statement: "The root manifest is written only where its body is the body this call read.",
    },
    {
      invariantKind: "departure",
      statement: "A root manifest that moved while this ran refuses the removal unwritten.",
    },
    {
      invariantKind: "departure",
      statement: "The lockfile is made again beside the manifest and lands in the same commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A lockfile that could not be made leaves the root manifest untouched and says so.",
    },
    {
      invariantKind: "departure",
      statement: "A page's sidecars go with the page without being named.",
    },
    {
      invariantKind: "departure",
      statement: "A directory the removal leaves empty goes with the removal.",
    },
    {
      invariantKind: "departure",
      statement: "Everything taken without being named is reported.",
    },
    {
      invariantKind: "departure",
      statement: "Every path a call names is refused in one answer.",
    },
    {
      invariantKind: "departure",
      statement: "A path is named behind `--file-path` like `write` and `edit` name theirs.",
    },
    {
      invariantKind: "departure",
      statement: "A path standing on its own is refused rather than read as a named path.",
    },
    {
      invariantKind: "departure",
      statement: "A page going is taken out of every list naming that page.",
    },
    {
      invariantKind: "departure",
      statement: "Every list mended lands in the commit the removal makes.",
    },
    {
      invariantKind: "departure",
      statement: "Which pages named a page going is read from the index before that page goes.",
    },
    {
      invariantKind: "departure",
      statement: "A name is dropped only where the name is an entry in a list.",
    },
    {
      invariantKind: "departure",
      statement: "A single name naming a page going is left unchanged and reported.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file the same call takes away is never mended for another file that call takes away.",
    },
    {
      invariantKind: "departure",
      statement: "An index that cannot say what named a page lets the removal go on and says so.",
    },
    {
      invariantKind: "departure",
      statement: "A removal finding no list to mend writes exactly what a removal wrote before.",
    },
    {
      invariantKind: "gap",
      statement: "What a removal leaves behind still stands up on its own.",
    },
    {
      invariantKind: "gap",
      statement: "A name a page had in code rather than in a page property goes with that page.",
    },
  ],
} as const satisfies Command
