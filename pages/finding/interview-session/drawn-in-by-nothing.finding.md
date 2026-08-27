---
id: 3e4c937d-ca27-5b4c-8bf3-de173e8b9a9b
slug: drawn-in-by-nothing
page-type-slug: finding
title: "Drawn in by nothing"
domain-slug: domain/interview-session
---

# Claim

`pages/domain/interview-session.domain.md` is drawn in by nothing. No document names `interview-session` in a `glossary:` or `lists:` key, no domain declares it as a parent, and it declares no path key, so only a seat dispatched onto the slug directly reads it. What it binds — that the interviewer and recorder run one session together and each can message the other — is therefore written where neither role's seat reads it, and neither role document names the other.

# Evidence

Measured on the instructions repo at commit `8fe8c492`, while reviewing `domains/tasks/interviewer/interview-loop.md` under `review-instructions`.

- A search of the whole repo for `interview-session` across `*.md`, `*.ts` and `*.json` matches exactly one line: that document's own `domain-slug:`.
- Re-measured 2026-08-27 in akasha, where the reading-declaration keys are `sequence-slugs`, `required-reading-slugs` and `conditional-reading-slugs`: `interview-session` across all 1162 tracked `*.domain.md`, `*.page-type.md`, `*.command.md` and `*.role.md` pages still matches exactly one line, the page's own `slug:`. The page now carries `domain-parent-slug: role/interviewer`, which points upward and draws nothing in. `pages/role/interviewer.role.md` names `prepare-interview` and `interview-loop` as conditional reading and not this, still never names the recorder, and `pages/role/recorder.role.md` never names the interview.
- `ops instructions dag --domain interview-loop` returns the slug alone.
- `domains/roles/interviewer.md` — `pages/role/interviewer.role.md` now — never names the recorder, and `domains/roles/recorder.md`, now `pages/role/recorder.role.md`, never names the interviewer by role; each describes its own end of the channel only.
- `ops instructions run-checks` passes `domain-edges` over 395 live documents, which is what says this is not the kind of gap an instrument reports: an unreferenced domain is well formed.

What I did not measure. Whether any seat is in fact dispatched with `--domain interview-session` — that is the one route that would make this claim true of the corpus and false in practice, and nothing in the repo records it. Whether the right repair is a `glossary:` entry on each role, a parent edge, or leaving it as a document only a dispatch reaches; I judged none of those. The memory repo, which I did not search at all.
