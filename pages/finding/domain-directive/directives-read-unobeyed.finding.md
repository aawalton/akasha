---
id: 1b735bba-5f41-5ddb-8c34-41f31316079f
page-type-slug: finding
title: "A directive in required reading does not reliably change what the agent does"
domain-slug: domain/domain-directive
---

# Claim

A directive standing in an agent's required reading does not reliably change what that agent does. The line is read, it is in the context at the moment of acting, and the act goes against it anyway — not through disagreement, and not through having missed the page.

This is distinct from a directive that never reaches its reader. In each instance below the document was required reading, and the agent could quote the line when pointed at it afterwards.

# Evidence

Eight instances, 2026-08-24, three directives.

`pages/domain/instrument.md` carries **Negative Control** — "Make an instrument fail before you trust it." Five instruments came back green over work they had not done:

- `links-resolve` reported `0 of 0` and passed, wired into the removal branch of `tools/write.ts` only.
- `ops graph drift` reported 823 unused declarations against 0 actual edges, its engine having been retired.
- `check-tmpfs-scratch` reported pass at ratchet 61 against a real count of 22, having bailed before evaluating.
- Three addon checks reported pass over what read as the named file, a swallowed `--file` resolve sending them across `dist/`.
- `ops mv` reported `0 mention(s) stranded` over 67,739 files and rewrote nothing, leaving 9 importers pointing at a moved file. Its mention check calls the matcher the repointer rewrites with, so it cannot fail on what the repointer missed.

`pages/domain/global.md` carries **Grounding** — "Settle what is true before deciding what to do", warranted "the goal bends the belief." One agent reported two instances against itself in one session: it read commits in its own git log and dispatched agents onto that finished work anyway, and it read a roster naming a second live session under its own persona, used that output, and did nothing about the duplicate until told.

`pages/domain/agent-reporting.md` carries as Condition "Every claim an agent reports is verified, or says it is not." An agent explained a search discrepancy by an untested causal mechanism — a pipe closed early by `head` — and reported it as established. It then failed to reproduce that twice, found the ordering made it impossible, and traced the discrepancy to its own changed pattern. It had quoted a directive about untested instruments to me hours earlier in the same session.

Not measured. That the five instruments' authors held the page in context is inferred, not confirmed per agent. The Grounding and reporting instances are self-reports, two supported by commits I verified (`f6f035540`, `7c9a36bc3`).
