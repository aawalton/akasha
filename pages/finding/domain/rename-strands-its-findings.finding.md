---
id: de09538e-6dce-5130-8a3d-d688bdb05ed6
page-type-slug: finding
title: "Rename strands its findings"
domain-slug: page-type/domain
---

# Claim

Renaming a domain strands every memory document keyed to its old slug, and nothing in the rename repoints them. The key was correct when written, so the filer's read-back cannot catch it and no later read looks again. Five findings stood this way on 2026-08-07 across four folders no document declares, one of them for two days holding a ruling of Alan's that its domain's lead never received.

# Evidence

Measured 2026-08-07, first-hand, against `~/memory` and `~/instructions`.

Comparing every `findings/<slug>/` directory against the documents declaring `domain-slug:` under `domains/` gave six with no live declarer, four of them holding findings: `role-mode` (1), `review-perimeter` (3), `domain-vision` (1), and `agent-mode`, `create-persona-register` and `governance` empty.

None was a mistyped slug. `git log --follow` traces each to a rename or a removal: `role-mode` and `agent-mode` are both `domains/seat-mode.md` under earlier names, `review-perimeter` is `domains/tasks/archivist/review-documents.md` by way of `review-surfaces.md`, and `domain-vision` was removed outright with no retired document left behind. Every `domain:` key resolved on the day it was written.

The asymmetry is what makes this survive. `tools/lib/finding.ts:87` refuses a dead slug at file time — "no document declares `domain-slug: <x>`, so a finding keyed to it would reach nobody" — which a seat hit tonight and reported. Nothing levies that test again afterwards. `tools/checks/findings-sorted.ts` measures only that a finding's folder and its own `domain:` key agree, which these five satisfied perfectly while pointing at nothing, and its docblock says at line 27 that resolution "is a corpus-wide defect already filed". `tools/rehome-finding.ts` exists to move one, so the repair is built; nothing calls it on a rename.

`pages/finding/instructions-harness/reference-keys-typed-as-slugs.finding.md` holds the typing defect this rests on, and draws the exposure as a mistyped slug. This is the other shape, and it is filed apart because that finding's `# Evidence` stands at its ceiling.

The cost is measurable in one case. `findings/role-mode/ask-alan-bar-superseded.md` records a ruling of Alan's dated 2026-08-05 superseding the bar that `ops ask-alan --help` still prints. It sat under a slug nothing declares from then until 2026-08-07, so no lead reviewing findings against a live domain would have met it. All five have since been re-keyed.
