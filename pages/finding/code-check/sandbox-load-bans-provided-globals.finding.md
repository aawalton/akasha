---
id: 3200bc06-6343-542a-869f-7c66c9ed1495
slug: sandbox-load-bans-provided-globals
page-type-slug: finding
title: "Sandbox load bans provided globals"
domain-slug: domain/global
---

# Claim

`check-addon-sandbox-load` refuses two constructs the game itself provides, so its ban list is stricter than the sandbox it stands for.

# Evidence

The runtime check bans ten globals wholly — `debug`, `os`, `io`, `package`, `require`, `module`, `dofile`, `loadfile`, `load`, `loadstring` (`check-addon-sandbox-load.ts:49`). Two of those namespaces are partly legitimate: the game exposes `debug.traceback` and `os.date`, and the static sibling's manifest lists both as allowed (`addon-banned-symbols.ts:30` and `:34`).

Measured on 2026-08-10 by running both checks through their own `--file` flag against planted cases. `debug.traceback()` at top level and `os.date()` at top level are each refused by the runtime check and passed by the static one. The static check is right on both.

The live tree does not trip this today, and the reason is structural rather than luck: the runtime check only executes what runs at bundle load, and the 145 `debug.traceback` and 17 `os.date` occurrences in `packages/temper/addons/dist` sit inside handlers that no load-time path calls. So the refusal is latent — it arrives the first time an author writes either construct at the top level of a bundle, where the game would have run it fine.

Not established: the runtime check was not run over the full 233-bundle dist tree, so its live-tree verdict is untested here. The reading that the 162 occurrences are load-unreachable is taken from the two checks' differing results on planted cases, not from executing the real bundles.
