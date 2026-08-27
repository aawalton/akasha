---
id: 8b377a48-0915-5558-af65-fea0b268ea1e
page-type-slug: finding
title: "Ops registry tools read cost"
domain-slug: repo/code-repo
---

# Claim

The `ops` command registry reads every file under the instructions repository's `tools/` directory to
learn which commands exist, and converting that read to a command would cost about 16ms on every `ops`
invocation against about 0.4ms today.

# Evidence

`packages/agents/instructions/src/instructions/command-set.ts` calls `readdirSync` on
`<instructionsRoot>/tools` and `readFileSync` on every entry, then parses `command:` and `repos:` out
of each tool's prose header. That is a code-repository module opening instructions content as files,
which `domains/folders/code-repo.md` Command Or Row forbids, and the code repository holds four facts
about the other one's layout to do it: the directory, the `.ts` extension, and both header keys.

It cannot become an ordinary bridge call as the other readers did. `commandsDeclared()` is evaluated
while the ops registry is being built, so it is synchronous and cannot throw — a raised error would
take down every verb in the CLI over a repository that is not this one's to depend on. A verb would
therefore have to be reached with `Bun.spawnSync`.

Measured on this workstation on 2026-08-12, 20 trials of the read and 10 of the spawn, against the
live `tools/` directory of about 50 files: the current `readdirSync` plus `readFileSync` of every entry
costs 0.38ms per call, and one `Bun.spawnSync` of a trivial verb costs 16.24ms. The registry is built
once per `ops` process, so the difference is paid by every `ops` invocation the fleet makes.

The other three crossings closed under project #18833 cost nothing comparable: `agent-settings` is read
once per spawn, and `interactive-cases` once per census run. This one is the only reader on a path that
every command in the fleet passes through.
