---
page-type-slug: finding
slug: a-checkout-with-no-git-reads-as-a-workstation-holding-no-seats
title: "A checkout with no .git reads as a workstation holding no seats"
domain-slug: page-property-definition/seat-presence
---

# Claim

Three hops each drop rather than refuse, so a checkout carrying no `.git` answers as a workstation running no seats. `resolveRoots` at `repo/roots/roots.ts:163` names a repository only where `.git` stands; `dirsOfPlaces` at `tools/lib/agent-page-place.ts:37-47` skips a place whose repo has no root; `seatPagePaths` at `tools/lib/seat-presence-read.ts:57-68` then loops over nothing. A seat page plainly on disk is answered as no seat at all, and the refusing hop stands unused beside the one taken.

# Evidence

Measured 2026-08-28 at `ff99cd48a4`, on a directory built for it: the two `pages/repo/*.repo.md` pages copied from the live tree, `agent/seat/probe.seat.md` planted, no `.git`, `AKASHA_ROOT` naming it.

    .git present     : false
    seat page on disk: [ "probe.seat.md" ]
    resolveRoots     : {"code-editor":"…/code-editor","target":"akasha"}
    seatDirs         : []
    seatPagePaths    : []

Control, the same tree with one `.git/HEAD` written into it and nothing else touched:

    .git present     : true
    resolveRoots     : {"akasha":"…/root","code-editor":"…/code-editor","target":"akasha"}
    seatDirs         : ["…/root/agent/seat"]
    seatPagePaths    : ["…/root/agent/seat/probe.seat.md"]

The refusing hop exists and is not the one used. `dirOfPlaceHeld` at `tools/lib/agent-page-place.ts:31-35` throws ``no root is known for the `${place.repo}` repository``; `dirsOfPlaces` at `:37-47` calls `dirOfPlace` beside it and pushes only what is not null. `seatPagePaths` swallows a failed `readdirSync` at `:61-65` as well, so a seat directory that is there but unreadable answers the same as one that is not.

Every seat enumerator stands on `seatPagePaths`: `seatPageById` at `seat-presence-read.ts:125-134`, `seatPageAgents` at `:136-138`, `seatPageForAgent` at `:140-142`, and `seatsStanding` at `tools/sweep-seats.ts:66-74`.

`resolveRoots` is deliberate and says so at `roots.ts:158-162`, and `tools/tests/fixture.ts:86-88` rests on it by name, so the hop to repair is the seat reader rather than roots. The shape is already written down one directory away, at `editor-extension/src/seat/turn-color.ts:91-94`.

Not measured: whether a live workstation has ever answered this way. The reading is of a tree I made, not of a run anybody had.
