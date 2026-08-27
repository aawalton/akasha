---
id: eb0ce73c-314d-51b4-a629-4a9d12c00be2
slug: native-seams-doc-missing
page-type-slug: finding
title: "Native seams doc missing"
domain-slug: domain/alanwalton-app
---

# Claim

Nine comments in `packages/alanwalton/native-shell/scripts/apply-ios-seam.sh` send a reader to `docs/native-seams.md` for the reasoning behind a gate, and that file is tracked nowhere in the code repository.

# Evidence

`git grep -c "docs/native-seams.md" origin/main -- 'packages/*/native-shell/scripts/apply-ios-seam.sh'` returns 9 on Alan's script and nothing on Jenny's. `git ls-files | grep -i native-seams` returns nothing, and a `find` for the name across the worktree returns nothing, so no tracked file answers any of the nine.

Eight of the nine predate #18178. The ninth is mine: writing the monarch-tap seam I copied the closing clause of the gate comment beside it, which is how a pointer to a missing file reproduces itself — the convention reads as a convention, and the file it names is never opened by the person following it.

Each pointer sits where a reader has stopped to ask why a gate exists, which is the moment the missing document would have paid. Whether the answer is to write the document or to drop the nine clauses is a decision about that script rather than an observation, and this finding does not make it.
