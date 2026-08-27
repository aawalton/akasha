---
id: 3f0f09f6-a1b5-53ca-849e-de740d92c89b
page-type-slug: finding
title: "Session log is a pty drain"
domain-slug: page-type/seat
---

# Claim

A seat's session log is a raw PTY drain, so nothing a seat did is recoverable afterwards. `~/agents/<name>/spawn.log` holds rendered terminal output — escape sequences, cursor addressing, screen redraws — rather than a transcript, and there is no turn structure under it to strip back to. Any quotation attributed to a past seat's session is therefore somebody's transcription rather than the record, and nothing marks which it is.

# Evidence

Measured on 2026-08-07 against this seat's own live log, not against a past one.

`packages/agents/shared/spawn-state.ts:124` names what it is: "`~/agents/<name>/spawn.log` — the
headless PTY drain target." A pseudo-terminal drain cannot be anything but rendered output, so this
is structural rather than a bug in the writing.

This seat's log, mid-run: 2,316,264 bytes, and `wc -l` reports 19 lines. The first 600 bytes through
`cat -v` are `^[]111^G^[7^[[r^[8^[[?25h^[[?25l^[[?2004h^[[?1004h^[[?2031h`, then a 24-bit colour run
`^[[38;2;255;107;128m` drawing a rule out of repeated box characters, then column addressing —
`^[[3G`, `^[[12G`, `^[[20G`, `^[[32G`, `^[[43G` — with `^M^M` between. Two megabytes at nineteen
lines is the signature: the file is frames, not lines.

The cost lands wherever anyone reaches back. A seat cannot re-read its own earlier turns, a reviewer
cannot check what a seat was told against what it did, and a quotation carried out of a session into
a document arrives with no way to check it against the source.

I searched `~/memory/findings/` for `spawn.log|session log|terminal output|escape sequence|ansi`
before filing; the twenty hits are about other subjects, and I read the file lists of
`findings/seat/`, `findings/agent-launch/` and `findings/agent-life/` looking for this claim under
another name. Nothing stands.

Raised by an archivist seat emptying `dirty/skills/literature/findings.md`, which recorded the same
thing in June against one seat's log — 17,579 rendered lines, 41,057 after stripping escapes, no
recoverable turn structure — and drew the conclusion that no direct quotation of Alan exists in that
domain's material. I did not re-measure those June figures; what I re-measured is that the mechanism
producing them is unchanged today. That file is queued for removal, which is why this is filed here.

Not judged: whether the repair is a second structured stream written alongside the drain, a
post-process over the drain, or nothing at all.
