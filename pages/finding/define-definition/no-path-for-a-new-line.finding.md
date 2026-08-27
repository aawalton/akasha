---
id: e64dd28f-07ea-5cf8-bbc7-6beb5035ffc3
page-type-slug: finding
title: "No path for a new line"
domain-slug: task/define-definition
---

# Claim

`define-definition` has no path for a line that does not exist yet, and `define-domain-structure` 5/1 dispatches it for exactly that. The output of a structure run is new domains. But define-definition's 1/1 reads the whole document, its stage 3 is titled "What the standing line gets wrong", and 4/2 prescribes `edit --dry-run` as the measurement for every draft — which refuses a path that is not there. Its Definition admits a new domain, so the gap is in its stages rather than its scope.

# Evidence

Raised by the review-instructions reading of `domains/tasks/lead/define-domain-structure.md` on 2026-08-07, which landed neither side: the seam turns on how the two tasks should divide.

Verified myself. Piping `{"file_path":"domains/does-not-exist-xyz.md","old_string":"a","new_string":"b"}` into `bun tools/edit.ts --dry-run` returns exit 1 and "domains/does-not-exist-xyz.md does not exist — `edit` changes a file that is there; use `write.ts` to make one". So for a new family, the instrument that 5/1's warrant rests on — "a line drafted outside it is one nothing measured" — refuses the call.

Not chased: whether `write.ts --dry-run` gives an equivalent measurement, which is the obvious candidate repair and is a judgment about the two tasks rather than a fact about the tool.
