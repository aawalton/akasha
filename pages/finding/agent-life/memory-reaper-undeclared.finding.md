---
id: b637180b-46a3-5c4f-aad8-046f0a58c7ff
page-type-slug: finding
title: "Memory reaper undeclared"
domain-slug: domain/global
---

# Claim

`domains/agent-life.md:13` makes the memory reaper the sole exception to a Design claim, and no document in the corpus says what the memory reaper is.

# Evidence

`domains/agent-life.md:13` reads "Nothing ends an agent on its own judgment, except the memory reaper."

The term appears in no Definition anywhere under `domains/`. It is a real component — `tools/hooks/local-agent-session-start.sh` and the doctrine notes under `dirty/` name `memory-reaper.service` — but a reader of the instruction corpus alone cannot learn what the exception covers.

An exception whose extent cannot be learned from the corpus is not a bounded exception. A seat reading the line knows only that something may end it and cannot tell whether a given ending was that thing.

Found by a reader on the plain-language pass over Design sections, project #18012.
