---
id: cb44b47f-9b01-5102-95b5-96de49022ee1
page-type-slug: finding
title: "Claude MD instructs in parallel to the corpus"
domain-slug: repo/code-repo
---

# Claim

The code repository's root `CLAUDE.md` carries an Agent Rules section of nine bullets instructing code agents in parallel to the corpus. `Read-Only Main`, landed on `domains/folders/code-repo.md` on 2026-08-06, now duplicates one of them outright, which is two carriers of one claim. The other eight have never been compared against the corpus at all.

# Evidence

THE DUPLICATE, at `dirty/code/claude.md:124`, which mirrors the code repository's own root `CLAUDE.md`:

> Main is read-only. All code changes happen in worktrees. **One worktree per top-level project**, at `~/worktrees/{seq}/`, shared by every child project under it — a child never gets its own.

`Single Authority` bars the second carrier: a copy has an original, so a reader meeting both knows which drifted, and two binding documents have none.

WHAT THE OTHER EIGHT CLAIM, none of them measured against the corpus: that every change to a tracked file in the code repository must be connected to a project row, with the roles that carry one named; that tracked files in the instructions repository are outside that requirement; that which repository a home path lands in is what decides and nothing in the path marks it; that untracked paths take no project; where scratch belongs and why `/tmp` is refused; how dev servers are run; that `bun run typecheck` is the only typecheck checking anything at the repo root; and that suppression pragmas need a gate holder's approval.

Several are claims a domain document would carry if anyone had asked where they belong. One — the scratch-directory rule — is the aid a reader of `Read-Only Main` needs and cannot reach from the corpus.

WHY IT IS NOT A DELETION. The two documents do not reach the same reader at the same moment. `CLAUDE.md` is read by every code agent at boot, whatever it is doing; the corpus rule reaches a seat through what governs the path it is writing to, which is later and narrower. Cutting the bullet without settling that trades a duplicate for a window in which a seat about to write into the main checkout has been told by nobody.

WHY IT SITS HERE RATHER THAN BEING FIXED. The file is in the code repository, so any change to it reaches production over a branch, CI and a deploy — a project rather than an adjacent repair. Filed on the day the duplicate was created rather than discovered later, so the record starts from a known state.
