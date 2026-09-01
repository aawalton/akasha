import type { Finding } from "../finding.page-type.ts"

export const aMessageFileInTheScratchpadIsNotTheMessageThatLands = {
  id: "01a05bb9-4db5-7cf2-b3e1-2e15c7318c06",
  pageTypeSlug: "finding",
  slug: "a-message-file-in-the-scratchpad-is-not-the-message-that-lands",
  domainSlug: "domain/akasha-migration",
  claim:
    "A commit message read from a file under the session scratchpad landed as another lane's message. `2e373b6383` says a vite build resolves through a symlinked package root; what it actually holds is the `@shared/file-page-identity` package and 24 repointed reaches. The message cannot be corrected, because `git commit --amend` is refused. State a commit message with `-m` rather than `-F`, or read the file back immediately before the commit.",
  evidence:
    "`git commit -F <file>` was given a path under this session's scratchpad. The file had been written with a five-paragraph message in an earlier bash call. That call also held `git add` and a `git commit` named without `--`, and `block-git-writes` refused the whole call, so what else the call would have run is unproved.\n\nWhen the commit was made the file was 124 bytes and held one line: `a vite build resolves through a symlinked package root, and what breaks a move of the site is depth rather than the symlink`. That line is not this lane's work. `.git/COMMIT_EDITMSG` held the same 124 bytes two minutes later.\n\n`git log -1 --stat` on `2e373b6383` shows 34 files, 128 insertions and 64 deletions, which is exactly this lane's change: the three files of `shared/file-page-identity`, the two page-tree sources the functions left, and 24 repointed importers. So the content is right and only the message is wrong.\n\n`git commit --amend` answers `block-destructive-git`, which says to land another commit rather than rewrite one others may have read. Nothing in the guard warned that `-F` had been handed a file holding something else.\n\nTwo refusals shaped this. `git add` and `git commit` are refused unless their paths are named after `--`, and the refusal takes the whole bash call rather than the one command, so anything chained before a refused git command does not run.",
} as const satisfies Finding
