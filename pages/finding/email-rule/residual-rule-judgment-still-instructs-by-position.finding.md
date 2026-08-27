---
id: 9d7d7187-9fc2-53d3-ba8e-29a0653a1063
page-type-slug: finding
title: "Residual rule judgment still instructs by position"
domain-slug: rules-engine-rule-set/email-rule
---

# Claim

The residual email rule's judgment still instructs the agent by position, in a corpus where no rule has a position.

# Evidence

`email/alan/rules/agent/everything-else.md` carries this under `# Rule`:

**Judge whatever no rule above has claimed, and send Alan what needs him.**

Nobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule above and stops arriving here.

Both sentences instruct by position. There is no above. `domains/rule-system.md` holds that no rule's match depends on the rules standing beside it, the email order file has been deleted, and the corpus is walked as a folder — so an agent reading this is told to reason about a structure the corpus no longer has, and told that the fix for a recurring case is to place a rule somewhere that does not exist.

What is actually true of this rule is that it matches by exclusion: its conditions name every region another rule claims and hold where none of them does. A case becoming understood becomes a rule of its own AND is added to this rule's exclusions, which is a two-part edit the current wording does not hint at — and forgetting the second half is exactly the defect that put `expert-network-calls` in overlap with this rule on the day it was written.

Left unfixed because the text is the authored judgment an agent acts on rather than a mechanical restatement, so replacing it is a change to Alan's rules and his to approve. The wording wants to say: judge what no other rule claims, and where a case becomes understood, write its rule and exclude it here.
