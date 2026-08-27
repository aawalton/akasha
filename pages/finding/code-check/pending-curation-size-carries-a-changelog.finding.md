---
id: 21399945-deb6-5558-ac93-fc229a5dd87b
slug: pending-curation-size-carries-a-changelog
page-type-slug: finding
title: "Pending curation size carries a changelog"
domain-slug: domain/global
---

# Claim

`PENDING_CURATION_SIZE` in `packages/infra/checks/src/lib/ast-unused-coverage.ts` carries a running changelog in its doc comment — one prose paragraph per movement of the constant, each naming a date, a project number and the workspace that left. That is history rather than what is true now, and it is not one of the code comment forms.

# Evidence

The block held five such paragraphs before #19212 and holds six after it: 200 → 199 (#18576), 199 → 198 (#18946), 197 → 196 (#19203), 196 → 195 (#19202) and 195 → 192 (#19212), each several lines of prose.

Two standing instructions bear on it. `domains/global.md` states that a writer states what is true now and leaves how it became true to git. `domains/lists/code-comment-forms.md` names eight forms, every one of them a pragma a program parses — shebang, expect-error, biome suppression, shellcheck directive, ast-unused pragma, triple-slash reference, no-self annotation, deprecation. A prose changelog is none of them.

The part of the comment above the changelog is different in kind: it says what the equality between the constant and the list is FOR, and why a `>` bound could not see the failure the ratchet exists to prevent. That is what is true now, and nothing here is a reason to touch it.

Filed by the seat that added the sixth paragraph, during #19212. It was added deliberately: five siblings already stood, and a constant reading 192 with entries explaining every movement except the one that produced it would read as an error. Making one entry an exception would have left the block inconsistent without settling anything, and the whole block is one unit for whoever rules on it.

The changelog also has a cost beyond dilution. `PENDING_CURATION_SIZE` conflicts on every rebase where another workspace was removed concurrently, and the conflicting hunk is prose rather than the number — during #19212 alone it conflicted twice, against #19203 and #19202, on days when three sibling removals were landing. The number itself is recomputable from the list it guards, so the merge is only hard because of the text around it.
