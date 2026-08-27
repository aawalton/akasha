---
id: 1e811373-d006-59ce-98b5-a6aeef3842b1
page-type-slug: finding
title: "Gated write can stand uncommitted"
domain-slug: domain/global
---

# Claim

A gated write can land live and uncommitted, and nothing checks it while it stands there. `ops instructions edit` gated and wrote a change, then lost a race on `.git/index.lock` against a concurrent agent and exited 3, leaving the edited file live in a shared worktree with no commit. The hooks correctly refuse `git checkout`, `git commit` and `git reset` inside that root, so the only way out is handing the already-edited file to `write.ts` as its own source.

# Evidence

Reported as an operational note by the review-instructions reading of `domains/tasks/scenewright/author-persona-scene.md` on 2026-08-07, which hit it and recovered: the commit hook names that exact way out, and that is how the change landed.

I did not reproduce it, and would not — reproducing means racing another agent's index lock in a live shared repo.

Why it is worth a lead's attention rather than only a war story: between the failed commit and the recovery, the file is live for every agent that reads it, and nothing has recorded that it is in that state. The gate passed, so no instrument is holding it; the commit did not, so no history shows it. A seat that stopped or was interrupted at that moment would leave it standing with nothing naming it.

Not measured: how often the race is lost. This run had roughly 175 gated commits across 59 dispatched readings and one reported instance.
