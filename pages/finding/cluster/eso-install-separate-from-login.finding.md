---
id: 4729a89d-b892-5531-b69c-0d9a567a83ae
slug: eso-install-separate-from-login
page-type-slug: finding
title: "Eso install separate from login"
domain-slug: page-type/cluster
---

# Claim

Fetching the ~100GB ESO install onto node-06's persistent volume is a separate, one-time problem from the repeatable unattended login (S5), and it sits on S5's critical path since S5 cannot be attempted until the bytes exist; as of 2026-07-25 none of its preconditions held and its install-path question (Steam/steamcmd, the Bethesda.net launcher, or copying Alan's existing install) had not been evaluated.

# Evidence

From project #16209 (`cluster`, `someday_maybe`, `live-on: deploy`), no objective — captured 2026-07-25, moved from retired `notes` 2026-08-15.

Why its own row: install (S4b) is one-time — an authenticated ~100GB fetch onto a persistent volume, done once, possibly semi-manual. Login (S5) is repeatable — cold container to logged-in, unattended every pod restart, the programme's biggest unknown. Folding S4b into S5 would hide a bounded problem in an unbounded one. Dependency runs backward from how it looks: S5 can't start until the bytes exist, so S4b sits on S5's critical path and is the first live use of the account.

Preconditions, none held 2026-07-25: (1) S3 applied — `/var/lib/eso-install` hostPath, decided not applied, a Talos wipe destroys it; (2) S2 landed — an image running the launcher; (3) credentials as a Secret at `packages/infra/k8s/eso-rig/secrets.sops.yaml`, commit `2999600a63` on `project-15805`, not landed. Do not dispatch before (1) and (2).

Open question before fetching: which install path, and does it need a login — Steam/`steamcmd` (maybe Steam Guard-gated), Bethesda.net (historically GUI-only), or copying Alan's install (raised by Alan, unevaluated, no login to fetch, launcher still authenticates to patch/play). All three unproven.

Account safety, Alan's priority: PTS if possible, else secondary live account, else Alan tests primary manually. Account is expendable, NOT `tempereso` — read `ESO_TEST_ACCOUNT_USER`/`_PASS` from environment. Bright line: reload/menu/read-only only, never gameplay. #16199 (identity stability) should settle before repeated auth — per-restart identity change risks publisher security holds.

Instrument discipline: a partial ~100GB download looks identical to complete by byte count, exit code, empty log. Verify against what the install asserts (manifest, checksum, integrity check), not file presence; prove the verifier can fail by corrupting a file.

Related: #16185, #15805, #15808 (nimue).
