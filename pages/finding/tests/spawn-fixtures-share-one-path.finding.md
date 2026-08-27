---
id: 503da381-03b9-56b8-a82d-4ef5cb05986e
slug: spawn-fixtures-share-one-path
page-type-slug: finding
title: "Spawn fixtures share one path"
domain-slug: domain/global
---

# Claim

The interactive-spawn test helpers write into the fixed path `/var/tmp/athena-spawn-arm/` rather than a `mkdtemp` directory, so two `bun test` runs at once delete each other's fixtures. The suite is not reentrant, and the failure surfaces as an ENOENT inside `mkdirSync(..., {recursive: true})` — an error that reads as a broken test rather than as two runs colliding.

# Evidence

Measured on 2026-08-13 across ten full runs of `bun test` in the instructions repository, two of which failed and eight of which passed.

The captured failure:

```
ENOENT: no such file or directory, mkdir '/var/tmp/athena-spawn-arm/plugins/home/.claude/plugins'
    at drivePluginCases (tools/tests/interactive-spawn-plugins.ts:233:7)
    at drive (tools/tests/interactive-spawn-recording.test.ts:146:15)
 6172 pass, 1 fail, 1 error
```

Line 232 is `rmSync(ROOT, { recursive: true, force: true })` and line 233 is `mkdirSync(registryDir, { recursive: true })` under that same root. A recursive mkdir returns ENOENT when a parent is removed between the two calls, which is what a second run's `rmSync` does.

The path is fixed rather than unique in four files: `tools/tests/interactive-spawn-plugins.ts` declares `ROOT` and `SPAWN_ROOT` under it, and `tools/tests/interactive-spawn-arm.ts` and `tools/tests/interactive-spawn-harness.ts` name it for a settings file, a socket and two mcp files.

Both failures happened while a second `bun test` was running in another process. Six runs made serially with nothing else running all passed. `tools/tests/corpus.ts` uses `mkdtempSync` for its own fixtures and states the reason, so the pattern that avoids this is already established beside these files.

This does not affect a single run made on its own, which is why it has stood: it is reached only by concurrent runs, and an agent meeting it once sees an error naming a directory rather than anything naming the collision.
