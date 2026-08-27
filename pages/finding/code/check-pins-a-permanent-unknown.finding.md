---
id: 5fe235f5-c5f3-5860-9047-78db13eac730
page-type-slug: finding
title: "Check pins a permanent unknown"
domain-slug: domain/global
---

# Claim

`ops project check` can pin a permanent UNKNOWN verdict for a branch, which no later passing run displaces.

# Evidence

Reported by seat `019fd43b` while delivering project #17946, and left unrepaired by it on the grounds that it was not that project's.

Pipeline 27186 minted zero workflows at a SHA whose changed-file set was empty after a rebase. Same-SHA reuse then pins that empty verdict, so `ops project check` continued to answer UNKNOWN for the branch after real runs had passed. Branch CI passed 117/117 over the byte-identical tree at `3a4c6bfa97`, and 91/91 at `565b678f7b` after a one-line repair.

Those figures are the delivering seat's readings, not mine. What I can attest is that the project completed and deployed with `ops project check` still answering UNKNOWN, and that neither of us treated that answer as evidence about the work.

Why it is worth a row rather than a note on the project it surfaced in. UNKNOWN is the answer a checking instrument gives when it has not looked, and it is indistinguishable from the answer it gives when it cannot look. A verdict that survives every later run is not a stale reading that the next one corrects — it is an instrument that has stopped being able to change its mind about a branch. Anything downstream that gates on `check` being green will refuse forever, and anything that treats UNKNOWN as permission will pass forever.

Not established: how often an empty changed-file set arises, whether the reuse is keyed on SHA alone or on something narrower, and whether any other verb reads the same pinned record. One branch is a case rather than a rate.
