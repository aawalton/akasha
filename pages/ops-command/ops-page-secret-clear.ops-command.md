---
id: cedc0813-a7f7-56e9-9182-e3044dd1a770
page-type-slug: ops-command
title: "Ops page secret clear"
slug: ops-page-secret-clear
domain-parent-slug: domain/ops-page-secret
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/page/secret/clear.ts
path: page secret clear
irreversible: true
---

# Definition

- **Ops page secret clear** — one secret dropped from the sops file beside a page.

# Design

A key that was the last one the sops file held takes the file with it.

Nothing here reads a secret out of an earlier commit.

A key the sops file does not hold is refused rather than passed over.

# Help

Drop one key from the sops file beside a page, re-encipher what is left, and commit that. Where
the key was the last one the file held, the file is removed instead: a sops file holding
nothing is taken away rather than written empty.

WHAT IT DROPS IS NOT COMING BACK THROUGH ANY COMMAND HERE. The value stands in the ciphertext
of an earlier commit, and nothing here reads a secret out of one — `ops page secret reveal`
opens only the file that stands. Putting it back means having the value from wherever it came
from originally, which for a credential that rotates no longer exists. List what the page holds
with `ops page secret show` before you drop anything.

WHICH KEYS EXIST IS THE PAGE TYPE'S CALL, not this command's. A key the page type does not
declare `secret: true` is refused naming the ones it does, and a key the sops file does not
hold is refused rather than passed over.

The repository is the one the page stands in: an absolute path carries it, and a relative one
is taken against the directory this ran in.
