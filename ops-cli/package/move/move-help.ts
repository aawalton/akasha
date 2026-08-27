export const FROM = "--from"

export const TO = "--to"

export const INTO = "--into"

export const PLAN = "--plan"

export const MESSAGE = "--message"

export const MESSAGE_FILE = "--message-file"

export const DRY_RUN = "--dry-run"

export const ALL = "--all"

export const DESCRIPTION =
  "A PACKAGE IS THE UNIT — name the directory holding its `package.json` and every tracked file " +
  "beneath it moves together, keeping the tree under it rather than flattening it. A sibling " +
  "whose name merely begins the same is left where it is.\n" +
  "\n" +
  "WHERE IT LANDS is what the package's own name states. `@temper/game-items-addon` lands at " +
  "`temper/game-items-addon`: the scope becomes the folder and the rest becomes the name, so one " +
  "search finds the package and its directory at once, and a workspaces array is a two-level " +
  "glob rather than a path for every depth the old tree happened to have. `--into <repo>` takes " +
  "that place; `--to <path>` overrides it where a package must land somewhere its name does not " +
  "say.\n" +
  "\n" +
  "TSCONFIG PATHS ARE RELOCATED, which is what `mv` cannot do for a package. `extends`, " +
  "`rootDir`, `outDir`, `baseUrl`, `tsBuildInfoFile`, `paths`, `include`, `exclude`, `files` and " +
  "each `references[].path` are read as paths and rewritten to where their targets landed, by " +
  "swapping the quoted value so that formatting and comments survive. A path reaching a package " +
  "that is staying behind cannot be written across a repository boundary and is REFUSED by name " +
  "rather than guessed at, and the whole move stops.\n" +
  "\n" +
  "THE PLAN IS SETTLED BEFORE ANYTHING MOVES. `--plan` names a file stating where every package " +
  "in the migration lands, and it is read to resolve a tsconfig path reaching a package that has " +
  "already gone: by then its old directory is gone too, so the mapping cannot be recovered from " +
  "the tree and has to be a property of the plan. Without `--plan`, only this package's own " +
  "place is known and every reach outside it is refused.\n" +
  "\n" +
  "BOTH MANIFESTS FOLLOW. The source repository's `workspaces` array gives the package up and " +
  "the destination's takes it on, in the same act. A move between repositories is two commits, " +
  "the destination taking the bodies before the source gives them up, so a refusal never loses " +
  "a file.\n" +
  "\n" +
  "`--all` MOVES A WHOLE REPOSITORY'S PACKAGES AT ONCE, and is the way to move a migration " +
  "rather than a package. A package cannot leave a repository that still resolves it, so a " +
  "package-at-a-time sweep breaks whichever side it leaves behind; moving them in one act has no " +
  "intermediate state to break. It is also the only affordable way at scale, because the survey " +
  "that repoints every referrer reads the whole tracked tree once per act rather than once per " +
  "package."

export const FLAGS = [
  { name: FROM, argLabel: "<dir>", valueShape: "token" as const, path: true, description: "The package directory, the one holding its `package.json`." },
  { name: INTO, argLabel: "<repo>", valueShape: "token" as const, description: "The repository it lands in, at the place its own name states." },
  { name: TO, argLabel: "<dir>", valueShape: "token" as const, path: true, description: "Where it lands, overriding the place its name states. Must not exist." },
  { name: PLAN, argLabel: "<f>", valueShape: "token" as const, path: true, description: "A file stating where every package in the migration lands, read to resolve a reach into one that has already moved." },
  { name: MESSAGE, argLabel: "<s>", valueShape: "prose" as const, description: "Commit message. Defaults to one naming the package and its place." },
  { name: MESSAGE_FILE, argLabel: "<f>", valueShape: "token" as const, path: true, description: "Read the commit message from a file." },
  { name: DRY_RUN, description: "Gate and report; write, commit and remove nothing." },
  { name: ALL, description: "Move every package the plan names for the source repository, as one act. `--from` names that repository." },
]

export const EXITS = [
  { code: 0, meaning: "gated, moved, repointed, both manifests amended and committed in every repository the act touches (or dry-run)" },
  { code: 1, meaning: "input error, an unresolvable tsconfig path, or a gate refused — nothing was moved" },
  { code: 3, meaning: "operational: a write, a removal or a commit failed" },
]
