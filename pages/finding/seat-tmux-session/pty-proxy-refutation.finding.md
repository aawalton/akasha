---
id: ca799a2b-5d94-5a57-8191-8729c299c77f
slug: pty-proxy-refutation
page-type-slug: finding
title: "Pty proxy refutation"
domain-slug: domain/seat-tmux-session
---

# Claim

Project #17285 (domain: seat-tmux-session) found a delegated read of `pty-proxy.ts` refuted the daemon/viewer split #17286 had drawn: 6 of its 13 responsibilities split or invert across that line (including a SIGTERM meaning that inverts, and a dev-channels auto-answer that cannot be viewer-side), so the two rows were merged into one child covering both the daemon and the viewer.

# Evidence

Project #17285 (domain: seat-tmux-session, status: someday_maybe, live-on: deploy); never defined, moved off retired `notes` on 2026-08-15. Absorbed #17286's client (viewer) half — a prior daemon/viewer split was refuted by a delegated read of `pty-proxy.ts` in full.

Refutation: 6 of `pty-proxy.ts`'s 13 responsibilities split or invert across the line: initial geometry (`:58-64`,`:101-102`), output relay (`:110`), stdin relay (`:133-140`), SIGWINCH (`:143-149`), signal handling (`:152-164` — INVERTS: viewer SIGTERM must detach, not kill), exit-code propagation (`:212`,`:220`, consumed by `bash.ts:261`). Two old-split claims were false: "every terminal concern lives in the viewer" (`term.resize` `:146` is daemon-only; `spawn-headless.ts:37-38` hardcodes 120x40); "dev-channels auto-answer is viewer-side" (actually `term.write("\r")` to the master at `:118`, would wedge the session with zero viewers; `spawn-headless.ts:114,128` proves daemon-side works). `createTerminalDeathController` dissolves into "close the socket, exit."

Why one child, not two: neither half verifies a claim alone (`pty-proxy.ts` 221 lines, `spawn-headless.ts` 165; seam is 4-6 message kinds); no precedent — one unix-socket server (`oauth-proxy.ts:346`), zero unix-socket clients in production.

Success criteria: (1) session lifetime independent of viewer; (2) no fd passed between processes; (3) `claude` never signalled by attach/detach; (4) contract: viewer→daemon `attach{cols,rows}`, `input<bytes>`, `resize{cols,rows}`, `detach`; daemon→viewer `output<bytes>`, `exit{code}`; (5) attendance written by daemon; (6) terminal death detaches, session keeps running, escalation deleted not relocated; (7) interactive fidelity verified by use — Alan's named risk.
