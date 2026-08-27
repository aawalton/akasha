---
id: c5043050-5d3d-500c-a785-7b4e121dde72
page-type-slug: ops-command
title: "Ops page secret set"
slug: ops-page-secret-set
domain-parent-slug: domain/ops-page-secret
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/page/secret/set.ts
path: page secret set
irreversible: false
---

# Definition

- **Ops page secret set** — a value enciphered into the sops file beside a page.

# Design

The value arrives on stdin or at `--value-file`, never as an argument.

One trailing newline is dropped, and a value holding a newline of its own is refused.

`--json` takes an object of key to value in place of one value, and every key in it lands in one commit.

`--key` is not given with `--json`.

What was composed is decrypted again and compared against what it was given before anything lands.

What a set replaces stands in the commit before it.

# Help

A property a page type declares `secret: true` is never in the page's own frontmatter. Its
value stands encrypted in a sops file named for the page, with `.md` replaced by
`.sops.yaml`, and this is the command that puts one there: the value is encrypted before it
reaches disk and is never written anywhere in the clear.

WHICH KEYS ARE ALLOWED IS THE PAGE TYPE'S CALL, not this command's. The page type claiming
the path is resolved from the file tree now, and a key it does not declare secret is refused
naming the ones it does. A path no page type claims is refused too — nothing declares what it
holds.

THE VALUE ARRIVES ON STDIN, or at --value-file, and never as an argument: an argument stands
in the process table and in whatever recorded the call. One trailing newline is dropped, since
that is what a shell adds; a value holding a newline of its own is refused.

SEVERAL SECRETS ARRIVE TOGETHER UNDER --json, which takes an object of key to value on stdin
in place of one value, and puts every key in it into one commit. A credential is the case it
exists for: an access token and the refresh token that rotates with it are valid only as a
pair, and setting them one call at a time leaves the page holding a pair that never existed.

WHAT IS WRITTEN IS READ BACK BEFORE IT LANDS. The composed sops file is decrypted again and
compared against the values it was given, so a key this workstation could not read back
refuses here rather than after a credential depends on it.

The repository is the one the page stands in: an absolute path carries it, and a relative one
is taken against the directory this ran in.
