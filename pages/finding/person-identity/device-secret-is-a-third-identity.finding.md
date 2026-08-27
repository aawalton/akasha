---
id: aee6318e-70e1-5d05-80c1-b2d24068dd8f
page-type-slug: finding
title: "Device secret is a third way identity is established"
domain-slug: domain/person-identity
---

# Claim

`pages/domain/person-identity.md` says identity is established by a contact route match or a signed-in session, and by nothing else. A third way stands and is in use: a device presents a secret in a request header, and `resolveDeviceSecretContext` answers with an authenticated user id from it alone, with no session and no contact route. Nine such secrets stand, two have ever been used, and one was used today.

# Evidence

Measured on 2026-08-24 against the live cluster, `kubectl exec -n postgres postgres-cnpg-3`,
and against `/var/home/walton/repos/code` on main.

`packages/alanwalton/web/app/device-secret/lib/device-secrets.server.ts:46-68` is the whole of
it. `resolveDeviceSecretContext(request)` reads a secret from the `DEVICE_SECRET_HEADER`, hashes
it with SHA-256, matches that hash against `public.device_secrets`, and returns
`{ authenticated: true, userId }`. No session is consulted and no contact route is matched.
`mintDeviceSecret` at :14 issues the secret as `randomBytes(32)` behind a `dvs_v1_` prefix, and
`device-secret-crypto.server.ts:29` refuses a row that carries a `revoked_at`.

`public.device_secrets` held 9 rows: 4 are verification fixtures (`AAAAAAAA-111`,
`verify-label`, and two spelled `verification`), and one belongs to user
`4ee54543-cb30-4f47-a8d0-9269b4b7df76` rather than Alan. Only two rows carry a `last_used_at`
at all, the later of them 2026-08-24.

Not measured: which routes sit behind this context and what they let a caller do; whether the
iOS app or something else mints the secrets in practice; whether the four fixture rows were
meant to be cleaned up; and whether the line was written before device secrets existed or in
spite of them.
