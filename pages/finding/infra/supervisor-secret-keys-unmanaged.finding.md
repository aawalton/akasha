---
id: eaa4f33a-2482-5006-b364-538e5c004e2b
page-type-slug: finding
title: "Supervisor secret keys unmanaged"
domain-slug: domain/global
---

# Claim

The `worker-supervisor-secrets` Secret carries keys that no manifest manages, so removing a key from `postgres-secrets.sops.yaml` does not remove it from the cluster and no later apply will.

# Evidence

Measured on 2026-08-13 during #18946, which removed three `GOOGLE_GMAIL_OAUTH_*` keys from `packages/infra/ci/orchestrator/secrets/postgres-secrets.sops.yaml` and deployed at `acfaac0afc0f`, main pipeline 27943 green.

After that deploy the live Secret still held all three. It held eight keys: `APNS_AUTH_KEY_P8`, `CLOUDFLARE_API_TOKEN`, `DATABASE_URL`, `GIT_ACCESS_TOKEN`, `SUPABASE_SERVICE_ROLE_KEY` and the three Gmail keys.

Its `kubectl.kubernetes.io/last-applied-configuration` annotation named four: `APNS_AUTH_KEY_P8`, `DATABASE_URL`, `GIT_ACCESS_TOKEN`, `SUPABASE_SERVICE_ROLE_KEY`. `sopsDecryptApply` runs a client-side `kubectl apply`, which prunes only what the previous last-applied claimed, so the four live keys absent from that annotation — `CLOUDFLARE_API_TOKEN` and the three Gmail ones — were reachable by no apply in either direction.

The annotation also disagrees with the sops file in both directions: it names `APNS_AUTH_KEY_P8`, which that file does not contain, and omits the three Gmail keys, which it did. So the last client-side apply to this object came from a manifest other than the one the orchestrator's `preparation-orchestrator-apply-secrets` step applies. Which manifest, and when, is not established here.

The three Gmail keys were removed by hand with `kubectl patch --type=json`, converging the cluster to the declarative source; the five others survived and the supervisor Deployment stayed 1/1. `CLOUDFLARE_API_TOKEN` is still live and still managed by nothing.
