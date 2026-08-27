---
id: a02f45f4-6577-5785-8b36-008fe20a2221
slug: never-answering-terminal-class-closed-but-alans-case-unestablished
page-type-slug: finding
title: "Never answering terminal class closed but alans case unestablished"
domain-slug: domain/code-editor
---

# Claim

The fork now answers for every never-answering terminal it can know about, and it is NOT established that this was the class Alan hit. `f4f137b` settles `ptyProcessReady` where the workbench is told the process exited, and delivers the pid from `_onTerminalOpened` rather than a once-delivered event. A terminal whose process neither becomes ready nor ever exits stays outside that: the fork is told nothing about it, and no answer comes from a place not told. Only a recurrence settles which case his was.

# Evidence

Alan's silent terminal read `#7/18 name="bash" shellPath="/usr/bin/bash" cwd=unset hideFromUser=false location=unset running`. In that line `running` means only that the extension host had not been told the terminal closed, which a terminal held open after its process died also reports. It does not distinguish the class `f4f137b` closes from the class it does not.

The fault is absent from the window rather than fixed: Alan closed the tab on 2026-08-13. The live session recorded one sweep at `5003ms: 17 read, 1 NEVER ANSWERED`, one at `2652ms: 17 read, 1 with no process` as the tab closed, and 141 since at `0-1ms: 18 read`.

What the recurrence would look like: a `NEVER ANSWERED` clause in the Ops Agent Tree channel's sweep line, or a tab renamed to the marker `3f69bbc` added. Both were built for this and both are promoted.

Verified at the verdict: the five awaiters of `ptyProcessReady` each re-check `_process` after the await; `_process` is nulled 31 lines before the settle fires; the source-shape gate fails on the right assertion alone when the settle is removed, driven here rather than taken from the account; `PROCESS_ID_TIMEOUT_MS` is untouched at `5_000`.

Filed at the close of #18980, whose first two criteria this leaves unsettled.
