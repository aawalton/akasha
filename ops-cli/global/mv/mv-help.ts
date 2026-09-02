export const FROM = "--from"

export const TO = "--to"

export const REPO = "--repo"

export const MESSAGE = "--message"

export const MESSAGE_FILE = "--message-file"

export const INPUT_FILE = "--input-file"

export const DRY_RUN = "--dry-run"

export const FLAGS = [
  { name: REPO, argLabel: "<name>", valueShape: "token" as const, description: "Which repository the --from paths address. They settle it, and a disagreeing --repo is refused." },
  { name: FROM, argLabel: "<p>", valueShape: "token" as const, path: true, repeat: true, description: "A file or directory to move, absolute or against the directory this ran in. Each --from takes its own --to. A directory stands for every tracked file under it." },
  { name: TO, argLabel: "<p>", valueShape: "token" as const, path: true, repeat: true, description: "Where it lands. Must not exist. May be in another repository, which makes the move one act and two commits." },
  { name: INPUT_FILE, argLabel: "<f>", valueShape: "token" as const, path: true, description: "Edits to apply as the bodies land, in the shape `edit` takes; `file_path` names the destination." },
  { name: MESSAGE, argLabel: "<s>", valueShape: "prose" as const, description: "Commit message. Defaults to one naming the pairs." },
  { name: MESSAGE_FILE, argLabel: "<f>", valueShape: "token" as const, path: true, description: "Read the commit message from a file." },
  { name: DRY_RUN, description: "Gate and report; write, commit and remove nothing." },
]

export const EXITS = [
  { code: 0, meaning: "gated, moved, repointed, removed and committed once in every repository the act touches, and the push handed off (or dry-run)" },
  { code: 1, meaning: "input error, or a gate refused — nothing was moved and nothing was removed" },
  { code: 3, meaning: "operational: a write, a removal or a commit failed" },
]
