---
page-type-slug: finding
title: "read what is required refuses the seats and passes the subagents"
domain-slug: domain/checks-system
---

# Claim

Turned on as it stands, `read-what-is-required` would refuse the seats that read and pass the writers that do not. Measured on 2026-08-27: 9 of the 10 seats would be refused outright, on 182 refusals, 180 of them "never read". Against that, a subagent is judged on nothing at all — `writerId()` answers with the subagent's id, a subagent page states no persona, no domain and no role, and every subagent page measured 0 warrants and 0 failures. Most akasha writes are made by subagents. The check stands off on both occasions, and this is why.

# Evidence

Read in the tree on 2026-08-28. `checks-system/check/read-what-is-required/read-what-is-required.check.md` carries `check-on-patch: false` at line 8 and `check-on-worktree: false` at line 9.

The mechanism, confirmed here rather than taken on report. `writerId()` at `agent/writer.ts:21-26` reads the seat from `AGENT_ID` or `CLAUDE_CODE_SESSION_ID`, then returns `ACTING_AGENT_ID` in its place whenever that value starts with the seat id and `--`, so a subagent's write is attributed to the subagent and not to the seat above it. `pages/page-type/subagent.page-type.md:19` says "A subagent is not a seat", and line 21 says "A subagent reads for its seat's domain, the default persona and the default role" — a fallback stated on the page type and recorded in no frontmatter. A subagent page carries only `page-type-slug`, `id`, `slug`, `title`, `subagent-type` and `subagent-id`; `agent/subagent/thea--a10d289f4e5a8b159.subagent.md` is one such, eight lines whole.

The counts are a reading taken on 2026-08-27 and are not re-derived here: 9 of 10 seats, 182 refusals, 180 "never read", and 0 warrants and 0 failures across every subagent page. There were 17 subagent pages when that reading was taken; on 2026-08-28 there are 20 under `agent/subagent/`.

Not measured, and not measurable by the ordinary route: `ops checks audit read-what-is-required` refuses by name — "`read-what-is-required` judges its author, and an audit puts no act in front of it to weigh" — so re-deriving any of these counts takes instrumenting the check rather than running it. I did not establish whether the page type's stated fallback to the seat's domain is reached by the warrant computation at all, or whether it is only honoured by `ops read --seat`, which does hand a subagent its seat's domain reading.
