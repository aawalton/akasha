---
id: 72a45f5e-5422-5b43-8d58-f6c42201511f
page-type-slug: old-ops-command
title: "Ops sms send"
slug: ops-sms-send
domain-parent-slug: domain/ops-sms
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/sms/send.ts
path: sms send
irreversible: true
---

# Definition

- **Ops sms send** — one SMS put out over the Telnyx toll-free number.

# Help

Send an SMS via the Telnyx toll-free number — the outbound half of the SMS channel, alongside `ops imessage send`.

Reads TELNYX_API_KEY and TELNYX_FROM_NUMBER from the environment (~/.secrets.env). Override the sender with --from and the API base (e.g. a sandbox endpoint) with --base-url. Credentials are never logged.

On success prints `sent\t<to>\t<message-id>`.
