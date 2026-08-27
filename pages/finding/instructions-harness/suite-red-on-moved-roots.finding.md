---
id: 95e614b4-e1d7-520d-b502-9711dfffafa1
slug: suite-red-on-moved-roots
page-type-slug: finding
title: "The change-aware suite is red on 20 arms no recent change reaches, at least one on a repository root that moved"
domain-slug: domain/global
---

# Claim

The instructions repository's change-aware suite is red on 20 arms across seven describe blocks, none of which any recent change reaches, and at least one of them fails because it spells a repository root that moved.

# Evidence

Measured on 2026-08-19 by `ops instructions run-checks --check suite-runs`: 3,397 tests across 276 files, 20 arms failing, under seven blocks — `what the decider answered`, `a launcher runs the definition the checkout generates now`, `a reload that fails leaves the launcher working`, `spawnOrAdoptOAuthProxy adoption`, `getSocketPath`, `resolveRoots holds Real Path`, and `sn() gates on the corpus document and seeds nothing`.

One was opened directly. `tools/tests/supervisor-spawn-oauth-proxy.test.ts:216` expects `/var/home/walton/code/.claude/supervisors/<agent>/oauth-proxy.sock` and receives `/var/home/walton/repos/code/...`. The repositories stand under `~/repos` and the expectation spells the layout before that move. `resolveRoots holds Real Path` failing beside it points the same way, and the launcher and socket-path blocks both read a root, so one cause may account for most of the twenty.

None of them touches the pages system. Every test file the import graph says reaches `tools/lib/page-derive.ts` or `tools/lib/page-query.ts` — seven files, 134 tests — passes whole, measured the same day against a change to both of those modules.

The suite reports that 487 files have changed since the commit it compares against, so it has been running against a distant baseline rather than a recent one. That is the reading that matters: Green Or Gone asks a change to be stopped by a red suite whoever caused it, and a suite standing red on arms nobody's change reaches stops every change instead of the one that broke something. What it costs is not the twenty arms; it is that the next real failure arrives among them and reads exactly like the rest.
