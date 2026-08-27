---
id: 1874b708-5ff2-51cd-a1d3-19880d04c1a9
page-type-slug: old-ops-command
title: "Ops dev-server bootstrap"
slug: ops-dev-server-bootstrap
domain-parent-slug: domain/ops-dev-server
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/dev-server/bootstrap.ts
path: dev-server bootstrap
---

# Definition

- **Ops dev-server bootstrap** — an app's `.env.local` written from its sops secrets, with the browser-side keys minted.

# Help

Decrypt the app's `deploy/secrets.sops.yaml` and write the decoded key-value pairs to `<packagePath>/.env.local`. Always appends `NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN=` (empty) so Supabase auth cookies bind to localhost. When the secrets contain `SUPABASE_URL` or `SUPABASE_ANON_KEY` without the `NEXT_PUBLIC_` prefix, also writes `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` with the same value (an explicit `NEXT_PUBLIC_*` key in the sops file always wins). Refuses to overwrite an existing `.env.local` unless `--force`.

Default stdout (single line):
  wrote <path> (<n> vars)\n

--json stdout (stable shape):
  { ok: true, path, var_count }
