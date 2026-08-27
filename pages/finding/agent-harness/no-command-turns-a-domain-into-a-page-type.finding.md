---
id: 5056725d-6fac-5d2e-b6b0-c766f122b6f3
page-type-slug: finding
title: "No command turns a domain document into a page type document, though every conversion needs one"
domain-slug: domain/agent-harness
---

# Claim

No command turns a domain document into a page type document, though every conversion this theme makes needs one.

# Evidence

Moving `domains/seat.md` to `page-types/seat.md` was refused from both directions.

`mv.ts` relocates a body but cannot change it, so the moved file arrived at `page-types/seat.md` still declaring `page-type-slug: domain`, and `page-holds-properties` failed it: `body-shape-slug`, `extends-slug` and `files` are each required on `page-type` and a domain document states none.

`edit.ts` changes a body but not a path, so adding those three keys at `domains/seat.md` failed the same gate from the other side — 11 keys against the 33 properties `domain` and what it extends declare.

Writing the new path first is refused by `domain-slug-unique`, both documents declaring `seat`. So the only route left is removal before replacement: `replace.ts` to repoint every mention, `rm.ts`, then `write.ts`. That is three commits, and between the second and third the slug `seat` resolves to nothing while eight domains name it as their parent. `mv.ts`'s own help names that state as the reason it was made atomic — "the repo in between was not one to publish".

The precedent did it in one act: commit `931154f0a`, `{domains => page-types}/project.md`, a rename carrying five insertions and two deletions, authored by hand.

The theme `adopt-file-backed-pages` performs this conversion once per page type it moves, so the cost stands rather than being paid once.
