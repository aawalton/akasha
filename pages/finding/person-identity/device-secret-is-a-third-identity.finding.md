---
id: aee6318e-70e1-5d05-80c1-b2d24068dd8f
slug: device-secret-is-a-third-identity
page-type-slug: finding
title: "Device secret is a third way identity is established"
domain-slug: domain/person-identity
---

# Claim

`pages/domain/person-identity.domain.md` says identity is established by a contact route match or a signed-in session, and by nothing else. A third way stands and is in use: a device presents a secret in a request header, and `resolveDeviceSecretContext` answers with an authenticated user id from it alone, with no session and no contact route. Nine such secrets stand, two have ever been used, and one was used today.

# Evidence

Measured on 2026-08-24 against the live cluster, `kubectl exec -n postgres postgres-cnpg-3`,
and against the code repository then at `/var/home/walton/repos/code`. That repository is gone; the
same code now stands in akasha at `/var/home/walton/repos/akasha`, and the paths below are its paths.

`alanwalton/web/app/device-secret/lib/device-secrets.server.ts:88-118` is the whole of
it. `resolveDeviceSecretContext(request)` reads a secret from the `DEVICE_SECRET_HEADER`, hashes
it with SHA-256, matches that hash against the device secret store, and returns
`{ authenticated: true, userId }` at :117. No session is consulted and no contact route is matched.
`mintDeviceSecret` at :44 issues the secret as `randomBytes(32)` behind a `dvs_v1_` prefix
(`device-secret-crypto.server.ts:5`), and `device-secret-crypto.server.ts:35` refuses a row that
carries a `revokedAt`.

The store — then the `public.device_secrets` table, now the file-backed `device-secret` page type under `pages/device-secret/` — held 9 rows: 4 are verification fixtures (`AAAAAAAA-111`,
`verify-label`, and two spelled `verification`), and one belongs to user
`4ee54543-cb30-4f47-a8d0-9269b4b7df76` rather than Alan. Only two rows carry a `last_used_at`
at all, the later of them 2026-08-24.

Not measured: which routes sit behind this context and what they let a caller do; whether the
iOS app or something else mints the secrets in practice; whether the four fixture rows were
meant to be cleaned up; and whether the line was written before device secrets existed or in
spite of them.
