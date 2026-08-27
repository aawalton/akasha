---
id: 91927f11-da7f-52bc-bc6a-075cc26a10c9
page-type-slug: finding
title: "Wake sources unreadable"
domain-slug: domain/agent-harness
---

# Claim

A persona row's `wakeSources` is the only thing arming a per-persona wake sender, and a malformed value there is dropped with a `console.warn` and treated as absent rather than refused. Nothing reads the field back: no `ops` verb prints it. So a row edited wrong disarms that sender silently, and the symptom is indistinguishable from the sender never firing — which is the failure the wake was added to end.

# Evidence

Measured 2026-08-09 in `~/code` at the tree carrying #18164.

`packages/agents/shared/persona-wake-slugs.ts:73-80`: `parseDeclaredWakeSources` returns `[]` for `undefined` or `null`, and on a Zod parse failure logs `[persona-wake] ignoring malformed wakeSources on persona '<slug>'` and returns `[]`. Its own comment states the rule deliberately — one bad row must never poison the whole fleet's arming — so the degradation is chosen rather than accidental, and it is the right trade at the fleet level.

What has no counterweight is the read-back. Verifying #18164 I tried to read my own row's `wakeSources` and found no route: `ops seat show`, `ops seat get`, `ops seat wake-sources` and `ops persona show` are all unknown commands, and `ops seat list --full` does not carry the field. `ops seat whoami` returns id, name, role, domain and persona, and no wake sources.

The concrete instance: the #18164 seat appended `system:slow-suite-sweep` to the `dalla` row, reporting it went from two entries to three. I could not confirm that, and I passed the project saying so. If that write were malformed the sweep's wake would be dropped with a warning in a process nobody reads, the nightly record would still be filed, and the ledger would show a wake owed and never delivered — which reads exactly like a sweep that found nothing worth waking for.

Not measured. I did not test a malformed write to see the warning fire, and I did not establish whether the boot digest or any other surface exposes the field by a route I did not try. I looked for a read verb and found none; I did not read the CLI's full command table to prove none exists.
