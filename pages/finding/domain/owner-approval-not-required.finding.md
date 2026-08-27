---
id: 55b3c1e1-8728-5469-8085-54a10349e738
slug: owner-approval-not-required
page-type-slug: finding
title: "Owner approval not required"
domain-slug: page-type/domain
---

# Claim

Every domain names exactly one owner, and nothing requires that owner's approval before a change to their domain lands.

# Evidence

`domain-championing` is a standing concept — "which persona answers for a domain, and every domain has exactly one" — and `domains/domain.md` carries `persona-champion-slug: ryn` today.

The case that raised it: commit `7d6eabc6` deleted a `# Design` entry from `domains/domain.md`, with the message "instructions: edit domains/domain.md" and no stated reason. The named owner was not consulted and learned of it from a re-read prompt saying a surface under it had changed. Alan later confirmed the deletion was intentional, so this is not an unapproved change — it is a change that reached no owner. Those are different things, and only the second is what this finding is about.

Scale, measured by a seat running `decide-principle-or-rule` on a neighbouring candidate: 191 of 668 instructions-repo commits in one 24-hour window touched a `# Definition`, `# Design`, `# Intent`, `# Principles` or `# Rules` section — Definition 111, Design 55, Intent 21, Principles 18, Rules 20. That split is its measurement. I independently counted 670 commits in the same window, which agrees.

Alan has ruled separately that changes to those five kinds of section require his own direct approval, and that it is to be one rule with no gate behind it. This claim is a different one on a nearby axis: it routes to the domain's named owner rather than to Alan, and it scales with the number of domains where his does not. It was set down beside his rather than instead of it, and it has not been measured on its own — no denominator here says how often an owner is bypassed, only that nothing requires consulting one.

No mechanism could enforce either. `ops enforcement list --grep approv` returns zero mechanisms across four sources, and an approval is a fact about a conversation that no door can see.
