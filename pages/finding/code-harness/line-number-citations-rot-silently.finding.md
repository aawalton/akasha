---
id: f0db8641-0867-5ad2-bde3-9a82369fd0fb
page-type-slug: finding
title: "Line number citations rot silently"
domain-slug: domain/global
---

# Claim

Code comments across the repo cite source locations by `file.ts:LINE`, a citation that rots the moment the cited file is restructured — rotting not into pointing at nothing but into pointing at other plausible-looking code — so no text-pattern sweep and no merge check can detect the drift.

# Evidence

Captured by aranya on 2026-07-25 during #16240, measured and scoped by the filer; not dispatched, per Alan's standing instruction on that night's captures.

Defect: comments citing `file.ts:LINE` or `file.ts:START-END` are correct when written and rot on any restructure of the cited file, not just a rename or deletion. The rot is silent: it doesn't point at nothing, it points at whatever now occupies those lines, so a reader follows the citation into plausible-looking code and concludes the comment was reasoned about it. No text sweep catches this — the citation text is unchanged, only its referent moved — and `git merge-tree` reports clean across branches that each independently move the cited code.

Measured 2026-07-25: 139 line-number citations already on main across 77 files (`grep -rE '\.tsx?:[0-9]+' packages/`); #16240 alone would have added 47 more, a ~34% increase from one project.

Two live instances caught only by coincidence: #16240's `surface.ts:109-140` and `tick.ts:416-432` were about to point at `surfaceToAmy` after #16263 moved `wakeAgentChannels` to line 180. Both were fixed in #16240 by citing the symbol; the other 45 citations #16240 would have added, and the pre-existing 139, were not.

Proposed fix, not decided: cite the symbol (e.g. `wakeAgentChannels`) rather than the line range — symbols survive restructuring and are greppable. The pattern `\.tsx?:[0-9]` in a comment is deterministically matchable, so a check can catch the whole class. Open question: convert the existing 139 (needs the correct symbol read per site) versus allowlist and block only new ones.

Project #16305, someday_maybe, domain code-harness. Captured, never formally defined; moved here off the row's retired `notes` attribute on 2026-08-15.
