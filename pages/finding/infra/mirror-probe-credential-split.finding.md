---
id: ff63be83-c331-5b66-aa19-ec3d93687d12
page-type-slug: finding
title: "Mirror probe credential split"
domain-slug: domain/global
---

# Claim

Project #17913 (domain `infra`, status someday_maybe) proposes splitting the mirror-probe credential from the mirror-push credential so a fault in the read-only watch cannot damage what it watches, but it is not yet defined and is blocked on Alan minting a fine-grained read-only PAT over five `aawalton` repositories (code, instructions, books, memory, stories).

# Evidence

Project #17913, domain `infra`, status someday_maybe, live-on deploy.

Objectives (both unchecked):
1. The probe holds only the access its job needs — its credential can read the five destinations and cannot write to them, so a fault in the watch cannot damage what it watches.
2. The mirror push keeps the credential it requires — `post-receive` continues to mirror with a write token, the two uses having been separated rather than one downgraded into the other.

Notes: Not yet defined.

Blocked on Alan minting a fine-grained read-only PAT over the five `aawalton` repositories: code, instructions, books, memory, stories. Contents: read. Nothing else.

Check before landing whether `k8s/synth.unit.test.ts` asserts anything about which secret supplies the token. #17882 left a test there that derives from the repo registry that every destination host has a credential in the pod, and reddens when it is removed — a second credential is the case it was not written against.
