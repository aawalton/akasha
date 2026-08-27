---
id: f6dfa895-1694-504b-a7a8-1e8151f86562
slug: remedy-unsettled-at-the-schema
page-type-slug: finding
title: "Remedy unsettled at the schema"
domain-slug: page-type/refusal
---

# Claim

Whether a refusal owes the reader an act is unsettled at the schema, and the corpus is split on it: of 118 refusal documents, 87 carry a single paragraph of diagnosis and 31 carry more, with the schema's own header saying a refusal is read by someone who has just been stopped and wants the act they can take next.

# Evidence

Measured 2026-08-11, across `review-instructions` readings dispatched from `review-documents`. Two unrelated refusal families reached this fork independently — the five `bash-env-*` bodies, filed at `pages/finding/refusal/bash-env-family-names-no-act.finding.md`, and `refusals/default-claimed-twice.md`, whose reading put it as a question about the schema rather than about any document.

`tools/document/schemas/refusal.ts` declares one `# Refusal` section and states in its header that a refusal is read by someone just stopped who wants the act they can take next. It requires no remedy and admits one only as prose inside that section.

The shape is a page now, `pages/page-body-shape/refusal.page-body-shape.md`, and it declares `blocks: refusal: repeat: 1-4` — so up to four blocks are admitted rather than one, and still no remedy is required. `pages/page-type/refusal.page-type.md` carries the definition and one Intent line about reachability; neither it nor the body shape says whether an act is owed. The question is where it was.

Counted here over all 118 refusal documents: 87 bodies hold one paragraph, 29 hold two, 2 hold three. Where an act is named it is named in a second paragraph — `refusals/hook-not-firing-at-all.md` and `refusals/hook-never-stamped.md` both close on "Check that this session was launched with `--settings` naming this repository's `settings/agents.json`, then run `bun ~/instructions/tools/run-checks.ts --check hooks-fire`".

Recounted over `pages/refusal/*.refusal.md`: 154 documents, 77 holding one paragraph and 77 holding more. The split is still there and is now even. Both hook bodies quoted above are gone.

Both figures are proxies and neither is the population. A second paragraph is not always an act — `refusals/hook-inert.md` and `refusals/refusal-hole-unfilled.md` carry two and name none. A stricter count, of bodies opening a sentence with an imperative, returns 8 of 118, which is a lower bound rather than the answer. `hook-inert` is gone; `pages/refusal/refusal-hole-unfilled.refusal.md` still stands. The same stricter count over the 154 returns 24.

What makes it a schema question: for `default-claimed-twice`, since gone, which claimant should lose `default: true` is judgment no instrument settles, and "drop it from all but one" is what any reader would already do — so a remedy line there would be owed by shape rather than earned by content.

Not measured: how many of the 87 have a remedy that is settled and simply unwritten, against how many have none an instrument could name.
