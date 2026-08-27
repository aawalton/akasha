---
id: ea0bcf56-ad27-59ce-8c56-475ee36ec013
page-type-slug: finding
title: "Rule carried by no gate"
domain-slug: page-type/domain
---

# Claim

No gate or check carries Every Changed Line, so a seat that lands through it is never reported. Twelve gates run over a domain document and none is this rule; grepping `tools/gates/` and `tools/checks/` for it returns nothing. It binds the agent alone. `review-instructions.md` compounds this: it tells the seat to land each decision as its own commit and never mentions the rule, so a reviewer meets the instruction to land in its task and the instruction to stop in a governor.

# Evidence

Raised by a review-instructions seat on `domains/proximity.md`, the sixth this pass to reach the rule unprompted. It reported the rule reaching six of its seven lines and leaving it only the frontmatter, and that it cost nothing there because it found nothing to change in those six.

I verified the enforcement gap myself: `grep -rln "Every Changed Line\|changed-line" tools/gates/ tools/checks/` returns no file. I also confirmed `review-instructions.md` never names the rule — its Land step reads "Land each decision as its own commit, and mend whatever it made untrue in that same commit."

This is a different claim from the four already filed about the rule this pass. Those concern what the rule says and how reviewers have read it. This one is that nothing detects a breach either way, which is why the divergence recorded in `pages/finding/domain/review-readings-diverged.finding.md` could run eleven subjects without anything surfacing it.

Not measured: whether a gate could carry it. Showing Alan a line is not a state a gate can read off a diff.
