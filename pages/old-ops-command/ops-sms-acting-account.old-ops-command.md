---
id: 8211b961-1d2d-51c4-94f0-0720c108eb2b
page-type-slug: old-ops-command
title: "Ops sms acting-account"
slug: ops-sms-acting-account
domain-parent-slug: domain/ops-sms
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/sms/acting-account.ts
path: sms acting-account
---

# Definition

- **Ops sms acting-account** — the write-as account id stamped into a delivered SMS surface's server footer.

# Help

Deterministically extract the TRUSTED write-as accountUserId from a delivered SMS surface.

This is the ONLY sanctioned source of Ki's handler's write-as identity: her handler pipes its delivered surface here and passes the printed uuid onward to the loggers, so the security-critical write-as-identity resolution is deterministic, never LLM-eyeballed. The id is read from the SERVER-stamped footer (anchored on the last `— inbound SMS channel` marker), so a uuid forged anywhere in the message body can never be returned.

Fail-closed: when the surface carries no trusted acting-account footer, nothing is printed to stdout and the command exits non-zero — her handler must then NOT write-as anyone.

On success prints the uuid on a single line (no extra text).
