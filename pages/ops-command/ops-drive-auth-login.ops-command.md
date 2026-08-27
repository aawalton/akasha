---
id: 19bb3c2e-167b-53fb-bf9b-5a5a6e34c193
page-type-slug: ops-command
title: "Ops drive auth login"
slug: ops-drive-auth-login
domain-parent-slug: domain/ops-drive-auth
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/drive/auth/login.ts
path: drive auth login
---

# Definition

- **Ops drive auth login** — a read-only Drive refresh token minted from a one-time OAuth consent.

# Help

One-time OAuth consent flow granting agents read-only access to Alan's Google Drive (OAuth-as-Alan). By default starts a loopback listener, prints the consent URL to open in a browser, captures the redirect, exchanges the authorization code, and prints the `export GOOGLE_DRIVE_OAUTH_REFRESH_TOKEN=...` line (append it to ~/.secrets.env) to stdout. The refresh token is bound to the drive.readonly scope requested here. The OAuth app credentials are deliberately reused from the existing Gmail OAuth app (GOOGLE_GMAIL_OAUTH_*), so this is the only Drive var to add. If the consent browser can't reach the loopback (remote/headless session), copy the full callback URL from the address bar and re-run with --callback-url '<url>' to exchange the code without the listener.
