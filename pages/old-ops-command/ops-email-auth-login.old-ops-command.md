---
id: cb275221-9bbe-5986-a593-9aa7f41128b8
page-type-slug: old-ops-command
title: "Ops email auth login"
slug: ops-email-auth-login
domain-parent-slug: domain/ops-email-auth
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/email/auth/login.ts
path: email auth login
---

# Definition

- **Ops email auth login** — a Gmail refresh token minted at a browser consent and printed as an export line.

# Help

One-time OAuth consent flow for Gmail. By default starts a loopback listener, prints the consent URL to open in a browser, captures the redirect, exchanges the authorization code, and prints the `export GOOGLE_GMAIL_OAUTH_REFRESH_TOKEN=...` line (append it to ~/.secrets.env) to stdout. The refresh token is bound to the gmail.readonly + gmail.compose + gmail.modify scopes requested here. If the consent browser can't reach the loopback (remote/headless session), copy the full callback URL from the address bar and re-run with --callback-url '<url>' to exchange the code without the listener.
