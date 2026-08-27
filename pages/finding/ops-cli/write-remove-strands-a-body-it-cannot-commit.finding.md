---
id: 2bde86ed-cc10-5d98-8391-ad071c3f4fa1
slug: write-remove-strands-a-body-it-cannot-commit
page-type-slug: finding
title: "Write remove strands a body it cannot commit"
domain-slug: domain/ops-cli
---

# Claim

`ops memory write --remove` on an untracked path unlinks the file, then fails the commit, leaving the newly written body on disk uncommitted in a repo where a shell write cannot be committed.

# Evidence

Verified 2026-08-15 in a scratch clone of the memory repo by a review delegate.

`--remove <untracked-path>` unlinks the path, then `commitPaths` fails with `pathspec ... did not match any file(s) known to git` and the verb exits 3. The body it wrote in the same call is already on disk and is not in the commit.

That is the worst resting place available. `domains/agent-harness.md` rule **Composed Outside** exists because a shell write into a gated repo is live the moment it lands and cannot be committed — and this is the gated command putting the repo into exactly that state by itself.

`ops memory rm` escapes the same fault only by accident: `git diff --quiet HEAD` returns 0 for an unknown pathspec, so the commit is skipped rather than failed. It still destroys the untracked file, and prints its own warning — "AT LEAST ONE REMOVED PATH WAS UNTRACKED, so no history holds it" — after the unlink rather than before it. Exit 0, `notes/untracked.md 42 → gone`, `commit: nothing to commit`. The delegate marked `ops memory rm` irreversible on that ground and nothing else in the namespace.

A third, smaller one in the same file: `tools/write.ts:145` throws a raw `ENOENT` with a Bun stack trace when `--content-file` names a missing file, where every other input error in the file goes through `fail()`.

`ops instructions write --remove` runs the identical body and has the identical fault. Read rather than run, to avoid destroying a file in the live repo: `tools/lib/verb.ts:94` calls `git ls-files --error-unmatch` on the paths being removed, which looks like the guard against this. It is not one. `git()` in `tools/lib/git.ts` returns an exit code rather than throwing, and `tracked.code` is consulted only at `verb.ts:126`, inside the block composing stdout. The write is at 96-105, the unlink at 106-112, the commit at 115, and the untracked warning is rendered at 126. So the check runs before the damage and is read after it.
