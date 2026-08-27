---
id: dc9da871-0495-5737-80bd-46b9c75f85c7
page-type-slug: finding
title: "Alive is not yes or no"
domain-slug: task/review-initiative
---

# Claim

`review-initiative` line 13 asks a yes-or-no question of a command that does not answer one. `ops seat alive` returns one of five tokens, and its own help says `dormant` is NOT dead — a healthy on-demand-dormant seat. So a dormant seat can be written up as a stall. The remedy is an Add, which is why the reading carried it back rather than landing it.

# Evidence

Raised by the review-instructions reading of 2026-08-07.

Verified myself: `ops seat alive --help` says the command "returns one of five tokens from the single shared decider", listing `live` and `dormant` among them, and describes dormant as "a healthy on-demand-dormant seat (#13876): its process is" — not a dead one.

The reading also ran the command on live rows rather than reading only the help: `ops seat alive '#18131'` returned `live`, and `ops seat alive '#17056'` returned "No seat declares project #17056" at exit 1 — which confirms the line's invocation and shows that "claimed" in it is load-bearing. I did not re-run either.
