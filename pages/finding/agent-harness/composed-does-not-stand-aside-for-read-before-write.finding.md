---
id: 747d2531-5790-57f7-8376-244cf87a45f6
page-type-slug: finding
title: "Composed does not stand aside for read-before-write"
domain-slug: domain/agent-harness
---

# Claim

`tools/write.ts --composed` states that the gates about what its writer read stand aside, but `read-before-write` still refuses. A body a command derived cannot be committed until an agent has read the file it replaces in full, which for a lock file means reading tens of kilobytes of hashes that inform no decision.

# Evidence

Measured on this workstation on 2026-08-22, committing the `bun.lock` that `bun install` had just rewritten in the instructions repo.

The help text for `--composed` reads: "This body was composed by a command out of what it measured, not authored. The gates about what its writer READ stand aside; every gate that measures the text itself still applies."

The call was made with that flag:

```
bun tools/write.ts --repo instructions --composed --file-path bun.lock \
  --content-file /var/tmp/19447-reg/bun.lock --dry-run
```

Every gate that measures the text passed or was not applicable, including `token-ceiling`, which reported `not-applicable — a lock file is machine-written, so it holds nothing an author could cut`. So one gate already carries the judgement that a lock file has no authored content.

`read-before-write` refused anyway: `fail — never read by this agent; the file changed 2026-08-22 18:14:25`, with the body "You have not read `bun.lock`, so this change may be landing on top of work someone else did."

The change it names as someone else's work is `bun install`, run by this agent moments earlier in the same session. The gate is reporting the agent's own derived output back to it as a foreign edit.

The refusal is also self-defeating for this file kind. A lock file's content is a function of `package.json` and the registry; reading it changes no decision, because the agent is not choosing any of the bytes. The cost is a 45,533-byte read into context per install, and an install happens once per dependency added — so a project that adds dependencies in waves pays it repeatedly.

`--composed` either covers the read gates or it does not. `read-before-write` is a gate about what its writer read, and it is the one that fires.
