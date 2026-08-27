---
id: 8710c1f1-3d68-505b-aac7-60e06c2d362c
slug: form-and-recogniser-cannot-land-together
page-type-slug: finding
title: "Form and recogniser cannot land together"
domain-slug: domain/code-comment
---

# Claim

The `comment-forms` gate reads the forms list from the pending change set but imports its recognisers from disk, so a form and its recogniser cannot land in one act — and the refusal it makes says to do the thing that was already done in that same call.

# Evidence

Approving the `shellcheck directive` form meant changing `domains/lists/code-comment-forms.md` and `tools/code-comment/forms.ts` together. Handed to `tools/write.ts` as one array, the call was refused: `domains/lists/code-comment-forms.md names \`shellcheck directive\`, and nothing here recognises that shape in a file — write a recogniser beside the others`. The recogniser was in the same array, on the file the message names.

`tools/gates/comment-forms.ts` takes the list through `subject.read`, which returns the pending body, and calls `formsFrom` out of a module the gate imported at load. `formsFrom` refuses any handle no recogniser claims. So the list is read as it will be and the recognisers as they are, and the two are compared against each other.

It cost two commits rather than one: `1d3452dad` added the recogniser beside the one it replaced, then `f23971f88` swapped the list entry and dropped the dead recogniser. Both were green, and each left the repo consistent, so the split is a workable order rather than a hazard.

The trap is the wording. It reports the recogniser missing and directs the reader to write one, at the moment the reader is writing one, which reads as the edit having silently failed to land.
