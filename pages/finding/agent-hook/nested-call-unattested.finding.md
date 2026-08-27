---
id: c6671ea6-4235-522a-af0f-621588310e0b
page-type-slug: finding
title: "Nested call unattested"
domain-slug: page-type/agent-hook
---

# Claim

A gated command spawned by a script rather than named in the shell cannot be shown to have passed through `tools/hooks/hold-seat.ts`, so `hook-liveness` reports that it could not attest the call and admits it anyway.

# Evidence

Sixteen `tools/page-secret.ts --set` calls were driven from one throwaway script, each landing a commit at exit 0. Every one of them printed that the hook is firing for this agent but that its last firing "names neither `tools/page-secret.ts` nor an `ops` command ending `page-secret`, so this act cannot be shown to have passed through it", followed by the reading that the hook may have stopped firing.

The hook had in fact fired 276ms before, for the outer `bun` call that drove the script, and the same gate reported that pass on the write immediately before. So the seat was held throughout and the instrument was measuring the depth of the call rather than the hold. Its refusal text sends the reader at a hook that is working.
