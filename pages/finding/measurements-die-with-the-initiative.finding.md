---
page-type-slug: finding
slug: measurements-die-with-the-initiative
title: "A measurement living only on an initiative's notes is destroyed when the initiative's intents are met"
domain-slug: page-type/initiative
---

# Claim

A measurement about a domain that lives only on an initiative's notes is deleted with the
initiative, and an initiative is deleted as soon as its intents are met. The better a piece of
work goes, the sooner what it measured along the way is destroyed.

# Evidence

Measured on 2026-08-28 over the 14 initiatives tracked in akasha.

Twelve carry a `# Notes` section. Four carry at least one bolded note containing a digit, which
is the cheap proxy I used for a measurement rather than a decision — among them "The largest
instance so far: 361 refusals in one check", "Nineteen page types declare a name formula,
2026-08-27" and "A file's page type comes from the name it carries, settled 2026-08-27".

The destruction is observed rather than reasoned. Astra deleted
`pages/initiative/astra-pages-system-findings.initiative.md` at `4f9595084b` because its intents
were met, which was correct under `pages/page-type/initiative.page-type.md` — an initiative's
purpose is done once every intent it holds is met, and the page type carries `mortal: true`. She
reported what went with it: "Counts at commits, sweep percentages, the stable 93-at-two-commits
reading — all gone with the page." She also reported that her remaining initiative notes "are
full of measurements in exactly that position".

A finding does not have this property: it is keyed to a domain, and a domain outlives any
particular piece of work.

Not measured: how many of the notes in those four initiatives are measurements somebody would
want later, as against working state that is right to destroy. The digit proxy catches dates and
ruling markers too, so four is an upper bound on files and says nothing about how many notes
inside them qualify. I have not read the notes of the other ten initiatives, and I have not tried
to recover anything from the initiative already deleted to see whether its measurements were in
fact wanted.
