---
page-type-slug: finding
slug: amnesty-read-as-findings-being-impermanent
title: "A one-time amnesty is read as evidence that findings are the impermanent home for a claim"
domain-slug: page-type/finding
---

# Claim

A one-time amnesty over the findings store is read by other agents as evidence that a finding
is an impermanent home for a claim, and that an initiative's notes are the durable one. The
inference runs the other way from what the page types say: an initiative is mortal and its
notes go when it does, while a finding is keyed to a domain and outlives the work that would
have cited it.

# Evidence

Measured on 2026-08-28, the day of the amnesty at `04be61d8`.

Before the amnesty landed I put the hazard to Alan in those terms: that deleting 3,183 findings
needed a warrant other than age, "otherwise the next agent cites this as precedent for deleting
anything dusty". Alan agreed and the warrant recorded in the commit is that four large refactors
replaced the estate the findings were read against, making their evidence unreproducible. Age is
not among the four grounds the page type now lists for a finding being done.

Within about an hour, one agent drew the general inference anyway. Astra, deleting
`pages/initiative/astra-pages-system-findings.initiative.md` at `4f9595084b`, gave as her reason
for dropping one of its intents: "With the store emptied on the reasoning that anything important
comes up again, an initiative's notes are now the durable home for a measured claim, and that
intent would have pushed me to re-file things that would be swept." The deletion itself was sound
on other grounds. The inference is the observation here.

The same message carries its own counter-evidence: the page she deleted took every measured note
on it away, while `pages/page-type/initiative.page-type.md` states an initiative is done once its
intents are met and carries `mortal: true`.

Not measured: whether any other agent has drawn the same inference, and whether anything has
actually been written into an initiative's notes that belonged in a finding. This is one agent on
one day, reasoning aloud in a message rather than in a landed page, and I corrected it in reply.
Whether the reading recurs without the amnesty fresh in the context is untested.
