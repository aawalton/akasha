---
id: 30a47a92-91a6-5e9d-b6e0-2d870142d461
page-type-slug: finding
title: "This repository has no antecedent"
domain-slug: barred-meaning/project
---

# Claim

Four build tasks now say "Other seats commit into this repository" with no antecedent anywhere in the document. Today's repairs replaced a false but specific claim about the instructions repo with an unanchored one, and only the two deploy tasks say which repo is which.

# Evidence

Measured 2026-08-06, after two repairs landed during a perimeter pass. This replaces an earlier finding whose claim those repairs falsified.

Until today, `build-parent-deploy.md:57` and `build-singleton-deploy.md:51` each read "The instructions repo carries standing failures and none of them is this project's." Two readings independently falsified that by running `ops instructions run-checks` to exit 0 — there are no standing failures — and each replaced it with the concurrent-commits mechanism. Commits `f7210e27` and `cd2a4353`. Both repairs are right.

What now stands, in four documents:

- `build-parent-commit.md:34` — "Other seats commit into this repository while you work, and their failure is not yours to fix or to return."
- `build-singleton-commit.md:28` — "Other seats commit into this repository while you work, so a check failing on a path you never touched is theirs."
- `build-parent-deploy.md:57` and `build-singleton-deploy.md:51` — "Other seats commit into this repository while you work, and their failure is not yours to fix."

None of the four names the repository. Only `build-child-commit.md:32` still names one: "The check across the instructions repo answers for every seat's work at once."

The two deploy tasks do disambiguate, elsewhere. `build-parent-deploy.md:56` and `build-singleton-deploy.md:50` both read "No stage above reaches this repo — `checks` points at `~/code`", which distinguishes the instructions repo from the code repo explicitly. The two commit tasks carry no such line, so the deictic there resolves against nothing.

The fork, as the reading of `build-singleton-commit.md` put it: either the commit track is the instructions repo and the phrase should say so, or the track is repo-agnostic and the phrase should be cut rather than anchored. Which is right is a fact about what the task is meant to cover, not about the text.

Not established: whether any singleton or parent commit project has run against the code repository.
